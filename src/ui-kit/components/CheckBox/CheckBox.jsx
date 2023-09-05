import { StyledCheckbox, StyledFormControlLabel } from './CheckBox.styled';

function CheckBox({
  label = '',
  isChecked = false,
  handleChange,
  inputColor,
  labelColor,
  ariaLabel = '',
  ...props
}) {
  return (
    <StyledFormControlLabel
      control={
        <StyledCheckbox
          checked={isChecked}
          inputColor={inputColor}
          labelColor={labelColor}
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

export default CheckBox;
