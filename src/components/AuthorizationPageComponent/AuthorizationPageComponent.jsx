import {
  AuthorizationButton,
  AuthorizationLogo,
  AuthorizationTitle,
  AuthorizationWrapper,
  ButtonWrapper,
} from './AuthorizationPageComponent.styled.js';
import WhiteLayout from '../../ui-kit/components/WhiteLayout/WhiteLayout.jsx';
// import { PATH } from '../../constans/routes.js';

function AuthorizationPageComponent() {
  return (
    <WhiteLayout>
      <AuthorizationWrapper>
        <AuthorizationLogo />
        <AuthorizationTitle variant="h2">Ласкаво просимо!</AuthorizationTitle>
        <ButtonWrapper>
          <AuthorizationButton label="Увійти в акаунт" to="/login" />
          <AuthorizationButton label="Створити акаунт" to="/register" />
        </ButtonWrapper>
      </AuthorizationWrapper>
    </WhiteLayout>
  );
}

export default AuthorizationPageComponent;
