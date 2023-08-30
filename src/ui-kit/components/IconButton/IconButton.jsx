import { StyledIconButton } from './IconButton.styled';
import { memo } from 'react';

function IconButton({
  handleClick,
  ariaLabel,
  isDisabled = false,
  icon = null,
  pLeft = '',
  pRight = '',
  pTop = '',
  pBottom = '',
  activeStroke = '',
  defaultStroke = '',
  hoverStroke = '',
  ...props
}) {
  return (
    <StyledIconButton
      onClick={handleClick}
      aria-label={ariaLabel}
      disabled={isDisabled}
      pLeft={pLeft}
      pRight={pRight}
      pTop={pTop}
      pBottom={pBottom}
      activeStroke={activeStroke}
      defaultStroke={defaultStroke}
      hoverStroke={hoverStroke}
      {...props}
    >
      {icon}
    </StyledIconButton>
  );
}

export default memo(IconButton);
