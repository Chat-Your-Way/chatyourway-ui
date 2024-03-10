/* eslint-disable no-unused-vars */
import { memo, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getUserInfo } from '../../redux/userSlice';
import { useGetByIdQuery } from '../../redux/topics-operations';
import {
  setMessages,
  setNewMessage,
  clearMessages,
  selectMessages,
  selectHistoryMessages,
  selectNewMessage,
  selectNotifications,
  selectConnected,
  selectSubscripted,
} from '../../redux/chatSlice';
import {
  connectWebSocket,
  disconnectWebSocket,
  getTopicHistory,
  sendMessage,
  subscribeToMessages,
  // unsubscribeFromMessages, //!TODO: unsubscribeFromMessages
} from '../../redux/chat-operations';

import { Avatars } from '../../ui-kit/images/avatars';
import Avatar from '../../ui-kit/components/Avatar';
import IconButton from '../../ui-kit/components/IconButton/IconButton';
import { ICONS } from '../../ui-kit/icons';
import {
  ChatHeader,
  ChatInputIconBox,
  ChatInputStyled,
  ChatSection,
  ChatSectionWrap,
  ChatUserName,
  ChatWrap,
  IconActivity,
  IconSend,
  // IconSmile, //! CHAT-220--smile-disable
  IndicatorBox,
  InfoBox,
  InfoMoreBox,
  InputBox,
  MessageContainer,
  TextMessage,
  TextMessageBlock,
  TimeIndicator,
  TypingIndicator,
  UserBox,
  UserMassageWrap,
  UserName,
} from './Chat.styled';
import { useTopicsPageContext } from '../../pages/TopicsPage/TopicsPageContext';
import DropDownMenu from './DropDownMenu/DropDownMenu';
import TopicSettingsMenu from './TopicSettingsMenu/TopicSettingsMenu';
import { useTopicsContext } from '../../common/Topics/TopicsContext';
import { getAvatar } from '../../common/Topics/ChatsBlock/ChatItem/getAvatar';

import processMessageData from './processMessageData';

const Chat = ({ children }) => {
  const { title: topicId } = useParams();
  const { data, isLoading, isError } = useGetByIdQuery(topicId);
  const { email } = useSelector(getUserInfo);
  const { isTopics } = useTopicsContext();
  const { contactsOpen, setContactsOpen } = useTopicsPageContext();

  console.log('topicId', topicId); //!

  const historyMessages = useSelector(selectHistoryMessages);
  const notifications = useSelector(selectNotifications);
  const newMessage = useSelector(selectNewMessage);
  const messages = useSelector(selectMessages);
  const connected = useSelector(selectConnected);
  const subscripted = useSelector(selectSubscripted);

  const inputRef = useRef(null);

  const dispatch = useDispatch();

  //! Websockets START================================================
  useEffect(() => {
    if (!connected) {
      dispatch(connectWebSocket());
    }

    return () => {
      // dispatch(unsubscribeFromMessages()); //!
      dispatch(disconnectWebSocket());
    };
  }, []);

  useEffect(() => {
    if (!connected) return;
    dispatch(clearMessages());

    dispatch(subscribeToMessages(topicId));

    dispatch(getTopicHistory(topicId));
  }, [dispatch, connected, topicId]);

  useEffect(() => {
    if (
      !historyMessages ||
      historyMessages.length === 0 ||
      !subscripted
      // ||
      // !data ||
      // !email
    )
      return;

    const historyMessagesData = processMessageData(
      data,
      email,
      historyMessages,
      notifications,
    );

    dispatch(setMessages(historyMessagesData));

    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch, historyMessages, notifications]);

  useEffect(() => {
    if (!newMessage || newMessage.length === 0) return;

    const newMessageData = processMessageData(
      data,
      email,
      newMessage,
      notifications,
    );

    dispatch(setMessages(newMessageData));

    return () => {
      dispatch(setNewMessage([]));
    };
  }, [dispatch, newMessage, notifications]);
  //! Websockets END ================================================

  if (isLoading) {
    return <div>Loading...</div>;
  } //!

  if (isError) {
    alert('Виникла помилка під час отримання теми');
  }

  const handleContacts = () => {
    setContactsOpen(!contactsOpen);
  }; //?!

  const handleMessageSend = () => {
    const inputMessage = inputRef.current.value.trim();

    if (!inputMessage || inputMessage.length === 0) return;

    dispatch(sendMessage(topicId, inputMessage));

    inputRef.current.value = '';
  };

  const subscribeStatus = () => {
    if (data) {
      const status = data.topicSubscribers.find(
        (el) => el.contact.email === email && el.unsubscribeAt === null,
      );

      return status ? true : false;
    }
  };

  const avatarsArray = Object.values(Avatars);

  const avatarContent = getAvatar(isTopics, data);

  return (
    data && ( //!
      <ChatWrap>
        <ChatHeader>
          <UserBox>
            <Avatar>{avatarContent}</Avatar>
            <InfoBox>
              <ChatUserName variant="h5">
                {data ? data.topicName : 'імя користувача'}
              </ChatUserName>
              <TypingIndicator variant="h5">Ти/Пишеш...</TypingIndicator>
            </InfoBox>
          </UserBox>
          <InfoMoreBox>
            {children}
            <TopicSettingsMenu
              topicId={topicId}
              subscribeStatus={subscribeStatus()}
            />
          </InfoMoreBox>
        </ChatHeader>
        <ChatSectionWrap>
          <ChatSection>
            {messages &&
              messages.map((item) => (
                <ChatSection key={item.id} isMyMessage={item.isMyMessage}>
                  <MessageContainer isMyMessage={item.isMyMessage}>
                    <UserMassageWrap>
                      <IndicatorBox isMyMessage={item.isMyMessage}>
                        <TimeIndicator isMyMessage={item.isMyMessage}>
                          {item.time}
                        </TimeIndicator>
                        <IconActivity isMyMessage={item.isMyMessage}>
                          {item.isOnline ? (
                            <ICONS.PROPERTY_ACTIVITY />
                          ) : (
                            <ICONS.NO_ACTIVITY />
                          )}
                        </IconActivity>
                        <UserName variant="h5">{item.name}</UserName>
                      </IndicatorBox>
                      <TextMessageBlock>
                        <TextMessage isMyMessage={item.isMyMessage}>
                          {item.text}
                        </TextMessage>
                        {!item.isMyMessage && <DropDownMenu />}
                      </TextMessageBlock>
                    </UserMassageWrap>
                    {avatarsArray.map(
                      (Logo, index) =>
                        item.avatarId - 1 === index && (
                          <Avatar
                            // size={isTablet ? 'lg' : 'md' //!}
                            key={index}
                            // isCurrent={'true' //!}
                          >
                            <Logo />
                          </Avatar>
                        ),
                    )}
                  </MessageContainer>
                </ChatSection>
              ))}
          </ChatSection>
          <InputBox>
            <ChatInputStyled
              ref={inputRef} //!
              type="text" //!
              maxRows={3}
              placeholder="Введіть повідомлення..."
            />
            <ChatInputIconBox>
              {/* <IconButton icon={<IconSmile />} /> //! CHAT-220--smile-disable */}
              <IconButton icon={<IconSend />} onClick={handleMessageSend} />
            </ChatInputIconBox>
          </InputBox>
        </ChatSectionWrap>
      </ChatWrap>
    )
  );
};

export default memo(Chat);
