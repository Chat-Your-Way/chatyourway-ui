import { PATH } from '../../constans/routes';
import WhiteLayout from '../../ui-kit/components/WhiteLayout/WhiteLayout';
import {
  LoginAccountButton,
  SuccessSignupTitle,
  SuccessSignupWrapper,
} from './SuccessSignupPageComponent.styled';

function SuccessSignupPageComponent() {
  return (
    <WhiteLayout padding="225px 157px">
      <SuccessSignupWrapper>
        <SuccessSignupTitle variant="h2">
          Ви успішно зареєструвались у ChatYourWay
        </SuccessSignupTitle>
        <LoginAccountButton label="Увійти в акаунт" to={PATH.LOGIN} />
      </SuccessSignupWrapper>
    </WhiteLayout>
  );
}

export default SuccessSignupPageComponent;
