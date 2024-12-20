/* eslint-disable max-len */
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../redux/auth-operations';
// import { useUser } from '../../hooks/useUser';
import { PATH } from '../../constans/routes';
// import { useNavigate } from 'react-router-dom';
import { FieldText } from '../RegistrationPageComponent/FieldText/FieldText.jsx';
import { FieldPassword } from '../RegistrationPageComponent/FieldPassword/FieldPassword.jsx';
import {
  LoginWrapper,
  LoginForm,
  LoginLink,
  ButtonWrapper,
  LoginButton,
  LogoIcon,
} from './LoginPageComponent.styled.js';

// import { setUserInfo } from '../../redux/userSlice.js';

import { useDispatch } from 'react-redux';
import {
  setAccessToken,
  setIsLoggedIn,
  setRefreshToken,
} from '../../redux/authOperationsToolkit/authOperationsThunkSlice.js';

function LoginPageComponent() {
  const [login] = useLoginMutation();
  // const navigate = useNavigate();
  // const { logIn } = useUser();

  const dispatch = useDispatch();

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
          alert(`Неправильна пошта чи пароль`);
        } else if (error.data) {
          alert(error.data.message);
        } else {
          alert(
            'Something goes wrong :-( Maybe server or your connection is down.',
          );
        }
        return;
      }

      // if (data) {
      // logIn(JSON.stringify(data.accessToken), JSON.stringify(data.refreshToken));

      // setUserInfo(data);
      // navigate(PATH.MAIN / PATH.HOMEPAGE);
      // }
      if (data) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        dispatch(setAccessToken(data.accessToken));
        dispatch(setRefreshToken(data.refreshToken));
        dispatch(setIsLoggedIn(true));
        // navigate(PATH.MAIN / PATH.HOMEPAGE);
      }
    } catch (error) {
      console.error('Виникла помилка під час заповнення форми:', error);
    }
  };

  return (
    <LoginWrapper>
      <LogoIcon />

      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <FieldText
          title="Email"
          id="email"
          control={control}
          errors={errors.email}
          placeholder="example@gmail.com"
        />

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

        <ButtonWrapper>
          <LoginButton
            type="submit"
            label="Увійти в акаунт"
            disabled={!isValid}
          />
        </ButtonWrapper>
      </LoginForm>
    </LoginWrapper>
  );
}

export default LoginPageComponent;
