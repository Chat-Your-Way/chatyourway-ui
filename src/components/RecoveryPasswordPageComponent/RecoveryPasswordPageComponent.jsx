// eslint-disable-next-line max-len
import PasswordInput from '../../ui-kit/components/Input/PasswordInput/PasswordInput';
import {
  CloseIcon,
  InputWrapper,
  RecoveryPasswordTitle,
  RecoveryPasswordWrapper,
  ResetButton,
  WhiteBox,
} from './RecoveryPasswordPageComponent.styled';

function RecoveryPasswordPageComponent() {
  return (
    <WhiteBox padding="156px 200px">
      <CloseIcon />
      <RecoveryPasswordWrapper>
        <RecoveryPasswordTitle variant="h2">
          Відновлення пароля
        </RecoveryPasswordTitle>
        <InputWrapper>
          <PasswordInput linkText="" />
          <PasswordInput inputText="Підтвердити пароль" linkText="" />
        </InputWrapper>
        <ResetButton label="Скинути пароль" />
      </RecoveryPasswordWrapper>
    </WhiteBox>
  );
}

export default RecoveryPasswordPageComponent;
