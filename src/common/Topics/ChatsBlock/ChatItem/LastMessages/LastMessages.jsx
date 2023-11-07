import { memo } from 'react';
import {
  StyledBox,
  StyledAuthorBlock,
  MessageCount,
} from './LastMessages.styled';
import { ICONS } from '../../../../../ui-kit/icons';

const LastMessages = ({
  isTyping = false,
  userName = 'user',
  message = 'Супер',
  isOpenChat = false,
  isOpenContacts = false,
  unreadedMessage,
}) => {
  const typingStatus = `${userName}/Пише...`;
  const defaultStatus = `${userName}: ${message}`;
  return (
    <StyledBox isOpenChat={isOpenChat} isOpenContacts={isOpenContacts}>
      <StyledAuthorBlock isTyping={isTyping}>
        {isTyping ? typingStatus : defaultStatus}
      </StyledAuthorBlock>
      {unreadedMessage ? (
        <MessageCount badgeContent={unreadedMessage} />
      ) : (
        <ICONS.CONFIRM />
      )}
    </StyledBox>
  );
};

export default memo(LastMessages);
