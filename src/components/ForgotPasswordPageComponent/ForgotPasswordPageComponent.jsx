import WhiteLayout from '../../ui-kit/components/WhiteLayout/WhiteLayout';
import { PATH } from '../../constans/routes.js';
import { useForm } from 'react-hook-form';

// eslint-disable-next-line max-len
import { FieldText } from '../RegistrationPageComponent/FieldText/FieldText.jsx';
import {
  LinkIcon,
  CloseIcon,
  LogoIcon,
  ForgotPasswordWrapper,
  ForgotPasswordTitle,
  ForgotPasswordText,
  ForgotPasswordForm,
  ButtonWrapper,
  ForgotPasswordButton,
} from './ForgotPasswordPageComponent.styled.js';
import { useSidebarContext } from '../../common/Sidebar/SidebarContext.js';

function ForgotPasswordPageComponent() {
  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({ defaultValues: { email: '' }, mode: 'onChange' });
  const { isTablet } = useSidebarContext();

  const onSubmit = (values) => {
    const email = values.email.trim().toLowerCase();
    // eslint-disable-next-line no-console
    console.log(email);
  };

  return (
    <WhiteLayout padding={isTablet ? '40px 112px' : '40px 20px'}>
      <ForgotPasswordWrapper>
        <LinkIcon to={PATH.LOGIN}>
          <CloseIcon />
        </LinkIcon>
        <LogoIcon />
        <ForgotPasswordTitle variant={isTablet ? 'h2' : 'h4'}>
          Забули свій пароль?
        </ForgotPasswordTitle>
        <ForgotPasswordText variant="h6">
          Введіть, будь ласка, адресу своєї електронної пошти, і ми надішлемо
          Вам інструкції з відновлення пароля.
        </ForgotPasswordText>
        <ForgotPasswordForm onSubmit={handleSubmit(onSubmit)}>
          <FieldText
            title="Email"
            id="email"
            control={control}
            errors={errors.email}
            placeholder="example@gmail.com"
          />
          <ButtonWrapper>
            <ForgotPasswordButton
              type="submit"
              label="Надіслати"
              disabled={!isValid}
            />
          </ButtonWrapper>
        </ForgotPasswordForm>
      </ForgotPasswordWrapper>
    </WhiteLayout>
  );
}

export default ForgotPasswordPageComponent;
