import { useMediaQuery } from 'react-responsive';
import {
  InputWrapper,
  LoginButton,
  LoginWrapper,
  LogoIcon,
} from './LoginPageComponent.styled.js';
import EmailInput from '../../ui-kit/components/Input/EmailInput/EmailInput.jsx';
import PasswordInput from '../../ui-kit/components/Input/PasswordInput/PasswordInput.jsx';

function LoginPageComponent() {
  const isTablet = useMediaQuery({ query: '(min-width: calc(845px - 0.02px)' });

  return (
    <LoginWrapper>
      <LogoIcon />
      <InputWrapper>
        <EmailInput inputWidth={isTablet ? '400px' : '300px'} />
        <PasswordInput inputWidth={isTablet ? '400px' : '300px'} />
      </InputWrapper>
      <LoginButton label="Увійти в акаунт" />
    </LoginWrapper>
  );
}

export default LoginPageComponent;
