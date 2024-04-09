import { memo } from 'react';
import {
  StyledBox,
  StyledAuthorBlock,
  MessageCount,
  StyledTimeText, //!
} from './LastMessages.styled';
import { ICONS } from '../../../../../ui-kit/icons';

const LastMessages = ({
  isTyping = false,
  userName = 'user',
  message = 'Супер',
  isOpenChat = false,
  isOpenContacts = false,
  unreadedMessage,
  lastMessageTime,
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
      <StyledTimeText>{lastMessageTime}</StyledTimeText>
    </StyledBox>
  );
};

export default memo(LastMessages);
