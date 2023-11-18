import { useForm } from 'react-hook-form';
import { FieldText } from './FieldText/FieldText';
import { FieldPassword } from './FieldPassword/FieldPassword';
import { FieldRadio } from './FieldRadio/FieldRadio';
import { FieldCheckbox } from './FieldCheckbox/FieldCheckbox';
import { LoginButton } from '../LoginPageComponent/LoginPageComponent.styled';
import {
  RegistrationWrapper,
  RegistrationForm,
  LogoIcon,
} from './RegistrationPageComponent.styled';
import { useRegistrationMutation } from '../../redux/auth-operations';
import { PATH } from '../../constans/routes';

const defaultValues = {
  nickname: '',
  email: '',
  password: '',
  avatar: '3',
  confirm: '',
  agreement: false,
};

function RegistrationPageComponent() {
  const [registration] = useRegistrationMutation();
  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
    watch,
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  });
  const passwordValue = watch('password');

  const onSubmit = async (values) => {
    const { avatar, email, nickname, password } = values;
    const userData = {
      nickname,
      email: email.trim().toLowerCase(),
      avatarId: Number(avatar),
      password,
    };
    // eslint-disable-next-line
    console.log(userData);
    try {
      const { error, data } = await registration(userData);

      if (error) {
        if (
          error.data.message.includes(`Email ${userData.email} already in use`)
        ) {
          alert(`Електронна пошта ${userData.email} вже використовується`);
        } else {
          alert(error.data.message);
        }
        return;
      }

      // eslint-disable-next-line
      console.log(data);
      window.location.href = PATH.VERIFICATION_EMAIL;
    } catch (error) {
      console.error('Виникла помилка під час заповнення форми:', error);
    }
  };

  return (
    <RegistrationWrapper>
      <LogoIcon />
      <RegistrationForm onSubmit={handleSubmit(onSubmit)}>
        <FieldText
          title="Ім'я"
          id="nickname"
          control={control}
          errors={errors.nickname}
        />

        <FieldText
          title="Email"
          id="email"
          control={control}
          errors={errors.email}
        />

        <FieldPassword
          title="Пароль"
          id="password"
          control={control}
          errors={errors.password}
        />

        <FieldPassword
          title="Підтвердити пароль"
          id="confirm"
          control={control}
          errors={errors.confirm}
          watch={passwordValue}
        />

        <FieldRadio id="avatar" control={control} />

        <FieldCheckbox id="agreement" control={control} />

        <LoginButton
          type="submit"
          label="Створити акаунт"
          disabled={!isValid}
        />
      </RegistrationForm>
    </RegistrationWrapper>
  );
}

export default RegistrationPageComponent;
