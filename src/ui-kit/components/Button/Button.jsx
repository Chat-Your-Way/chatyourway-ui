/** @jsxImportSource @emotion/react */
import { StyledButton } from './Button.styled';

export function DefaultButton({
  isStartIcon = false,
  isDisabled = false,
  isEndIcon = false,
  label = 'Button',
  handleClick,
}) {
  return (
    <StyledButton
      onClick={handleClick}
      disabled={isDisabled}
      startIcon={isStartIcon}
      endIcon={isEndIcon}
    >
      {label}
    </StyledButton>
  );
}
