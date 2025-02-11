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
  LoginLink,
  FieldTextWrapper,
} from './RegistrationPageComponent.styled';
import { useRegistrationMutation } from '../../redux/auth-operations';
import { PATH } from '../../constans/routes';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

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
      const result = await registration(userData);
      const { error, data: registrationData } = result;

      if (error) {
        if (error.data.data.message) {
          toast.error(error.data.data.message);
        } else {
          toast.error('Виникла помилка під час реєстрації');
        }
        return;
      }
      // It was needed when registration proccess used the tokens
      // localStorage.setItem('accessToken', registrationData.accessToken);
      // localStorage.setItem('refreshToken', registrationData.refreshToken);

      dispatch(setUserInfo(userData));
      navigate(PATH.VERIFICATION_EMAIL);
      // This is an old code below - it was time when two tokens was used.
      // if (registrationData.registrationStatus === 'successfull') {
      // dispatch(setUserInfo(userData));
      // navigate(PATH.VERIFICATION_EMAIL);
      // }
    } catch (error) {
      toast.error('Виникла помилка під час реєстрації:', error);
    }
  };

  return (
    <RegistrationWrapper>
      <LogoIcon />
      <RegistrationForm onSubmit={handleSubmit(onSubmit)}>
        <FieldTextWrapper>
          <FieldText
            title="Ім'я"
            id="nickname"
            control={control}
            errors={errors.nickname}
            placeholder={`Кекс`}
          />
        </FieldTextWrapper>
        <FieldTextWrapper>
          <FieldText
            title="Email"
            id="email"
            control={control}
            errors={errors.email}
            placeholder={'example@gmail.com'}
          />
        </FieldTextWrapper>

        <FieldTextWrapper>
          <FieldPassword
            title="Пароль"
            id="password"
            control={control}
            errors={errors.password}
            placeholder={'Мінімум 8 символів'}
          />
        </FieldTextWrapper>

        <FieldTextWrapper>
          <FieldPassword
            title="Підтвердити пароль"
            id="confirm"
            control={control}
            errors={errors.confirm}
            watch={passwordValue}
            placeholder={'Мінімум 8 символів'}
          />
        </FieldTextWrapper>

        <FieldRadio id="avatar" control={control} />

        <FieldCheckbox id="agreement" control={control} />

        <RegistrationButton
          type="submit"
          label="Створити акаунт"
          disabled={!isValid}
        />
        <LoginLink to={`/${PATH.LOGIN}`}>Вже зареєстрований? Увійти</LoginLink>
      </RegistrationForm>
    </RegistrationWrapper>
  );
}

export default RegistrationPageComponent;
