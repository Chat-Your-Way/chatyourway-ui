import WhiteLayout from '../../ui-kit/components/WhiteLayout/WhiteLayout';
import {
  LoginAccountButton,
  VerificationEmailTitle,
  VerificationEmailWrapper,
  VerificationEmailSubTitle,
  VerificationEmailParagraph,
  VerificationEmailSubParagraph,
} from './VerificationEmailPageComponent.styled';

function VerificationEmailPageComponent() {
  return (
    <WhiteLayout padding="225px 157px">
      <VerificationEmailWrapper>
        <VerificationEmailTitle variant="h2">
          Реєстрація пройшла успішно
        </VerificationEmailTitle>
        <VerificationEmailSubTitle variant="h3">
          Вітаємо!
        </VerificationEmailSubTitle>
        <VerificationEmailParagraph variant="p">
          Вам на пошту прийшов лист із підтвердженням про реєстрацію. Для того
          щоб продовжити користуватись застосунком перейдіть, будь ласка, за
          ссилкою, що вказана у листі.
        </VerificationEmailParagraph>
        <VerificationEmailSubParagraph variant="p">
          Не прийшов лист? Перевірте, будь ласка, спам.
        </VerificationEmailSubParagraph>
        <LoginAccountButton label="Відправити ще раз" />
      </VerificationEmailWrapper>
    </WhiteLayout>
  );
}

export default VerificationEmailPageComponent;
