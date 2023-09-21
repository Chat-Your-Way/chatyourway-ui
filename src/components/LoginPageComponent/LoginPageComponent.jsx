import {
  InputWrapper,
  LoginButton,
  LoginWrapper,
} from './LoginPageComponent.styled.js';
// eslint-disable-next-line max-len
import EmailInput from '../../ui-kit/components/Input/EmailInput/EmailInput.jsx';
// eslint-disable-next-line max-len
import PasswordInput from '../../ui-kit/components/Input/PasswordInput/PasswordInput.jsx';

function LoginPageComponent() {
  return (
    <LoginWrapper>
      <InputWrapper>
        <EmailInput />
        <PasswordInput />
      </InputWrapper>
      <LoginButton label="Увійти в акаунт" />
    </LoginWrapper>
  );
}

export default LoginPageComponent;
