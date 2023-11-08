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

const defaultValues = {
  nickname: '',
  email: '',
  password: '',
  avatar: '3',
  confirm: '',
  agreement: false,
};

function RegistrationPageComponent() {
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

  const onSubmit = (values) => {
    const { avatar, email, nickname, password } = values;
    const userData = {
      nickname,
      email: email.trim().toLowerCase(),
      avatarId: Number(avatar),
      password,
    };
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
