import { useForm } from 'react-hook-form';
import { FieldText } from './FieldText/FieldText';
import { FieldPassword } from './FieldPassword/FieldPassword';
import { FieldRadio } from './FieldRadio/FieldRadio';
import { FieldCheckbox } from './FieldCheckbox/FieldCheckbox';
import {
  RegistrationWrapper,
  RegistrationForm,
  LogoIcon,
  RegistrationButton,
} from './RegistrationPageComponent.styled';
import { useRegistrationMutation } from '../../redux/auth-operations';
import { PATH } from '../../constans/routes';
import { useNavigate } from 'react-router-dom';

const defaultValues = {
  nickname: '',
  email: '',
  password: '',
  avatar: '1',
  confirm: '',
  agreement: false,
};

function RegistrationPageComponent() {
  const [registration] = useRegistrationMutation();
  const navigate = useNavigate();

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

  const onSubmit = async ({ avatar, email, nickname, password }) => {
    const userData = {
      nickname,
      email: email.trim().toLowerCase(),
      avatarId: Number(avatar),
      password,
    };

    try {
      const { error } = await registration(userData);

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

      navigate(PATH.VERIFICATION_EMAIL);
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
          placeholder={'Nickname'}
        />

        <FieldText
          title="Email"
          id="email"
          control={control}
          errors={errors.email}
          placeholder={'Email'}
        />

        <FieldPassword
          title="Пароль"
          id="password"
          control={control}
          errors={errors.password}
          placeholder={'Пароль'}
        />

        <FieldPassword
          title="Підтвердити пароль"
          id="confirm"
          control={control}
          errors={errors.confirm}
          watch={passwordValue}
          placeholder={'Підтвердити пароль'}
        />

        <FieldRadio id="avatar" control={control} />

        <FieldCheckbox id="agreement" control={control} />

        <RegistrationButton
          type="submit"
          label="Створити акаунт"
          isDisabled={!isValid}
        />
      </RegistrationForm>
    </RegistrationWrapper>
  );
}

export default RegistrationPageComponent;
