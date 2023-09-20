import { memo } from 'react';
import {
  AuthorizationButton,
  AuthorizationTitle,
  AuthorizationWrapper,
  ButtonWrapper,
} from './Authorization.styled.js';
import WhiteLayout from '../../ui-kit/components/WhiteLayout/WhiteLayout.jsx';

function Authorization() {
  return (
    <WhiteLayout padding='205px 221px'>
    <AuthorizationWrapper>
      <AuthorizationTitle variant="h2">Ласкаво просимо!</AuthorizationTitle>
      <ButtonWrapper>
        <AuthorizationButton label="Увійти в акаунт" />
        <AuthorizationButton label="Створити акаунт" />
      </ButtonWrapper>
    </AuthorizationWrapper>
    </WhiteLayout>
  );
}

export default memo(Authorization);
