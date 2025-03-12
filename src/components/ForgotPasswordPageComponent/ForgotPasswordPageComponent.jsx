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
import { sendEmailRestorePassword } from '../../redux/userSlice.js';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPageComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({ defaultValues: { email: '' }, mode: 'onChange' });
  const { isTablet } = useSidebarContext();

  const onSubmit = (values) => {
    const email = values.email.trim().toLowerCase();
    try {
      dispatch(sendEmailRestorePassword(email));
      toast.success(
        'Лист з інструкціями з відновлення пароля відправлено на вашу пошту',
      );
      navigate(`/${PATH.LOGIN}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <WhiteLayout padding={isTablet ? '40px 112px' : '40px 20px'}>
      <ForgotPasswordWrapper>
        <LinkIcon to={`/${PATH.LOGIN}`}>
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
