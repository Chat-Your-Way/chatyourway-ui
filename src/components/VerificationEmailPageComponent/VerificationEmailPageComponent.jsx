import WhiteLayout from '../../ui-kit/components/WhiteLayout/WhiteLayout';
import {
  TextBox,
  Logo,
  LoginAccountButton,
  VerificationEmailTitle,
  VerificationEmailWrapper,
  VerificationEmailSubTitle,
  VerificationEmailParagraph,
  VerificationEmailSubParagraph,
} from './VerificationEmailPageComponent.styled';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectUserInfo } from '../../redux/userSlice';

function VerificationEmailPageComponent() {
  const navigate = useNavigate();

  const sendEmailAgain = () => {
    navigate('/resend-activation-email');
  };

  return (
    <WhiteLayout>
      <VerificationEmailWrapper>
        <Logo />
        <VerificationEmailTitle variant="h2">
          Реєстрація пройшла успішно
        </VerificationEmailTitle>
        <VerificationEmailSubTitle variant="h3">
          Вітаємо!
        </VerificationEmailSubTitle>
        <TextBox>
          <VerificationEmailParagraph variant="p">
            Вам на пошту прийшов лист із підтвердженням про реєстрацію. Для того
            щоб продовжити користуватись застосунком перейдіть, будь ласка, за
            посиланням, що вказана у листі.
          </VerificationEmailParagraph>
          <VerificationEmailSubParagraph variant="p">
            Не прийшов лист? Перевірте, будь ласка, спам.
          </VerificationEmailSubParagraph>
        </TextBox>
        <LoginAccountButton
          label="Відправити ще раз"
          handleClick={sendEmailAgain}
        />
      </VerificationEmailWrapper>
    </WhiteLayout>
  );
}

export default VerificationEmailPageComponent;
