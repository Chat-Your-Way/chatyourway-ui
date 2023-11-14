import {
  InputWrapper,
  LoginContainer,
  LoginButton,
  LoginWrapper,
  LogoIcon,
} from './LoginPageComponent.styled.js';
import EmailInput from '../../ui-kit/components/Input/EmailInput/EmailInput.jsx';
import PasswordInput from '../../ui-kit/components/Input/PasswordInput/PasswordInput.jsx';

function LoginPageComponent() {
  return (
    <LoginWrapper>
      <LogoIcon />
      <LoginContainer>
        <InputWrapper>
          <EmailInput />
          <PasswordInput />
        </InputWrapper>
        <LoginButton label="Увійти в акаунт" />
      </LoginContainer>
    </LoginWrapper>
  );
}

export default LoginPageComponent;
