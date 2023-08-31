import { StyledCheckbox, StyledFormControlLabel } from './CheckBox.styled';

function CheckBox({ label = '', inputColor, labelColor, ...props }) {
  return (
    <StyledFormControlLabel
      control={
        <StyledCheckbox
          inputColor={inputColor}
          labelColor={labelColor}
          {...props}
        />
      }
      label={label}
    />
  );
}

export default CheckBox;
