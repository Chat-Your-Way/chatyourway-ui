import { StyledCheckbox, StyledFormControlLabel } from './CheckBox.styled';

function CheckBox({
  label = '',
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
