import {
  ButtonWrapper,
  CloseIcon,
  EmailInputStyled,
  ForgotPasswordText,
  ForgotPasswordTextWrapper,
  ForgotPasswordTitle,
  ForgotPasswordWrapper,
  SendPasswordButton,
  WhiteBox,
} from './ForgotPasswordPageComponent.styled.js';

function ForgotPasswordPageComponent() {
  return (
    <WhiteBox padding="176px 200px">
      <CloseIcon />
      <ForgotPasswordWrapper>
        <ForgotPasswordTextWrapper>
          <ForgotPasswordTitle variant="h2">
            Забули свій пароль?
          </ForgotPasswordTitle>
          <ForgotPasswordText variant="h6">
            Введіть, будь ласка, адресу своєї електронної пошти, і ми надішлемо
            Вам інструкції з відновлення пароля.
          </ForgotPasswordText>
        </ForgotPasswordTextWrapper>
        <EmailInputStyled />
        <ButtonWrapper>
          <SendPasswordButton label="Надіслати" />
        </ButtonWrapper>
      </ForgotPasswordWrapper>
    </WhiteBox>
  );
}

export default ForgotPasswordPageComponent;
