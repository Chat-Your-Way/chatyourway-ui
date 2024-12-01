import { validationRules } from '../validationRules';
import { Controller } from 'react-hook-form';
import { TextInputIcon } from './FieldText.styled';
import {
  RegistrationInputWrapper,
  RegistrationLabel,
  RegistrationInput,
  RegistrationInputError,
} from '../RegistrationPageComponent.styled';

export const FieldText = ({
  title,
  id,
  control,
  errors,
  placeholder,
  inputWidth,
  label,
}) => {
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
        render={({ field: { onChange } }) => (
          <>
            <RegistrationInput
              errors={errors ? 'true' : 'false'}
              type="text"
              onChange={onChange}
              // value={value}
              endAdornment={<TextInputIcon />}
              placeholder={placeholder}
              inputWidth={inputWidth}
              label={label}
            />
          </>
        )}
      />
      {errors && (
        <RegistrationInputError>{errors.message}</RegistrationInputError>
      )}
    </RegistrationInputWrapper>
  );
};
