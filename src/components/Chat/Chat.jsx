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
  setNewMessages,
  setHistoryMessages,
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
import { current } from '@reduxjs/toolkit';
import debounce from 'lodash.debounce';

const Chat = ({ children }) => {
  const { topicId, userId } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sizeOfMessages, setSizeOfMessages] = useState(30);

  const currentPageRef = useRef(1);
  const totalPagesRef = useRef(0);

  const accessTokenInStore = useSelector(selectAccessToken);
  const {
    currentData: topicIdData,
    isLoading,
    error: topicIdDataError,
    isFetching: isFetchingTopicIdData,
  } = useGetByIdQuery({ topicId, accessTokenInStore });

  const {
    isLoading: isLoadingCurrentMessagesByTopicId,
    data: messagesByTopic,
    currentData: currentMessagesByTopic,
    isFetching: isFetchingMessagesByTopic,
    error: messagesByTopicError,
    refetch: refetchMessagesByTopicId,
  } = useGetMessagesByTopicQuery(
    { topicId, accessTokenInStore, currentPage, sizeOfMessages },
    {
      refetchOnMountOrArgChange: 10, // Not really sure that i understand how this is work!
      refetchOnFocus: true,
      refetchOnReconnect: true,
      // pollingInterval: 10000, // This works perfect!
    },
  );

  const { email } = useSelector(getUserInfo);
  const { isTopics, privateTopics, setPrivateTopics } = useTopicsContext();
  const { contactsOpen, setContactsOpen } = useTopicsPageContext(); //?!
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
      setTotalPages(0);
      // dispatch(toggleChatOpened());
      dispatch(setChatOpened(false));
      currentPageRef.current = 1;
      setCurrentPage(1);
      totalPagesRef.current = 1;
      setTotalPages(0);
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

    const sortedCurrentMessagesByTopic = [
      ...currentMessagesByTopic.content,
    ].sort((a, b) => a.timestamp.localeCompare(b.timestamp));

    // const newMessagesData = processMessageData({
    //   sortedCurrentMessageByTopic,
    //   email,
    //   historyMessages,
    //   newMessages,
    //   notifications,
    // });

    dispatch(setHistoryMessages(currentMessagesByTopic.content));

    const newMessagesData = processMessageData({
      sortedCurrentMessagesByTopic,

      email,
      notifications,
    });

    dispatch(subscribeToMessages(topicId));

    dispatch(setMessages(newMessagesData));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [dispatch, historyMessages, newMessages, notifications, email, currentMessagesByTopic]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, notifications, email, currentMessagesByTopic]);
  // Here we have a problem - every time in redux store writing subscriptions,
  // then open a new topic. And old subscriptions does not removes.

  // useEffect for pagination values
  useEffect(() => {
    if (currentMessagesByTopic) {
      const { totalPages: totalPagesInCurrentMessages } =
        currentMessagesByTopic;

      setTotalPages(totalPagesInCurrentMessages);
      totalPagesRef.current = totalPagesInCurrentMessages;
    }

    // Reset pagination values to default
    return () => {
      setTotalPages(0);
      totalPagesRef.current = 0;
    };
  }, [currentMessagesByTopic]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollEventWithTO = (event) => {
    const { scrollHeight, scrollTop } = event.target;

    if (
      scrollHeight - scrollTop > scrollHeight - 200 &&
      currentPageRef.current < totalPagesRef.current
    ) {
      setCurrentPage((prevState) => prevState + 1);
      currentPageRef.current = currentPage + 1;
    } else {
      return;
    }
  };

  // // useEffect for scroll.
  useEffect(() => {
    const chatwrapId = document.getElementById('#chatwrap');

    chatwrapId.addEventListener('scroll', debounce(scrollEventWithTO, 1000));

    chatwrapId.scrollTo(0, chatwrapId.scrollHeight);

    if (!isLoadingCurrentMessagesByTopicId) {
      // eslint-disable-next-line max-len
      setTimeout(() => chatwrapId.scrollTo(0, chatwrapId.scrollHeight), 500); // This worksm but it is not the most correct way
    }

    return () => {
      chatwrapId.removeEventListener('scroll', scrollEventWithTO);
    };
  }, [isLoadingCurrentMessagesByTopicId, scrollEventWithTO]);

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

  return (
    <ChatWrap id="#chatwrap">
      {isLoading ? (
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
      // eslint-disable-next-line max-len
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
        <>
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
                                  ? `/home/notification/chat/${getPrivateTopicId(
                                      {
                                        userId: item.senderId,
                                        privateTopics,
                                      },
                                    )}/${item.senderId}`
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
        </>
      ) : null}
    </ChatWrap>
  );
};

export default memo(Chat);

// trohae7@gmail.com
// Password-123
