import { memo, useState } from 'react';
import { StyledBox } from './Topics.styled';
import ChatsBlock from './ChatsBlock';
import TopicsHeader from './TopicsHeader';
import { useSelector } from 'react-redux';
import { selectChatOpened } from '../../redux/chatSlice';

const Topics = ({
  isOpenChat = false,
  isOpenContacts = false,
  handleBTNTopicFunc,
  handleBTNFunc,
}) => {
  const [filter, setFilter] = useState('all');

  const chatOpened = useSelector(selectChatOpened);

  console.log('chatOpened', chatOpened); //!

  return (
    <StyledBox isOpenChat={isOpenChat} isOpenContacts={isOpenContacts}>
      <TopicsHeader
        isOpenChat={isOpenChat}
        isOpenContacts={isOpenContacts}
        handleBTNFunc={handleBTNFunc}
        active={filter}
        setFilter={setFilter}
      />
      <ChatsBlock
        isOpenChat={isOpenChat}
        isOpenContacts={isOpenContacts}
        handleBTNTopicFunc={handleBTNTopicFunc}
        filter={filter}
      />
    </StyledBox>
  );
};

export default memo(Topics);
