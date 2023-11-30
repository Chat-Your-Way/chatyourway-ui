import WhiteLayout from '../../ui-kit/components/WhiteLayout/WhiteLayout';
// eslint-disable-next-line max-len
import { FieldPassword } from '../RegistrationPageComponent/FieldPassword/FieldPassword';
import { LoginButton } from '../LoginPageComponent/LoginPageComponent.styled';
import { useMediaQuery } from 'react-responsive';
import { useForm } from 'react-hook-form';
import { PATH } from '../../constans/routes';
import {
  RecoveryPasswordWrapper,
  RecoveryPasswordForm,
  RecoveryPasswordTitle,
  ButtonWrapper,
  LinkIcon,
  CloseIcon,
  LogoIcon,
} from './RecoveryPasswordPageComponent.styled';

function RecoveryPasswordPageComponent() {
  const isTablet = useMediaQuery({ query: '(min-width: calc(845px - 0.02px)' });
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

  const onSubmit = (values) => {
    const { password } = values;
    // eslint-disable-next-line no-console
    console.log(password);
  };

  return (
    <WhiteLayout padding={isTablet ? '40px 112px' : '40px 20px'}>
      <RecoveryPasswordWrapper>
        <LinkIcon to={PATH.FORGOT_PASSWORD}>
          <CloseIcon />
        </LinkIcon>

        <LogoIcon />

        <RecoveryPasswordTitle variant={isTablet ? 'h2' : 'h4'}>
          Відновлення пароля
        </RecoveryPasswordTitle>

        <RecoveryPasswordForm onSubmit={handleSubmit(onSubmit)}>
          <FieldPassword
            title="Пароль"
            id="password"
            control={control}
            errors={errors.password}
            placeholder="Мінімум 4 символи"
          />
          <FieldPassword
            title="Підтвердити пароль"
            id="confirm"
            control={control}
            errors={errors.confirm}
            watch={passwordValue}
            placeholder="Мінімум 4 символи"
          />
          <ButtonWrapper>
            <LoginButton
              type="submit"
              label="Скинути пароль"
              disabled={!isValid}
            />
          </ButtonWrapper>
        </RecoveryPasswordForm>
      </RecoveryPasswordWrapper>
    </WhiteLayout>
  );
}

export default RecoveryPasswordPageComponent;
