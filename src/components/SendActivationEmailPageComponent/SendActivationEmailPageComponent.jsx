import { useState, useEffect } from 'react';
import WhiteLayout from '../../ui-kit/components/WhiteLayout/WhiteLayout';
import { PATH } from '../../constans/routes.js';
import { useForm } from 'react-hook-form';

// eslint-disable-next-line max-len
import { FieldText } from '../RegistrationPageComponent/FieldText/FieldText.jsx';
import {
  LinkIcon,
  CloseIcon,
  LogoIcon,
  SendActivationEmailWrapper,
  SendActivationEmailTitle,
  SendActivationEmailText,
  SendActivationEmailForm,
  ButtonWrapper,
  SendActivationEmailButton,
  TimerText,
  LinkText,
} from './SendActivationEmailPageComponent.styled.js';
import { useSidebarContext } from '../../common/Sidebar/SidebarContext.js';
import { useResendActivationEmailMutation } from '../../redux/auth-operations.js';
import { toast } from 'react-toastify';

function SendActivationEmailPageComponent() {
  const [resendActivationEmail] = useResendActivationEmailMutation();
  const [timer, setTimer] = useState(0);

  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({ defaultValues: { email: '' }, mode: 'onChange' });
  const { isTablet } = useSidebarContext();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const onSubmit = async (values) => {
    const email = values.email.trim().toLowerCase();
    try {
      const response = await resendActivationEmail({ email: email });
      if (response.error) {
        toast.error(
          response.error.data.data ?? 'Помилка відправки листа активації',
        );
        return;
      }
      if (response.data) {
        toast.success('Лист активації відправлено');
        setTimer(60);
      }
    } catch (error) {
      const message = error.message;
      toast.error(message && 'Помилка відправки листа активації');
    }
  };

  return (
    <WhiteLayout padding={isTablet ? '40px 112px' : '40px 20px'}>
      <SendActivationEmailWrapper>
        <LinkIcon to={`/${PATH.LOGIN}`}>
          <CloseIcon />
        </LinkIcon>
        <LogoIcon />
        <SendActivationEmailTitle variant={isTablet ? 'h2' : 'h4'}>
          Не прийшов лист активації?
        </SendActivationEmailTitle>
        <SendActivationEmailText variant="h6">
          Введіть, будь ласка, адресу своєї електронної пошти, і ми надішлемо
          Вам лист активації повторно.
        </SendActivationEmailText>
        <SendActivationEmailForm onSubmit={handleSubmit(onSubmit)}>
          <FieldText
            title="Email"
            id="email"
            control={control}
            errors={errors.email}
            placeholder="example@gmail.com"
            type="email"
          />
          {timer > 0 && (
            <TimerText>
              До повторної відправки запиту залишилося: {timer} сек
            </TimerText>
          )}
          <ButtonWrapper>
            <SendActivationEmailButton
              type="submit"
              label="Надіслати"
              disabled={!isValid || timer > 0}
            />
          </ButtonWrapper>
          <LinkText to={`/${PATH.LOGIN}`}>Увійти в акаунт</LinkText>
        </SendActivationEmailForm>
      </SendActivationEmailWrapper>
    </WhiteLayout>
  );
}

export default SendActivationEmailPageComponent;
