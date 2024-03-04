/* eslint-disable no-unused-vars */
import { memo, useEffect, useRef, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../../redux/userSlice';
import { useGetByIdQuery } from '../../redux/topics-operations';

import { ajwt } from '../../redux/apiParams'; //!
import { nanoid } from 'nanoid'; //!
import { useTopicsContext } from '../../common/Topics/TopicsContext';
import { getAvatar } from '../../common/Topics/ChatsBlock/ChatItem/getAvatar';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { Avatars } from '../../ui-kit/images/avatars';

const Chat = ({ children }) => {
  const { contactsOpen, setContactsOpen } = useTopicsPageContext();
  const { email } = useSelector(getUserInfo);
  const { title: topicId } = useParams();
  const { data, isLoading, isError } = useGetByIdQuery(topicId);
  const { isTopics } = useTopicsContext();

  //! Websockets START================================================

  const [messages, setMessages] = useState([]);
  const [historyMessages, setHistoryMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const inputRef = useRef(null);

  const getTopicHistoryDest = '/app/history/topic/';
  const subToTopicDest = '/topic/';
  const subToNotificationDest = '/user/specific/notify/';
  const subToErrorDest = '/user/specific/error';
  const sendToPublicTopicDest = '/app/topic/public/';
  // const sendToPrivateTopicDest = '/app/topic/private/'; //?!

  useEffect(() => {
    const connect = () => {
      const socket = new SockJS(
        `http://chat.eu-central-1.elasticbeanstalk.com/chat?Authorization=Bearer ${ajwt}`,
      );

      const client = Stomp.over(() => socket);

      client.connect(
        {},
        () => {
          setStompClient(client);
          setConnected(true);

          console.log('Connected to WebSocket'); //!
        },
        (error) => {
          console.error('Error connecting to WebSocket:', error);
        },
      );
    };

    connect();

    return () => {
      if (stompClient) {
        stompClient.disconnect((error) => {
          if (error) {
            console.error('Error disconnecting from WebSocket:', error);
          } else {
            setConnected(false);
          }
        });
      }
      console.log('Disconnected from WebSocket'); //!
    };
  }, []);

  useEffect(() => {
    if (!stompClient) return;

    let subscriptionToHistory;
    let subscriptionToTopic;
    let subscriptionToError;
    let subscriptionToNotify;

    const getTopicHistory = () => {
      stompClient.send(
        `${getTopicHistoryDest}${topicId}`,
        {},
        JSON.stringify({ page: 0, pageSize: 100 }),
      );
    };

    getTopicHistory();

    const subscribeToHistoryMessages = () => {
      subscriptionToHistory = stompClient.subscribe(
        `/user${subToTopicDest}${topicId}`,
        (message) => {
          let parsedhistoryMessages = JSON.parse(message.body);

          console.log(
            'Received message from subscribeToHistoryMessages:',
            parsedhistoryMessages,
          ); //!

          setHistoryMessages(parsedhistoryMessages);
        },
      );
    };

    subscribeToHistoryMessages();

    const subscribeToTopic = () => {
      subscriptionToTopic = stompClient.subscribe(
        `${subToTopicDest}${topicId}`,
        (message) => {
          let parsedNewMessage = JSON.parse(message.body);

          console.log(
            'Received NewMessage from subscribeToTopic:',
            parsedNewMessage,
          ); //!

          setNewMessage([parsedNewMessage]);
        },
      );
    };

    subscribeToTopic();

    const subscribeToNotify = () => {
      subscriptionToNotify = stompClient.subscribe(
        `${subToNotificationDest}${topicId}`,
        (message) => {
          let parsedNotifications = JSON.parse(message.body);

          setNotifications(parsedNotifications);

          console.log(
            'Received notifications from subscribeToNotify:',
            parsedNotifications,
          ); //!
        },
      );
    };

    subscribeToNotify();

    const subscribeToError = () => {
      subscriptionToError = stompClient.subscribe(
        `${subToErrorDest}`,
        (message) => {
          let parsedErrorMessage = JSON.parse(message.body);
          console.log(
            'Received ErrorMessage from subscribeToError:',
            parsedErrorMessage,
          ); //!
        },
      );
    };

    subscribeToError();

    return () => {
      subscriptionToHistory.unsubscribe();
      subscriptionToTopic.unsubscribe(); //?! чи треба якщо продовжуєш отримувати повідомлення
      subscriptionToNotify.unsubscribe();
      subscriptionToError.unsubscribe();
    };
  }, [stompClient, topicId]);

  useEffect(() => {
    if (!historyMessages || historyMessages.length === 0) return;

    const historyMessagesData = processMessageData(
      historyMessages,
      notifications,
    );

    setMessages((prevMessages) => [...prevMessages, ...historyMessagesData]);

    return () => {
      setMessages([]);
    };
  }, [historyMessages, notifications]);

  useEffect(() => {
    if (!newMessage || newMessage.length === 0) return;

    const newMessageData = processMessageData(newMessage, notifications);

    setMessages((prevMessages) => [...prevMessages, ...newMessageData]);

    return () => {
      setNewMessage([]);
    };
  }, [newMessage, notifications]);

  const getTime = (timestamp) => {
    const dateObject = new Date(timestamp);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    const time = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;

    return time;
  };

  const processMessageData = (messagesData, notifications) => {
    const messages = messagesData.map((messageData) => {
      const { content, timestamp, sentFrom } = messageData;

      const subscriber = data.topicSubscribers.find(
        ({ contact }) => contact.email === sentFrom,
      );
      const notification = notifications.find(
        (notification) => notification.email === sentFrom,
      );

      const message = {
        id: nanoid(),
        topicId: notification?.topicId, //?!
        avatarId: subscriber?.contact.avatarId,
        name: subscriber?.contact.nickname,
        time: getTime(timestamp),
        text: content,
        isMyMessage: sentFrom === email,
        isOnline: notification?.status !== 'OFFLINE',
      };

      return message;
    });

    return messages;
  };

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

    if (!stompClient || !connected || !inputMessage.trim()) return; //!

    stompClient.send(
      `${sendToPublicTopicDest}${topicId}`,
      {},
      JSON.stringify({ content: inputMessage }),
    );

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
            {messages.map((item) => (
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
