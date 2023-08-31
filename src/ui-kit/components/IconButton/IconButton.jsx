import { StyledIconButton } from './IconButton.styled';
import { memo } from 'react';

function IconButton({
  handleClick,
  ariaLabel,
  isDisabled = false,
  icon = null,
  editPath = false,
  pLeft = '',
  pRight = '',
  pTop = '',
  pBottom = '',
  activeFill = '',
  defaultFill = '',
  hoverFill = '',
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
      editPath={editPath}
      activeFill={activeFill}
      defaultFill={defaultFill}
      hoverFill={hoverFill}
      {...props}
    >
      {icon}
    </StyledIconButton>
  );
}

export default memo(IconButton);
