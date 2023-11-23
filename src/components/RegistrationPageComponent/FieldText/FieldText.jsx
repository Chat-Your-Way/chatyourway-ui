import { validationRules } from '../validationRules';
import { Controller } from 'react-hook-form';
import { TextInputIcon } from './FieldText.styled';
import {
  RegistrationInputWrapper,
  RegistrationLabel,
  RegistrationInput,
  RegistrationInputError,
} from '../RegistrationPageComponent.styled';

export const FieldText = ({ title, id, control, errors, placeholder }) => {
  const getRules = () => {
    return id === 'nickname' ? validationRules.nickname : validationRules.email;
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
            type="text"
            onChange={onChange}
            value={value}
            endAdornment={<TextInputIcon />}
            placeholder={placeholder}
          />
        )}
      />
      {errors && (
        <RegistrationInputError>{errors.message}</RegistrationInputError>
      )}
    </RegistrationInputWrapper>
  );
};
