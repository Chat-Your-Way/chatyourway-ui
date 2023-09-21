import {
  AuthorizationButton,
  AuthorizationTitle,
  AuthorizationWrapper,
  ButtonWrapper,
} from './AuthorizationPageComponent.styled.js';
import WhiteLayout from '../../ui-kit/components/WhiteLayout/WhiteLayout.jsx';

function AuthorizationPageComponent() {
  return (
    <WhiteLayout padding="205px 221px">
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

export default AuthorizationPageComponent;
