import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { PasswordIconHide, PasswordIconShow } from './FieldPassword.styled';
import {
  RegistrationInputWrapper,
  RegistrationLabel,
  RegistrationInput,
  RegistrationInputError,
} from '../RegistrationPageComponent.styled';
import { validationRules } from '../validationRules';

export const FieldPassword = ({ title, id, control, errors, watch }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const getRules = () => {
    return id === 'password'
      ? validationRules.password
      : {
          required: 'Confirm password is required',
          validate: (value) => value === watch || 'The passwords do not match',
        };
  };

  return (
    <RegistrationInputWrapper>
      <RegistrationLabel variant="h5">{title}</RegistrationLabel>
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
