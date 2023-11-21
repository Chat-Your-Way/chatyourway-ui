/* eslint-disable max-len */
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../redux/auth-operations';
import { PATH } from '../../constans/routes';
import { useNavigate } from 'react-router-dom';
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

function LoginPageComponent() {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
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
          alert(`invalid email or password`);
        } else {
          alert(error.data.message);
        }
        return;
      }

      if (data) {
        localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
        navigate(PATH.MAIN / PATH.HOMEPAGE);
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
