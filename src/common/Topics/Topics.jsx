import { memo } from 'react';
import { StyledBox } from './Topics.styled';
import ChatsBlock from './ChatsBlock';
import TopicsHeader from './TopicsHeader';

const Topics = ({
  isOpenChat = false,
  isOpenContacts = false,
  isTopics = true,
}) => {
  return (
    <StyledBox isOpenChat={isOpenChat} isOpenContacts={isOpenContacts}>
      <TopicsHeader
        isOpenChat={isOpenChat}
        isOpenContacts={isOpenContacts}
        isTopics={isTopics}
      />
      <ChatsBlock
        isOpenChat={isOpenChat}
        isOpenContacts={isOpenContacts}
        isTopics={isTopics}
      />
    </StyledBox>
  );
};

export default memo(Topics);
