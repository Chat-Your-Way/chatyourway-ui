import { StyledFormControlLabel, StyledSwitch } from './Toogle.styled';

function Toogle({
  label = '',
  isChecked,
  handleChange,
  labelColor,
  labelPosition,
  borderColor,
  borderColorChecked,
  backgroundColor,
  backgroundColorChecked,
  ariaLabel = 'end',
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

export default Toogle;
