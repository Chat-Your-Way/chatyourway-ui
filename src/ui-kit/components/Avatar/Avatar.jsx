import { memo } from 'react';
import { AvatarStyled } from './Avatar.styled';

function Avatar({
  children,
  isCurrent = false,
  size = 'xl',
  backgroundColor = '#ACADFF',
}) {
  return (
    <AvatarStyled
      current={isCurrent.toString()}
      size={size}
      backgroundcolor={backgroundColor}
    >
      {children}
    </AvatarStyled>
  );
}

export default memo(Avatar);
