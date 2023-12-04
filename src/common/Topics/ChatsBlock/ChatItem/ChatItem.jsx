import { memo } from 'react';
import Avatar from '../../../../ui-kit/components/Avatar';
import TopicDesc from './TopicDesc';
import LastMessages from './LastMessages';
import { getAvatar } from './getAvatar';
import { StyledBox, StyledChildrenBox } from './ChatItem.styled';
import { useTopicsContext } from '../../TopicsContext';

const ChatItem = ({
  isOpenChat = false,
  isOpenContacts = false,
  isActive,
  data,
}) => {
  const { isTopics } = useTopicsContext();
  const avatarContent = getAvatar(isTopics, data);

  return (
    <StyledBox
      isOpenChat={isOpenChat}
      isOpenContacts={isOpenContacts}
      isActive={isActive}
    >
      <Avatar>{avatarContent}</Avatar>
      {data && (
        <StyledChildrenBox
          isOpenChat={isOpenChat}
          isOpenContacts={isOpenContacts}
        >
          {isTopics ? (
            <TopicDesc
              isOpenChat={isOpenChat}
              isOpenContacts={isOpenContacts}
              title={data.topicName}
              // lastMessageTime={data.lastMessageTime}
            />
          ) : (
            <TopicDesc
              isOpenChat={isOpenChat}
              isOpenContacts={isOpenContacts}
              title={data.userName}
              // lastMessageTime={data.lastMessageTime}
            />
          )}
          <LastMessages
            isOpenChat={isOpenChat}
            isOpenContacts={isOpenContacts}
            // userName={data.userName}
            // message={data.message}
            // unreadedMessage={data.unreadedMessage}
            // isTyping={data.isTyping}
          />
        </StyledChildrenBox>
      )}
    </StyledBox>
  );
};

export default memo(ChatItem);
