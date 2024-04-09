import { memo, useState } from 'react';
import { StyledBox } from './Topics.styled';
import ChatsBlock from './ChatsBlock/ChatsBlock'; //!!
import TopicsHeader from './TopicsHeader';

const Topics = ({
  isOpenChat = false,
  isOpenContacts = false,
  handleBTNTopicFunc,
  handleBTNFunc,
}) => {
  const [filter, setFilter] = useState('all');

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
