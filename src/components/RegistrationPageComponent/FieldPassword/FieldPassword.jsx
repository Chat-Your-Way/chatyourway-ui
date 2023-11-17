import { useState } from 'react';
import { validationRules } from '../validationRules';
import { Controller } from 'react-hook-form';
import { PasswordIconHide, PasswordIconShow } from './FieldPassword.styled';
import {
  RegistrationInputWrapper,
  RegistrationLabel,
  RegistrationInput,
  RegistrationInputError,
} from '../RegistrationPageComponent.styled';

export const FieldPassword = ({
  title,
  id,
  control,
  errors,
  watch,
  navlink,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const getRules = () => {
    return id === 'password'
      ? validationRules.password
      : {
          required: "Підтвердження - обов'язкове",
          validate: (value) => value === watch || 'Не ідентично паролю',
        };
  };

  return (
    <RegistrationInputWrapper>
      <RegistrationLabel variant="h5">
        <span>{title}</span>
        {navlink}
      </RegistrationLabel>
      <Controller
        control={control}
        name={id}
        rules={getRules()}
        render={({ field: { onChange, value } }) => (
          <RegistrationInput
            errors={errors ? 'true' : 'false'}
            type={showPassword ? 'text' : 'password'}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            endAdornment={
              showPassword ? (
                <PasswordIconShow onClick={toggleShowPassword} />
              ) : (
                <PasswordIconHide onClick={toggleShowPassword} />
              )
            }
          />
        )}
      />
      {errors && (
        <RegistrationInputError>{errors.message}</RegistrationInputError>
      )}
    </RegistrationInputWrapper>
  );
};
