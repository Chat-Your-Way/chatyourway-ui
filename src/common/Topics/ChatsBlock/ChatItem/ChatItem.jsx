/* eslint-disable no-unused-vars */
import { memo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectChatOpened,
  selectContactsOpened,
  selectOnlineContacts,
} from '../../../../redux/chatSlice';
import Avatar from '../../../../ui-kit/components/Avatar';
import TopicDesc from './TopicDesc';
import LastMessages from './LastMessages';
import { getAvatar } from './getAvatar';
import { StyledBox, StyledChildrenBox } from './ChatItem.styled';
import { useTopicsContext } from '../../TopicsContext';
import { getTime } from '../../../../components/Chat/processMessageData';
import { useMediaQuery } from 'react-responsive';
import { useSidebarContext } from '../../../Sidebar/SidebarContext';

// const ChatItem = ({ isActive, data, notification }) => {
const ChatItem = ({ isActive, data }) => {
  const { isTopics } = useTopicsContext();
  const { isTabletAndHigher } = useSidebarContext();
  const avatarContent = getAvatar(isTopics, data);

  const chatOpened = useSelector(selectChatOpened);
  const contactsOpened = useSelector(selectContactsOpened);

  // const unreadedMessages = data?.unreadMessageCount ?? null; // deprecated 27.03.25
  const unreadedMessages = data?.unreadMessages.length ?? null;
  const lastMessageContent = data?.lastMessage ?? null;
  const onlineContacts = useSelector(selectOnlineContacts);

  return (
    <StyledBox
      chatOpened={chatOpened}
      contactsOpened={contactsOpened}
      isActive={isActive}
    >
      <Avatar size={isTabletAndHigher ? 'lg' : 'md'}>{avatarContent}</Avatar>
      {data && (
        <StyledChildrenBox
          chatOpened={chatOpened}
          contactsOpened={contactsOpened}
        >
          {isTopics ? (
            <TopicDesc title={data.name} />
          ) : (
            <TopicDesc
              title={
                data.createdBy?.nickname ? data.createdBy.nickname : data.name
              }
            />
          )}

          {/* {lastMessageContent && (
            <LastMessages
              userName={
                onlineContacts.find(el => el.typingStatus === true)
                  ? onlineContacts.find(el => el.typingStatus === true).nickname
                  : lastMessageContent.sentFrom
              }
              message={
                lastMessageContent.lastMessage.length > 20
                  ? `${lastMessageContent.lastMessage.slice(0, 20)}...`
                  : lastMessageContent.lastMessage
              }
              unreadedMessage={unreadedMessages}
              isTyping={onlineContacts.find(el => el.typingStatus === true)}
              lastMessageTime={getTime(lastMessageContent.timestamp)}
            />
          )} */}

          <LastMessages
            userName={
              onlineContacts.find(
                (el) =>
                  el.typingStatus === true && el.currentTopicId === data.id,
              )
                ? onlineContacts.find((el) => el.typingStatus === true).nickname
                : lastMessageContent?.sentFrom
            }
            message={
              lastMessageContent?.lastMessage.length > 20
                ? `${lastMessageContent.lastMessage.slice(0, 20)}...`
                : lastMessageContent?.lastMessage
            }
            unreadedMessage={unreadedMessages}
            isTyping={onlineContacts.find(
              (el) => el.typingStatus === true && el.currentTopicId === data.id,
            )}
            lastMessageTime={
              lastMessageContent ? getTime(lastMessageContent.timestamp) : null
            }
          />
        </StyledChildrenBox>
      )}
    </StyledBox>
  );
};

export default memo(ChatItem);
