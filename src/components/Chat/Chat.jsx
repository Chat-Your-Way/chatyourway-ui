/* eslint-disable no-unused-vars */
import { memo, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getUserInfo } from '../../redux/userSlice';
import { useGetByIdQuery } from '../../redux/topics-operations';
import {
  setMessages,
  clearMessages,
  clearHistoryMessages,
  clearNewMessages,
  clearNotifications,
  selectMessages,
  selectHistoryMessages,
  selectNewMessages,
  selectNotifications,
  selectConnected,
  selectSubscribed,
  toggleChatOpened,
  selectChatOpened,
} from '../../redux/chatSlice';
import {
  subscribeToMessages,
  unsubscribeFromMessages,
  getTopicHistory,
  sendMessage,
  connectWebSocket,
} from '../../redux/chat-operations';

import { Avatars } from '../../ui-kit/images/avatars';
import Avatar from '../../ui-kit/components/Avatar';
import IconButton from '../../ui-kit/components/IconButton/IconButton';
import { ICONS } from '../../ui-kit/icons';
import { useTopicsPageContext } from '../../pages/TopicsPage/TopicsPageContext';
import DropDownMenu from './DropDownMenu/DropDownMenu';
import TopicSettingsMenu from './TopicSettingsMenu/TopicSettingsMenu';
import { useTopicsContext } from '../../common/Topics/TopicsContext';
import { getAvatar } from '../../common/Topics/ChatsBlock/ChatItem/getAvatar';
import Loader from '../Loader';
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

import { processMessageData } from './processMessageData';
import {
  setAccessToken,
  setIsLoggedIn,
  setRefreshToken,
} from '../../redux/authOperatonsToolkit/authOperationsThunkSlice';
import { useGetMessagesByTopicQuery } from '../../redux/messagesAPI/messagesAPI';
import { selectAccessToken } from '../../redux/authOperatonsToolkit/authOperationsThunkSelectors';

const Chat = ({ children }) => {
  const { title: topicId } = useParams();
  const accessTokenInStore = useSelector(selectAccessToken);
  const {
    data: topicIdData,
    isLoading,
    isError,
  } = useGetByIdQuery({ topicId, accessTokenInStore });

  const {
    data: messagesByTopic,
    currentData: currentMessagesByTopic,
    isFetching,
  } = useGetMessagesByTopicQuery(topicId, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const { email } = useSelector(getUserInfo);
  const { isTopics } = useTopicsContext();
  const { contactsOpen, setContactsOpen } = useTopicsPageContext(); //?!

  const dispatch = useDispatch();
  const historyMessages = useSelector(selectHistoryMessages);
  const notifications = useSelector(selectNotifications);
  const newMessages = useSelector(selectNewMessages);
  const messages = useSelector(selectMessages);
  const connected = useSelector(selectConnected);
  const subscribed = useSelector(selectSubscribed);
  const isChatOpened = useSelector(selectChatOpened);

  const inputRef = useRef(null);

  useEffect(() => {
    if (!connected) {
      dispatch(connectWebSocket());
    }

    dispatch(toggleChatOpened());

    return () => {
      dispatch(unsubscribeFromMessages());
      // dispatch(disconnectWebSocket()); //!
      dispatch(clearMessages());
      dispatch(clearHistoryMessages());
      dispatch(clearNewMessages());
      dispatch(clearNotifications());

      dispatch(toggleChatOpened());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (!connected) return;

  //   if (subscribed) {
  //     dispatch(unsubscribeFromMessages());
  //   }

  //   dispatch(clearMessages());
  //   dispatch(clearHistoryMessages());
  //   dispatch(clearNewMessages());
  //   dispatch(clearNotifications());

  //   dispatch(subscribeToMessages(topicId));
  //   dispatch(getTopicHistory(topicId));

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch, connected, topicId]);

  useEffect(() => {
    // if (historyMessages.length === 0 || notifications.length === 0) return;
    if (!currentMessagesByTopic) return;

    const newMessagesData = processMessageData(
      currentMessagesByTopic,
      email,
      historyMessages,
      newMessages,
      notifications,
    );

    dispatch(subscribeToMessages(topicId));

    dispatch(setMessages(newMessagesData));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    historyMessages,
    newMessages,
    notifications,
    email,
    currentMessagesByTopic,
  ]);

  if (isError) {
    alert('Виникла помилка під час отримання теми (ChatComponent)');
    dispatch(setIsLoggedIn(false));
    dispatch(setAccessToken(null));
    dispatch(setRefreshToken(null));
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  const handleContacts = () => {
    setContactsOpen(!contactsOpen);
  }; //?!

  const handleMessageSend = () => {
    const inputMessage = inputRef.current.value.trim();

    if (!inputMessage || inputMessage.length === 0)
      return alert('This message is empty');

    if (connected) {
      dispatch(sendMessage(topicId, inputMessage));

      inputRef.current.value = '';
    } else {
      alert('Зʼєднання не встановлено');
    }
  };

  const subscribeStatus = () => {
    if (topicIdData) {
      const status = topicIdData.topicSubscribers.find(
        (el) => el.contact.email === email && el.unsubscribeAt === null,
      );

      return status ? true : false;
    }
  };

  const avatarsArray = Object.values(Avatars);

  return isLoading ? (
    <Loader />
  ) : (
    isChatOpened && (
      <ChatWrap>
        <ChatHeader>
          <UserBox>
            <Avatar>{getAvatar(isTopics, topicIdData)}</Avatar>
            <InfoBox>
              <ChatUserName variant="h5">
                {topicIdData ? topicIdData.name : 'імя користувача'}
              </ChatUserName>
              <TypingIndicator variant="h5">Ти/Пишеш...</TypingIndicator>
            </InfoBox>
          </UserBox>
          <InfoMoreBox>
            {children}
            <TopicSettingsMenu topicId={topicId} subscribeStatus />
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
                          <Avatar key={index}>
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
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  handleMessageSend();
                }
              }}
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

// trohae7@gmail.com
// Password-123
