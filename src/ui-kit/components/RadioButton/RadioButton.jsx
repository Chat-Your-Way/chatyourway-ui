import { memo } from 'react';
import {
  StyledRadioButton,
  StyledFormControlLabel,
} from './RadioButton.styled';

function RadioButton({
  label = '',
  isChecked,
  handleChange,
  radioColor = '',
  labelColor = '',
  ariaLabel = '',
  value = '',
  ...props
}) {
  return (
    <StyledFormControlLabel
      value={value}
      control={
        <StyledRadioButton
          checked={isChecked}
          radioColor={radioColor}
          labelColor={labelColor}
          onChange={handleChange}
          inputProps={{
            'aria-label': ariaLabel,
            radioColor: radioColor,
            labelColor: labelColor,
          }}
          {...props}
        />
      }
      label={label}
    />
  );
}

export default memo(RadioButton);
