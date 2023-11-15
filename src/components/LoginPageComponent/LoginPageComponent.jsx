import { useForm } from 'react-hook-form';
import { PATH } from '../../constans/routes.js';
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
  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = (values) => {
    const { email, password } = values;
    const userData = {
      email: email.trim().toLowerCase(),
      password,
    };
    // eslint-disable-next-line
    console.log(userData);
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
