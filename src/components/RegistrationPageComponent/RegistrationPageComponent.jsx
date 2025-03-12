/* eslint-disable no-unused-vars */
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
import { setUserInfo } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const {
        error,
        data: registrationData,
        isSuccess,
      } = await registration(userData);

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

      // It was needed when registration proccess used the tokens
      // localStorage.setItem('accessToken', registrationData.accessToken);
      // localStorage.setItem('refreshToken', registrationData.refreshToken);
      if (isSuccess) {
        dispatch(setUserInfo(userData));
        navigate(PATH.VERIFICATION_EMAIL);
        // This is an old code below - it was time when two tokens was used.
        // if (registrationData.registrationStatus === 'successfull') {
        // dispatch(setUserInfo(userData));
        // navigate(PATH.VERIFICATION_EMAIL);
        // }
      }
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
          placeholder={`Кекс`}
        />

        <FieldText
          title="Email"
          id="email"
          control={control}
          errors={errors.email}
          placeholder={'example@gmail.com'}
        />

        <FieldPassword
          title="Пароль"
          id="password"
          control={control}
          errors={errors.password}
          placeholder={'Мінімум 8 символів'}
        />

        <FieldPassword
          title="Підтвердити пароль"
          id="confirm"
          control={control}
          errors={errors.confirm}
          watch={passwordValue}
          placeholder={'Мінімум 8 символів'}
        />

        <FieldRadio id="avatar" control={control} />

        <FieldCheckbox id="agreement" control={control} />

        <RegistrationButton
          type="submit"
          label="Створити акаунт"
          disabled={!isValid}
        />
      </RegistrationForm>
    </RegistrationWrapper>
  );
}

export default RegistrationPageComponent;
