import { memo } from 'react';
import { StyledFormControlLabel, StyledSwitch } from './Toogle.styled';

function Toogle({
  label = '',
  isChecked,
  handleChange,
  labelPosition = 'end',
  ariaLabel = '',
  ...props
}) {
  return (
    <StyledFormControlLabel
      control={
        <StyledSwitch
          onChange={handleChange}
          checked={isChecked}
          labelPosition={labelPosition}
          inputProps={{ 'aria-label': ariaLabel }}
          {...props}
        />
      }
      label={label}
    />
  );
}

export default memo(Toogle);
