import { StyledButton } from './Button.styled';
import { memo } from 'react';

function DefaultButton({
  label = 'Button',
  handleClick,
  isDisabled = false,
  startIcon = null,
  endIcon = null,
  fontSize = '',
  withoutBackground = false,
  iconWidth = '',
  iconHeight = '',
  ...props
}) {
  return (
    <StyledButton
      onClick={handleClick}
      disabled={isDisabled}
      startIcon={startIcon}
      endIcon={endIcon}
      fontSize={fontSize}
      withoutBackground={withoutBackground}
      iconWidth={iconWidth}
      iconHeight={iconHeight}
      {...props}
    >
      {label}
    </StyledButton>
  );
}

export default memo(DefaultButton);
