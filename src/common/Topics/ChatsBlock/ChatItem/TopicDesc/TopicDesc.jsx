import { memo } from 'react';
import { StyledBox, StyledThemeText, StyledTimeText } from './TopicDesc.styled';

const TopicDesc = ({
  isOpenChat = false,
  isOpenContacts = false,
  title = 'name',
  lastMessageTime = '00:00',
}) => {
  return (
    <StyledBox isOpenChat={isOpenChat} isOpenContacts={isOpenContacts}>
      <StyledThemeText>{title}</StyledThemeText>
      <StyledTimeText>{lastMessageTime}</StyledTimeText>
    </StyledBox>
  );
};

export default memo(TopicDesc);
