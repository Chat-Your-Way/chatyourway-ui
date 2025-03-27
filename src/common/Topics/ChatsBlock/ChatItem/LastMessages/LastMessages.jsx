import { memo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectChatOpened,
  selectContactsOpened,
} from '../../../../../redux/chatSlice';
import {
  StyledBox,
  StyledAuthorBlock,
  MessageCount,
  StyledTimeText,
} from './LastMessages.styled';
import { ICONS } from '../../../../../ui-kit/icons';

const LastMessages = ({
  isTyping = false,
  // userName = 'user',
  // message = 'Супер',
  userName,
  message,
  unreadedMessage,
  lastMessageTime,
}) => {
  const typingStatus = `${userName}/Пише...`;
  const defaultStatus = userName && message ? `${userName}: ${message}` : null;

  const chatOpened = useSelector(selectChatOpened);
  const contactsOpened = useSelector(selectContactsOpened);

  return (
    <StyledBox chatOpened={chatOpened} contactsOpened={contactsOpened}>
      <StyledAuthorBlock isTyping={isTyping} chatOpened={chatOpened}>
        {isTyping ? typingStatus : defaultStatus}
      </StyledAuthorBlock>
      {unreadedMessage === 0 ? null : unreadedMessage ? (
        <MessageCount badgeContent={unreadedMessage} />
      ) : (
        <ICONS.CONFIRM />
      )}
      <StyledTimeText>{lastMessageTime}</StyledTimeText>
    </StyledBox>
  );
};

export default memo(LastMessages);
