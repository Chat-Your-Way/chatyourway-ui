/* eslint-disable no-unused-vars */
import { memo, useEffect, useRef } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { useGetByIdQuery } from '../../redux/topics-operations';
import { getUserInfo } from '../../redux/userSlice';
import { useParams } from 'react-router-dom';
import {
  setMessages,
  setNewMessage,
  clearMessages,
  // selectMessages,
  // selectHistoryMessages,
  // selectNewMessage,
  // selectNotifications,
  // selectConnected,
  // selectSubscripted,
  // selectSubscriptions,
  getHistoryMessages,
  getNotifications,
  getNewMessage,
  getMessages,
  getConnected,
  getSubscripted,
  getSubscriptions,
} from '../../redux/chatSlice';

import { useTopicsContext } from '../../common/Topics/TopicsContext';
import { getAvatar } from '../../common/Topics/ChatsBlock/ChatItem/getAvatar';

import { Avatars } from '../../ui-kit/images/avatars';
import {
  connectWebSocket,
  disconnectWebSocket,
  getTopicHistory,
  sendMessage,
  subscribeToMessages,
  // unsubscribeFromMessages,
} from '../../redux/chat-operations';

import processMessageData from './processMessageData';

const Chat = ({ children }) => {
  const { contactsOpen, setContactsOpen } = useTopicsPageContext();
  const { email } = useSelector(getUserInfo);
  const { title: topicId } = useParams();
  const { data, isLoading, isError } = useGetByIdQuery(topicId);
  const { isTopics } = useTopicsContext();

  console.log('isTopics', isTopics); //!
  console.log('topicId', topicId); //!

  const dispatch = useDispatch();
  const historyMessages = useSelector(getHistoryMessages);
  const notifications = useSelector(getNotifications);
  const newMessage = useSelector(getNewMessage);
  const messages = useSelector(getMessages);
  const connected = useSelector(getConnected);
  const subscripted = useSelector(getSubscripted);
  const subscriptions = useSelector(getSubscriptions);

  // const {
  //   historyMessages,
  //   notifications,
  //   newMessage,
  //   messages,
  //   connected,
  //   subscripted,
  //   subscriptions,
  // } = useSelector((state) => ({
  //   historyMessages: getHistoryMessages(state),
  //   notifications: getNotifications(state),
  //   newMessage: getNewMessage(state),
  //   messages: getMessages(state),
  //   connected: getConnected(state),
  //   subscripted: getSubscripted(state),
  //   subscriptions: getSubscriptions(state),
  // }));

  // const {
  //   historyMessages,
  //   notifications,
  //   newMessage,
  //   messages,
  //   connected,
  //   subscripted,
  //   subscriptions,
  // } = useSelector((state) => ({
  //   historyMessages: selectHistoryMessages(state),
  //   notifications: selectNotifications(state),
  //   newMessage: selectNewMessage(state),
  //   messages: selectMessages(state),
  //   connected: selectConnected(state),
  //   subscripted: selectSubscripted(state),
  //   subscriptions: selectSubscriptions(state),
  // }));

  const inputRef = useRef(null);

  //! Websockets START================================================

  useEffect(() => {
    if (!connected) {
      dispatch(connectWebSocket());
      console.log('connected connectWebSocket useEffect 1', connected); //!
    }

    return () => {
      // dispatch(unsubscribeFromMessages()); //!
      dispatch(disconnectWebSocket());
    };
  }, []);

  useEffect(() => {
    console.log('connected useEffect 2/1', connected); //!
    console.log('subscripted useEffect 2/1', subscripted); //!

    if (!connected) return;
    dispatch(clearMessages());

    dispatch(subscribeToMessages(topicId));

    console.log('subscribeToMessages useEffect 2/2'); //!
    console.log('historyMessages useEffect 2/2', historyMessages); //!

    dispatch(getTopicHistory(topicId));

    console.log('getTopicHistory useEffect 2/2'); //!
  }, [dispatch, connected, topicId]);

  useEffect(() => {
    console.log('historyMessages useEffect 3/1', historyMessages); //!
    console.log('subscripted useEffect 3/1', subscripted); //!
    console.log('subscriptions useEffect 3/1', subscriptions); //!

    if (
      !historyMessages ||
      historyMessages.length === 0
      // ||
      // !subscripted ||
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

    console.log('historyMessages useEffect 3/2', historyMessages); //!

    dispatch(setMessages(historyMessagesData));
    // setMessages((prevMessages) => [...prevMessages, ...historyMessagesData]);

    return () => {
      dispatch(clearMessages());

      console.log('dispatch(clearMessages()); useEffect 3', messages); //!

      // setMessages([]);
    };
  }, [dispatch, historyMessages, notifications]);

  useEffect(() => {
    console.log('newMessage useEffect 4/1', newMessage); //!

    if (!newMessage || newMessage.length === 0) return;

    console.log('newMessage useEffect 4/2', newMessage); //!

    const newMessageData = processMessageData(
      data,
      email,
      newMessage,
      notifications,
    );

    dispatch(setMessages(newMessageData));
    // setMessages((prevMessages) => [...prevMessages, ...newMessageData]);

    return () => {
      dispatch(setNewMessage([]));
      // setNewMessage([]);
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

    if (!inputMessage || inputMessage.length === 0) return; //!

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
