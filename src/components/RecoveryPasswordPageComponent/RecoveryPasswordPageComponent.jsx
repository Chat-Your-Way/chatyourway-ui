import WhiteLayout from '../../ui-kit/components/WhiteLayout/WhiteLayout';
// eslint-disable-next-line max-len
import { FieldPassword } from '../RegistrationPageComponent/FieldPassword/FieldPassword';
import { LoginButton } from '../LoginPageComponent/LoginPageComponent.styled';
import { useMediaQuery } from 'react-responsive';
import { useForm } from 'react-hook-form';
import { PATH } from '../../constans/routes';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../../redux/auth-operations';
import {
  FieldTextWrapper,
  LoginLink,
} from '../RegistrationPageComponent/RegistrationPageComponent.styled.js';
import {
  RecoveryPasswordWrapper,
  RecoveryPasswordForm,
  RecoveryPasswordTitle,
  ButtonWrapper,
  LinkIcon,
  CloseIcon,
  LogoIcon,
} from './RecoveryPasswordPageComponent.styled';
import { toast } from 'react-toastify';

function RecoveryPasswordPageComponent() {
  const isTablet = useMediaQuery({ query: '(min-width: calc(845px - 0.02px)' });
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
    watch,
  } = useForm({
    defaultValues: { password: '', confirm: '' },
    mode: 'onChange',
  });
  const passwordValue = watch('password');

  const onSubmit = async (values) => {
    const { password } = values;
    try {
      const result = await resetPassword({
        newPassword: password,
        emailToken: token,
      });
      toast.success(result?.data?.data || 'Пароль успішно змінено');
      navigate(`/${PATH.LOGIN}`);
    } catch (error) {
      console.error(
        'error in onSubmit in RecoveryPasswordPageComponent:',
        error,
      );
      toast.error('error in onSubmit in RecoveryPasswordPageComponent:', error);
    }
  };

  return (
    <WhiteLayout padding={isTablet ? '40px 112px' : '40px 20px'}>
      <RecoveryPasswordWrapper>
        <LinkIcon to={`/${PATH.FORGOT_PASSWORD}`}>
          <CloseIcon />
        </LinkIcon>

        <LogoIcon />

        <RecoveryPasswordTitle variant={isTablet ? 'h2' : 'h4'}>
          Відновлення пароля
        </RecoveryPasswordTitle>

        <RecoveryPasswordForm onSubmit={handleSubmit(onSubmit)}>
          <FieldTextWrapper>
            <FieldPassword
              title="Пароль"
              id="password"
              control={control}
              errors={errors.password}
              placeholder="Мінімум 4 символи"
            />
          </FieldTextWrapper>

          <FieldTextWrapper>
            <FieldPassword
              title="Підтвердити пароль"
              id="confirm"
              control={control}
              errors={errors.confirm}
              watch={passwordValue}
              placeholder="Мінімум 4 символи"
            />
          </FieldTextWrapper>
          <ButtonWrapper>
            <LoginButton
              type="submit"
              label="Скинути пароль"
              disabled={!isValid}
            />
          </ButtonWrapper>
          <LoginLink to={`/${PATH.LOGIN}`}>На сторінку авторизації</LoginLink>
        </RecoveryPasswordForm>
      </RecoveryPasswordWrapper>
    </WhiteLayout>
  );
}

export default RecoveryPasswordPageComponent;
