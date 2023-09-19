import { memo } from 'react';
import { StyledFormControlLabel, StyledSwitch } from './Toogle.styled';

function Toogle({
  label = '',
  isChecked,
  handleChange,
  labelColor,
  labelPosition = 'end',
  borderColor,
  borderColorChecked,
  backgroundColor,
  backgroundColorChecked,
  ariaLabel = '',
  ...props
}) {
  return (
    <StyledFormControlLabel
      control={
        <StyledSwitch
          onChange={handleChange}
          checked={isChecked}
          labelColor={labelColor}
          labelPosition={labelPosition}
          borderColor={borderColor}
          borderColorChecked={borderColorChecked}
          backgroundColor={backgroundColor}
          backgroundColorChecked={backgroundColorChecked}
          inputProps={{ 'aria-label': ariaLabel }}
          {...props}
        />
      }
      label={label}
    />
  );
}

export default memo(Toogle);
