/* eslint-disable no-unused-vars */
import { memo, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';

import { getUserInfo } from '../../redux/userSlice';
import {
  useGetAllPrivateTopicsQuery,
  useGetByIdQuery,
} from '../../redux/topics-operations';
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
  setChatOpened,
} from '../../redux/chatSlice';
import {
  subscribeToMessages,
  unsubscribeFromMessages,
  getTopicHistory,
  // connectWebSocket,
  sendMessageByWs,
  client,
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
  useGetMessagesByTopicQuery,
  useSendMessageToNewTopicMutation,
  useSendMessageToTopicMutation,
} from '../../redux/messagesAPI/messagesAPI';
import { selectAccessToken } from '../../redux/authOperatonsToolkit/authOperationsThunkSelectors';
import localLogOutUtil from '../../utils/localLogOutUtil';
import UsersAvatar from './UsersAvatar/';
import { useMediaQuery } from 'react-responsive';
import getPrivateTopicId from '../../utils/getPrivateTopicId';

const Chat = ({ children }) => {
  const { title: topicId, userId } = useParams();

  const [totalPagesPublicTopic, setTotalPagesPublicTopic] = useState(1);
  const [totalPagesPrivateTopic, setTotalPagesPrivateTopic] = useState(1);
  const [sizeOfMessages, setSizeOfMessages] = useState(10);

  const accessTokenInStore = useSelector(selectAccessToken);
  const {
    currentData: topicIdData,
    isLoading,
    error: topicIdDataError,
  } = useGetByIdQuery({ topicId, accessTokenInStore });

  const {
    data: messagesByTopic,
    currentData: currentMessagesByTopic,
    isFetching: isFetchingMessagesByTopic,
    error: messagesByTopicError,
    refetch: refetchMessagesByTopicId,
  } = useGetMessagesByTopicQuery(
    { topicId, accessTokenInStore },
    {
      refetchOnMountOrArgChange: 10,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );

  // const paginationFN = () => {
  //   const { totalElements, totalPages } = currentMessagesByTopic;

  //   if (totalPages - totalElements <= 0) {
  //     return console.log('End of pagination');
  //   }
  // };

  const { email } = useSelector(getUserInfo);
  const { isTopics } = useTopicsContext();
  const { contactsOpen, setContactsOpen } = useTopicsPageContext(); //?!
  const { privateTopics, setPrivateTopics } = useTopicsContext();
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const historyMessages = useSelector(selectHistoryMessages);
  const notifications = useSelector(selectNotifications);
  const newMessages = useSelector(selectNewMessages);
  const messages = useSelector(selectMessages);
  const connected = useSelector(selectConnected);
  const subscribed = useSelector(selectSubscribed);
  const isChatOpened = useSelector(selectChatOpened);

  const useMobileMediaQuery = () =>
    // useMediaQuery({ query: '(max-width: 769px)' });
    useMediaQuery({ query: '(max-width: 767px)' });
  const isMobile = useMobileMediaQuery();

  const [sendMessageToTopic, { error: sendMessageError }] =
    useSendMessageToTopicMutation();
  const [sendFirstMessageToUser, { error: sendFirstMessageError }] =
    useSendMessageToNewTopicMutation();

  const inputRef = useRef(null);

  useEffect(() => {
    if (!connected) {
      // console.log('Client in Chat useEffect, then !connected', client);
      // dispatch(connectWebSocket());
      client.activate();
    }

    // dispatch(toggleChatOpened());
    dispatch(setChatOpened(true));

    return () => {
      dispatch(unsubscribeFromMessages());
      // dispatch(disconnectWebSocket()); //!
      dispatch(clearMessages());
      dispatch(clearHistoryMessages());
      dispatch(clearNewMessages());
      dispatch(clearNotifications());

      // dispatch(toggleChatOpened());
      dispatch(setChatOpened(false));
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

    // Find user with privateTopicId, and throw this array of messages to component for render
    // if (privateTopics) {
    //   // console.log('privateTopics', privateTopics);
    //   const userWithPrivateTopicId = privateTopics?.find(el => el?.contact?.id === userId);
    //   // console.log('userWithPrivateTopicId', userWithPrivateTopicId);
    //   if (userWithPrivateTopicId) {
    //     refetchMessagesByTopicId({ topicId: userWithPrivateTopicId.id, accessTokenInStore });
    //   } else {
    //     dispatch(setMessages([]));
    //     return;
    //   }
    // }

    // if (topicId.includes('@')) {
    //   return dispatch(setMessages([]));
    // }

    const newMessagesData = processMessageData({
      currentMessagesByTopic,
      email,
      historyMessages,
      newMessages,
      notifications,
    });

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
  // Here we have a problem - every time in redux store writing subscriptions,
  //then open a new topic.And old subscriptions does not removes.

  // useEffect for scroll.
  useEffect(() => {
    if (!isLoading && currentMessagesByTopic && topicIdData) {
      const chatwrapId = document.getElementById('#chatwrap');
      // console.log('chatwrapId', chatwrapId);

      chatwrapId.addEventListener('scroll', (event) => {
        setInterval(scrollEventWithTO(event), 500);
      });
    }
  }, [messages, isLoading, currentMessagesByTopic, topicIdData]);

  const scrollEventWithTO = (event) => {
    const { scrollHeight, scrollTop } = event.target;
    // console.log(event);
    // console.log('event.target.scrollHeight', scrollHeight);
    // console.log('event.target.scrollTop', scrollTop);
    // console.log('window.innerHeight', window.innerHeight);

    // if (scrollHeight - (scrollTop + window.innerHeight)) {
    //   console.log(scrollHeight - (scrollTop + window.innerHeight));
    // }
  };

  // Function for searching name of user in private topics array
  const getUserName = () => {
    const existingUser = privateTopics?.find(
      (el) => el?.contact?.id === userId,
    );

    if (existingUser) {
      return existingUser.contact.nickname;
    } else {
      return false;
    }
  };

  const handleContacts = () => {
    setContactsOpen(!contactsOpen);
  }; //?!

  const handleMessageSend = () => {
    const inputMessage = inputRef.current.value.trim();

    if (!inputMessage || inputMessage.length === 0)
      return alert('This message is empty');

    if (pathname.includes('topics') && connected) {
      // dispatch(sendMessageByWs({ topicId, inputMessage }));
      sendMessageToTopic({ topicId, inputMessage, accessTokenInStore });
      inputRef.current.value = '';
    } else if (
      pathname.includes('notification') &&
      connected &&
      getUserName()
    ) {
      sendMessageToTopic({ topicId, inputMessage, accessTokenInStore });
      inputRef.current.value = '';
    } else if (!getUserName() && topicId.includes('@') && connected) {
      sendFirstMessageToUser({
        userEmail: topicId,
        inputMessage,
        accessTokenInStore,
      });
      inputRef.current.value = '';
    } else {
      alert('Not connected');
      localLogOutUtil(dispatch);
    }
    // if (connected) {
    //   // dispatch(sendMessageByWs({ topicId, inputMessage }));
    //   sendMessageToTopic({ topicId, inputMessage, accessTokenInStore });
    //   inputRef.current.value = '';
    // } else {
    //   alert('Зʼєднання не встановлено');
    // }
  };

  const subscribeStatus = () => {
    if (topicIdData) {
      const status = topicIdData.topicSubscribers.find(
        (el) => el.email === email,
      );

      return status ? true : false;
    }
  };

  const avatarsArray = Object.values(Avatars);

  if (topicIdDataError || sendMessageError || messagesByTopicError) {
    if (
      messagesByTopicError?.data?.detail?.includes(
        "Failed to convert 'id' with value",
      ) ||
      topicIdDataError?.data?.detail?.includes(
        "Failed to convert 'id' with value",
      ) ||
      messagesByTopicError?.data?.detail?.includes(
        "Failed to convert 'topicId' with value",
      ) ||
      topicIdDataError?.data?.detail?.includes(
        "Failed to convert 'topicId' with value",
      )
    ) {
      // dispatch(setMessages([]));

      return (
        <ChatWrap id="#chatwrap">
          <ChatHeader>
            <UserBox>
              <Avatar size={isMobile ? 'sm' : 'md'}>
                {topicIdData ? getAvatar(isTopics, topicIdData) : null}
              </Avatar>
              <InfoBox>
                <ChatUserName variant={isMobile ? 'h6' : 'h5'}>
                  {pathname.includes('notification')
                    ? `Приватний чат з ${getUserName()}`
                    : null}
                  {topicIdData ? topicIdData.name : getUserName()}
                </ChatUserName>
                <TypingIndicator variant={isMobile ? 'h6' : 'h5'}>
                  Ти/Пишеш...
                </TypingIndicator>
              </InfoBox>
            </UserBox>
            <UsersAvatar topicId={topicId} />
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
              We are ssory, but you can`t write messages to yourself!
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
                readOnly
              />
              <ChatInputIconBox>
                {/* <IconButton icon={<IconSmile />} /> //! CHAT-220--smile-disable */}
                <IconButton icon={<IconSend />} onClick={handleMessageSend} />
              </ChatInputIconBox>
            </InputBox>
          </ChatSectionWrap>
        </ChatWrap>
      );
    }

    if (sendMessageError?.data?.message?.includes('subscribed to the topic')) {
      return alert(
        'Потрібно підписатись на цю тему, щоб відправляти повідомлення',
      );
    }

    alert('Виникла помилка під час отримання теми (ChatComponent)');

    localLogOutUtil(dispatch);
    // dispatch(setIsLoggedIn(false));
    // dispatch(setAccessToken(null));
    // dispatch(setRefreshToken(null));
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
  }

  return isLoading ? (
    <Loader />
  ) : // isChatOpened && (
  //   // topicIdData && (
  //   <ChatWrap>
  //     <ChatHeader>
  //       <UserBox>
  //         <Avatar>{getAvatar(isTopics, topicIdData)}</Avatar>
  //         <InfoBox>
  //           <ChatUserName variant="h5">
  //             {topicIdData ? topicIdData.name : 'імя користувача'}
  //           </ChatUserName>
  //           <TypingIndicator variant="h5">Ти/Пишеш...</TypingIndicator>
  //         </InfoBox>
  //       </UserBox>
  //       <InfoMoreBox>
  //         {children}
  //         <TopicSettingsMenu topicId={topicId} subscribeStatus={subscribeStatus()} />
  //       </InfoMoreBox>
  //     </ChatHeader>
  //     <ChatSectionWrap>
  //       <ChatSection>
  //         {messages &&
  //           messages.map(item => (
  //             <ChatSection key={item.id} isMyMessage={item.isMyMessage}>
  //               <MessageContainer isMyMessage={item.isMyMessage}>
  //                 <UserMassageWrap>
  //                   <IndicatorBox isMyMessage={item.isMyMessage}>
  //                     <TimeIndicator isMyMessage={item.isMyMessage}>{item.time}</TimeIndicator>
  //                     <IconActivity isMyMessage={item.isMyMessage}>
  //                       {item.isOnline ? <ICONS.PROPERTY_ACTIVITY /> : <ICONS.NO_ACTIVITY />}
  //                     </IconActivity>
  //                     <UserName variant="h5">{item.name}</UserName>
  //                   </IndicatorBox>
  //                   <TextMessageBlock>
  //                     <TextMessage isMyMessage={item.isMyMessage}>{item.text}</TextMessage>
  //                     {!item.isMyMessage && <DropDownMenu />}
  //                   </TextMessageBlock>
  //                 </UserMassageWrap>
  //                 {avatarsArray.map(
  //                   (Logo, index) =>
  //                     item.avatarId - 1 === index && (
  //                       <Avatar key={index}>
  //                         <Logo />
  //                       </Avatar>
  //                     )
  //                 )}
  //               </MessageContainer>
  //             </ChatSection>
  //           ))}
  //       </ChatSection>
  //       <InputBox>
  //         <ChatInputStyled
  //           ref={inputRef} //!
  //           type="text" //!
  //           maxRows={3}
  //           placeholder="Введіть повідомлення..."
  //           onKeyDown={event => {
  //             if (event.key === 'Enter' && !event.shiftKey) {
  //               event.preventDefault();
  //               handleMessageSend();
  //             }
  //           }}
  //         />
  //         <ChatInputIconBox>
  //           {/* <IconButton icon={<IconSmile />} /> //! CHAT-220--smile-disable */}
  //           <IconButton icon={<IconSend />} onClick={handleMessageSend} />
  //         </ChatInputIconBox>
  //       </InputBox>
  //     </ChatSectionWrap>
  //   </ChatWrap>
  // )
  isChatOpened && topicIdData && messages ? (
    // topicIdData && (
    <ChatWrap id="#chatwrap">
      <ChatHeader>
        <UserBox>
          <Avatar size={isMobile ? 'sm' : 'md'}>
            {topicIdData ? getAvatar(isTopics, topicIdData) : null}
          </Avatar>
          <InfoBox>
            <ChatUserName variant={isMobile ? 'h6' : 'h5'}>
              {pathname.includes('notification')
                ? `Приватний чат з ${getUserName()} `
                : null}
              {topicIdData ? topicIdData.name : 'імя користувача'}
            </ChatUserName>
            <TypingIndicator variant={isMobile ? 'h6' : 'h5'}>
              Ти/Пишеш...
            </TypingIndicator>
          </InfoBox>
        </UserBox>
        <UsersAvatar topicId={topicId} />
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
                        <Link
                          key={item.id}
                          to={
                            privateTopics.some(
                              (el) => el?.contact?.id === item.senderId,
                            )
                              ? `/home/notification/chat/${getPrivateTopicId({
                                  userId: item.senderId,
                                  privateTopics,
                                })}/${item.senderId}`
                              : `/home/notification/chat/${item.senderEmail}/${item.senderId}`
                          }
                        >
                          <Avatar key={index}>
                            <Logo />
                          </Avatar>
                        </Link>
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
  ) : null;
};

export default memo(Chat);

// trohae7@gmail.com
// Password-123
