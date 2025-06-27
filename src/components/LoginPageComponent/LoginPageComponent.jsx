/* eslint-disable max-len */
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../redux/auth-operations';
import { PATH } from '../../constans/routes';
// import { useUser } from '../../hooks/useUser';
// import { PATH } from '../../constans/routes';
import { useNavigate } from 'react-router-dom';
import { FieldText } from '../RegistrationPageComponent/FieldText/FieldText.jsx';
import { FieldPassword } from '../RegistrationPageComponent/FieldPassword/FieldPassword.jsx';
import {
  LoginWrapper,
  LoginForm,
  LoginLink,
  RegistrationLink,
  ButtonWrapper,
  LoginButton,
  LogoIcon,
} from './LoginPageComponent.styled.js';

// import { setUserInfo } from '../../redux/userSlice.js';

import { useDispatch, useSelector } from 'react-redux';
import {
  setAccessToken,
  setIsLoggedIn,
  setRefreshToken,
} from '../../redux/authOperationsToolkit/authOperationsThunkSlice.js';
import { openModal } from '../../redux/modalSlice.js';

import { toast } from 'react-toastify';
import DialogModal from '../DialogComponent/DialogComponent.jsx';
import { FieldTextWrapper } from '../RegistrationPageComponent/RegistrationPageComponent.styled.js';

function LoginPageComponent() {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  // const { logIn } = useUser();
  const isOpen = useSelector((state) => state.modal.isOpen);

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(
      openModal({ text: 'Перейти на сторінку відправки листа активації?' }),
    );
  };

  const handleNavigate = () => navigate(`/resend-activation-email`);

  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const { email, password } = values;
    const userData = {
      email: email.trim().toLowerCase(),
      password,
    };

    try {
      const result = await login(userData).unwrap();

      const { data } = result;

      const { accessToken, refreshToken } = data;
      if (data) {
        // localStorage.setItem('accessToken', accessToken);
        // localStorage.setItem('refreshToken', refreshToken);
        dispatch(setAccessToken(accessToken));
        dispatch(setRefreshToken(refreshToken));
        dispatch(setIsLoggedIn(true));
      }
      navigate('/');
    } catch (error) {
      if (error.status === 403) {
        handleOpenModal();
      }

      const errorDetail =
        error?.data?.data?.message || 'Щось пішло не так. Спробуйте пізніше.';
      toast.error(errorDetail);
    }
  };

  return (
    <LoginWrapper>
      <LogoIcon />

      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <FieldTextWrapper>
          <FieldText
            title="Email"
            id="email"
            control={control}
            errors={errors.email}
            placeholder="example@gmail.com"
          />
        </FieldTextWrapper>
        <FieldTextWrapper>
          <FieldPassword
            title="Пароль"
            id="password"
            control={control}
            errors={errors.password}
            placeholder="Мінімум 8 символів"
            navlink={
              <LoginLink to={PATH.FORGOT_PASSWORD}>Забули пароль?</LoginLink>
            }
          />
        </FieldTextWrapper>

        <ButtonWrapper>
          <LoginButton
            type="submit"
            label="Увійти в акаунт"
            disabled={!isValid}
          />
        </ButtonWrapper>
      </LoginForm>
      <RegistrationLink to={`/${PATH.REGISTER}`}>
        Натиснить, щоб зареєструватися.
      </RegistrationLink>
      {isOpen && <DialogModal callback={handleNavigate} />}
    </LoginWrapper>
  );
}

export default LoginPageComponent;
