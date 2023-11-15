import { memo } from 'react';
import { StyledBox } from './Topics.styled';
import ChatsBlock from './ChatsBlock';
import TopicsHeader from './TopicsHeader';

const Topics = ({
  isOpenChat = false,
  isOpenContacts = false,
  handleBTNTopicFunc,
  handleBTNFunc,
}) => {
  return (
    <StyledBox isOpenChat={isOpenChat} isOpenContacts={isOpenContacts}>
      <TopicsHeader
        isOpenChat={isOpenChat}
        isOpenContacts={isOpenContacts}
        handleBTNFunc={handleBTNFunc}
      />
      <ChatsBlock
        isOpenChat={isOpenChat}
        isOpenContacts={isOpenContacts}
        handleBTNTopicFunc={handleBTNTopicFunc}
      />
    </StyledBox>
  );
};

export default memo(Topics);
