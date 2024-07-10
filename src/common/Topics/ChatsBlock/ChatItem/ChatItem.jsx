import { memo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectChatOpened,
  selectContactsOpened,
} from '../../../../redux/chatSlice';
import Avatar from '../../../../ui-kit/components/Avatar';
import TopicDesc from './TopicDesc';
import LastMessages from './LastMessages';
import { getAvatar } from './getAvatar';
import { StyledBox, StyledChildrenBox } from './ChatItem.styled';
import { useTopicsContext } from '../../TopicsContext';
import { getTime } from '../../../../components/Chat/processMessageData';
import { useMediaQuery } from 'react-responsive';

// const ChatItem = ({ isActive, data, notification }) => {
const ChatItem = ({ isActive, data }) => {
  const { isTopics } = useTopicsContext();
  const avatarContent = getAvatar(isTopics, data);

  const chatOpened = useSelector(selectChatOpened);
  const contactsOpened = useSelector(selectContactsOpened);

  const unreadedMessages = data?.unreadMessageCount ?? null;
  const lastMessageContent = data?.lastMessage ?? null;

  const isTablet = useMediaQuery({ query: '(min-width: 768px' });

  return (
    <StyledBox
      chatOpened={chatOpened}
      contactsOpened={contactsOpened}
      isActive={isActive}
    >
      <Avatar size={isTablet ? 'lg' : 'md'}>{avatarContent}</Avatar>
      {data && (
        <StyledChildrenBox
          chatOpened={chatOpened}
          contactsOpened={contactsOpened}
        >
          {isTopics ? (
            <TopicDesc title={data.name} />
          ) : (
            <TopicDesc title={data.createdBy.nickname} />
          )}

          {lastMessageContent && (
            <LastMessages
              userName={lastMessageContent.sentFrom}
              message={lastMessageContent.lastMessage}
              unreadedMessage={unreadedMessages}
              // isTyping={data.isTyping}
              lastMessageTime={getTime(lastMessageContent.timestamp)}
            />
          )}
        </StyledChildrenBox>
      )}
    </StyledBox>
  );
};

export default memo(ChatItem);
