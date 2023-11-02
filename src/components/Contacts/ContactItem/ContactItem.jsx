import { memo } from 'react';
import Avatar from '../../../ui-kit/components/Avatar';
import {
  StyledBox,
  StyledName,
  SendMessage,
  Message,
} from './ContactItem.styled';
import { Avatars } from '../../../ui-kit/images/avatars';

const ContactItem = ({ data }) => {
  const AvatarImg = Avatars[data.avatar];

  return (
    <StyledBox>
      {AvatarImg && (
        <Avatar>
          <AvatarImg />
        </Avatar>
      )}
      <StyledName>{data.name}</StyledName>
      {data.online && <SendMessage icon={<Message />} />}
    </StyledBox>
  );
};

export default memo(ContactItem);
