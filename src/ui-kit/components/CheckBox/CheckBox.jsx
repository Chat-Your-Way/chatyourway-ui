import { memo } from 'react';
import { StyledCheckbox, StyledFormControlLabel } from './CheckBox.styled';

function CheckBox({
  label = '',
  isChecked = false,
  handleChange,
  ariaLabel = '',
  ...props
}) {
  return (
    <StyledFormControlLabel
      control={
        <StyledCheckbox
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

export default memo(CheckBox);
