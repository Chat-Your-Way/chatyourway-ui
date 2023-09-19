import { memo } from 'react';
import { AvatarStyled } from './Avatar.styled';

function Avatar({
  children,
  isCurrent = false,
  size = 'md',
  backgroundColor = '#ACADFF',
  clickHandler = null,
}) {
  return (
    <AvatarStyled
      current={isCurrent.toString()}
      size={size}
      backgroundcolor={backgroundColor}
      onClick={clickHandler}
    >
      {children}
    </AvatarStyled>
  );
}

export default memo(Avatar);
