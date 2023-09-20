import { memo } from 'react';
import { InputWrapper, LoginButton, LoginWrapper } from './Login.styled.js';
import EmailInput from '../../ui-kit/components/Input/EmailInput/EmailInput';
// eslint-disable-next-line max-len
import PasswordInput from '../../ui-kit/components/Input/PasswordInput/PasswordInput';

function Login() {
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

export default memo(Login);
