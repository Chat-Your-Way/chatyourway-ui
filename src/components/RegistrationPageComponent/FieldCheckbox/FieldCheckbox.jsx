import { Controller } from 'react-hook-form';
import { validationRules } from '../validationRules';
import {
  CheckboxLabel,
  CheckboxTitle,
  CheckboxLink,
  CheckboxStyled,
} from './FieldCheckbox.styled';

export const FieldCheckbox = ({ id, control }) => {
  return (
    <Controller
      control={control}
      name={id}
      rules={validationRules.agreement}
      render={({ field: { value, onChange } }) => (
        <CheckboxLabel
          label={
            <CheckboxTitle>
              Я погоджуюсь із <CheckboxLink>правилами чату</CheckboxLink>
            </CheckboxTitle>
          }
          labelPlacement="end"
          control={
            <CheckboxStyled
              checked={value}
              onChange={onChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
        />
      )}
    />
  );
};
