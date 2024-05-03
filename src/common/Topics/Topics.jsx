import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChatOpened, selectContactsOpened } from '../../redux/chatSlice';
import { StyledBox } from './Topics.styled';
import ChatsBlock from './ChatsBlock';
import TopicsHeader from './TopicsHeader';

const Topics = ({ handleBTNTopicFunc, handleBTNFunc }) => {
  const [filter, setFilter] = useState('all');

  const chatOpened = useSelector(selectChatOpened);
  const contactsOpened = useSelector(selectContactsOpened);

  return (
    <StyledBox chatOpened={chatOpened} contactsOpened={contactsOpened}>
      <TopicsHeader
        handleBTNFunc={handleBTNFunc}
        active={filter}
        setFilter={setFilter}
      />
      <ChatsBlock handleBTNTopicFunc={handleBTNTopicFunc} filter={filter} />
    </StyledBox>
  );
};

export default memo(Topics);
