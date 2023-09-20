import WhiteLayout from '../../ui-kit/components/WhiteLayout/WhiteLayout';
import {
  LoginAccountButton,
  SuccessSignupTitle,
  SuccessSignupWrapper,
} from './SuccessSignup.styled';

function SuccessSingup() {
  return (
    <WhiteLayout padding="225px 157px">
      <SuccessSignupWrapper>
        <SuccessSignupTitle variant="h2">
          Ви успішно зареєструвались у ChatYourWay
        </SuccessSignupTitle>
        <LoginAccountButton label="Увійти в акаунт" />
      </SuccessSignupWrapper>
    </WhiteLayout>
  );
}

export default SuccessSingup;
