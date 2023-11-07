import { Controller } from 'react-hook-form';
import { validationRules } from '../validationRules';
import { CheckboxTitle, CheckboxLink } from './FieldCheckbox.styled';
import CheckBox from '../../../ui-kit/components/CheckBox/CheckBox';

export const FieldCheckbox = ({ id, control }) => {
  return (
    <Controller
      control={control}
      name={id}
      rules={validationRules.agreement}
      render={({ field: { value, onChange } }) => (
        <CheckBox
          isChecked={value}
          handleChange={onChange}
          ariaLabel={{ 'aria-label': 'controlled' }}
          label={
            <CheckboxTitle>
              Я погоджуюсь із <CheckboxLink>правилами чату</CheckboxLink>
            </CheckboxTitle>
          }
        />
      )}
    />
  );
};
