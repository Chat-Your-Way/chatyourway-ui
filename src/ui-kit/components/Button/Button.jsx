/** @jsxImportSource @emotion/react */
import { StyledButton } from './Button.styled';
import { memo } from 'react';

function DefaultButton({
  startIcon = null,
  isDisabled = false,
  endIcon = false,
  label = 'Button',
  handleClick,
  ...props
}) {
  return (
    <StyledButton
      onClick={handleClick}
      disabled={isDisabled}
      startIcon={startIcon}
      endIcon={endIcon}
      {...props}
    >
      {label}
    </StyledButton>
  );
}

export default memo(DefaultButton);
