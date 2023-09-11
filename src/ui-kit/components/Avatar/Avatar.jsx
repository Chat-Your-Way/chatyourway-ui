import { memo } from 'react';
import { AvatarText, AvatarWrapper } from './Avatar.styled';

function Avatar({
  AvatarComponent = 'AB',
  avatarWidth = '80px',
  avatarHight = '80px',
  avatarBorder = '',
  borderRadius = '80px',
  backgroundColor = '#ACADFF',
}) {
  return (
    <AvatarWrapper
      width={avatarWidth}
      height={avatarHight}
      border={avatarBorder}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
    >
      {typeof AvatarComponent === 'string' ? (
        <AvatarText> {AvatarComponent} </AvatarText>
      ) : (
        <AvatarComponent />
      )}
    </AvatarWrapper>
  );
}

export default memo(Avatar);
