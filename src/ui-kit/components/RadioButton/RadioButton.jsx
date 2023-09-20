import { memo } from 'react';
import {
  StyledRadioButton,
  StyledFormControlLabel,
} from './RadioButton.styled';

function RadioButton({
  label = '',
  isChecked,
  handleChange,
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
          onChange={handleChange}
          inputProps={{
            'aria-label': ariaLabel,
          }}
          {...props}
        />
      }
      label={label}
    />
  );
}

export default memo(RadioButton);
