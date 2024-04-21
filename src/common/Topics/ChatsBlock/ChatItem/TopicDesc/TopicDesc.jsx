import { memo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectChatOpened,
  selectContactsOpened,
} from '../../../../../redux/chatSlice';
import { StyledBox, StyledThemeText } from './TopicDesc.styled';

const TopicDesc = ({ title = 'name' }) => {
  const chatOpened = useSelector(selectChatOpened);
  const contactsOpened = useSelector(selectContactsOpened);

  return (
    <StyledBox chatOpened={chatOpened} contactsOpened={contactsOpened}>
      <StyledThemeText>{title}</StyledThemeText>
    </StyledBox>
  );
};

export default memo(TopicDesc);
