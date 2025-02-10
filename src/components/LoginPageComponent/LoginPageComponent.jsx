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
      const { error, data } = await login(userData);

      if (error) {
        if (error.status === 401) {
          handleOpenModal();
        }
        if (error.data) {
          toast.error(error.data.data.message);
        } else {
          toast.error(
            'Щось негаразд :-( Або ти не в сети або сервер не доступний.',
          );
        }
        return;
      }

      // if (data) {
      // logIn(JSON.stringify(data.accessToken), JSON.stringify(data.refreshToken));

      // setUserInfo(data);
      // navigate(PATH.MAIN / PATH.HOMEPAGE);
      // }

      const { accessToken, refreshToken } = data.data;
      if (data) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch(setAccessToken(accessToken));
        dispatch(setRefreshToken(refreshToken));
        dispatch(setIsLoggedIn(true));
      }
      navigate('/');
    } catch (error) {
      console.error('Виникла помилка під час заповнення форми:', error);
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
