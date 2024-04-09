import { memo } from 'react';
import Avatar from '../../../../ui-kit/components/Avatar';
import TopicDesc from './TopicDesc';
import LastMessages from './LastMessages';
import { getAvatar } from './getAvatar';
import { StyledBox, StyledChildrenBox } from './ChatItem.styled';
import { useTopicsContext } from '../../TopicsContext';
import { getTime } from '../../../../components/Chat/processMessageData';

const ChatItem = ({
  isOpenChat = false,
  isOpenContacts = false,
  isActive,
  data,
  notification,
}) => {
  const { isTopics } = useTopicsContext();
  const avatarContent = getAvatar(isTopics, data);

  const unreadMessages = notification?.unreadMessages ?? null;
  const lastMessageContent = notification?.lastMessage ?? null;

  console.log('unreadMessages', unreadMessages); //!
  console.log('lastMessageContent', lastMessageContent); //!

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
            />
          ) : (
            <TopicDesc
              isOpenChat={isOpenChat}
              isOpenContacts={isOpenContacts}
              title={data.userName}
            />
          )}

          {lastMessageContent && (
            <LastMessages
              isOpenChat={isOpenChat}
              isOpenContacts={isOpenContacts}
              userName={lastMessageContent.sentFrom}
              message={lastMessageContent.lastMessage}
              unreadedMessage={notification.unreadMessages}
              isTyping={data.isTyping}
              lastMessageTime={getTime(lastMessageContent.timestamp)}
            />
          )}
        </StyledChildrenBox>
      )}
    </StyledBox>
  );
};

export default memo(ChatItem);
