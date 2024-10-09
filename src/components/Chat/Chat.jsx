/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { memo, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { selectUserInfo } from '../../redux/userSlice';
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
import { fireEvent } from '@testing-library/react';
import { useInView } from 'react-intersection-observer';
import MessageContainerObserver from './MessageContainerObserver/MessageContainerObserver';
import setUnreadMessageFlag from '../../utils/setUnreadMessagesFlag';

const Chat = ({ children }) => {
  const { topicId, userId } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [sizeOfMessages, setSizeOfMessages] = useState(30);

  const currentPageRef = useRef(1);
  const totalPagesRef = useRef(0);

  const accessTokenInStore = useSelector(selectAccessToken);
  const {
    currentData: topicIdData,
    isLoading,
    error: topicIdDataError,
    isFetching: isFetchingTopicIdData,
  } = useGetByIdQuery(
    { topicId, accessTokenInStore },
    { refetchOnMountOrArgChange: true, refetchOnFocus: true },
  );

  const {
    isLoading: isLoadingCurrentMessagesByTopicId,
    data: messagesByTopic,
    currentData: currentMessagesByTopic,
    isFetching: isFetchingCurrentMessagesByTopic,
    error: messagesByTopicError,
    refetch: refetchMessagesByTopicId,
  } = useGetMessagesByTopicQuery(
    { topicId, accessTokenInStore, currentPage, sizeOfMessages },
    {
      refetchOnMountOrArgChange: true, // Not really sure that i understand how this is work!
      refetchOnFocus: true,
      refetchOnReconnect: true,
      // pollingInterval: 10000, // This works perfect!
    },
  );

  const { email } = useSelector(selectUserInfo);
  const { isTopics, privateTopics, setPrivateTopics } = useTopicsContext();
  const { contactsOpen, setContactsOpen } = useTopicsPageContext(); //?!
  const { pathname } = useLocation();
  const navigate = useNavigate();

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

  const [
    sendMessageToTopic,
    { error: sendMessageError, isSuccess: isSuccessSendMessage },
  ] = useSendMessageToTopicMutation();

  const [
    sendFirstMessageToUser,
    { data: sendFirstMessageData, isSuccess: isSendFirstMessagesSuccess },
  ] = useSendMessageToNewTopicMutation();

  const inputRef = useRef(null);
  const chatWrapIdRef = useRef(null);
  const isFirstUnreadMessageRef = useRef(null);
  const unreadMessageContainerRef = useRef(null);

  useEffect(() => {
    if (!connected) {
      client.activate();
    }

    // dispatch(toggleChatOpened());
    dispatch(setChatOpened(true));

    return () => {
      dispatch(unsubscribeFromMessages());
      // dispatch(disconnectWebSocket()); //!
      dispatch(clearNotifications());
      dispatch(clearNewMessages());
      dispatch(clearMessages());
      dispatch(clearHistoryMessages());

      // dispatch(toggleChatOpened());
      dispatch(setChatOpened(false));
      currentPageRef.current = 1;
      setCurrentPage(1);
      totalPagesRef.current = 1;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This useEffecr to handle topicId change - when topicId changes,
  // the component doesn't unmount, so the messages array doesn't clean.
  useEffect(() => {
    if (!connected) return;

    dispatch(subscribeToMessages(topicId));
    setCurrentPage(1);
    currentPageRef.current = 1;
    // dispatch(getTopicHistory(topicId));

    return () => {
      dispatch(unsubscribeFromMessages());
      dispatch(clearHistoryMessages());
      dispatch(clearMessages());
      dispatch(clearNewMessages());
      dispatch(clearNotifications());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, connected, topicId]);

  // This useEffect for processing the array of messages.
  useEffect(() => {
    // if (historyMessages.length === 0 || notifications.length === 0) return;
    if (!currentMessagesByTopic || !topicIdData) return;

    // Here I add a unread message status
    const { unreadMessageCount } = topicIdData;
    const arrayWithUnreadMessagesFlag = setUnreadMessageFlag({
      arrayOfMessages: currentMessagesByTopic.content,
      unreadMessageCount,
    });

    if (historyMessages.length === 0) {
      const newMessagesData = processMessageData({
        arrayOfMessages: [...arrayWithUnreadMessagesFlag].sort((a, b) =>
          a.timestamp.localeCompare(b.timestamp),
        ),
        email,
        notifications,
      });

      // dispatch(subscribeToMessages(topicId)); // This operation processed in previous useEffect

      dispatch(setMessages(newMessagesData));

      dispatch(
        setHistoryMessages(
          [...historyMessages, ...arrayWithUnreadMessagesFlag].sort((a, b) =>
            a.timestamp.localeCompare(b.timestamp),
          ),
        ),
      );
    } else {
      // This is the filter for messages when they are exist in historyMessages
      // eslint-disable-next-line max-len
      // and comes from the response at the same time. But I still need filter for double messages in historyMessages

      // Filter by topicId.
      const filteredCurrentMessagesByTopicId = historyMessages.filter(
        (el) => el.topicId === topicId,
      );

      // Filter for double messages
      // eslint-disable-next-line prettier/prettier
      const filteredHistoryMessagesByResponse = filteredCurrentMessagesByTopicId.filter(currEl => {
          // if (currentMessagesByTopic.content.find(el => el.id === currEl.id)) {
          if (arrayWithUnreadMessagesFlag.find((el) => el.id === currEl.id)) {
            return false;
          } else {
            return historyMessages.find((el) => el.id === currEl.id);
          }
        });

      // This filter only for historyMessages - delete the double messages
      const filteredHistoryMessages = filteredCurrentMessagesByTopicId.filter(
        (currEl) => {
          if (historyMessages.find((el) => el.id === currEl.id)) {
            return false;
          } else {
            return historyMessages.find((el) => el.id === currEl.id);
          }
        },
      );

      const newMessagesData = processMessageData({
        arrayOfMessages: [
          ...filteredHistoryMessages,
          ...filteredHistoryMessagesByResponse,
          // ...currentMessagesByTopic.content,
          ...arrayWithUnreadMessagesFlag,
        ].sort((a, b) => a.timestamp.localeCompare(b.timestamp)),

        email,
        notifications,
      });

      dispatch(setMessages(newMessagesData));

      dispatch(
        setHistoryMessages(
          [
            ...filteredHistoryMessages,
            ...filteredHistoryMessagesByResponse,
            ...arrayWithUnreadMessagesFlag,
          ].sort((a, b) => a.timestamp.localeCompare(b.timestamp)),
        ),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentMessagesByTopic, topicIdData]);

  // useEffect for pagination values
  useEffect(() => {
    if (!isFetchingCurrentMessagesByTopic) {
      if (!currentMessagesByTopic) {
        return;
      }

      const { totalPages: totalPagesInCurrentMessages } =
        currentMessagesByTopic;

      totalPagesRef.current = totalPagesInCurrentMessages;
    }

    // Reset pagination values to default
    return () => {
      totalPagesRef.current = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId, isFetchingCurrentMessagesByTopic]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollEventWithTO = (event) => {
    // If I don't change refs when send new message - pagination stops working.

    const { scrollHeight, scrollTop } = event.target;

    if (
      scrollHeight - scrollTop > scrollHeight - 100 &&
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
    isFirstUnreadMessageRef.current = messages.find((el) =>
      el.messageStatus ? el : false,
    );

    // Automatically scroll down when it's first request
    if (isLoadingCurrentMessagesByTopicId) {
      // eslint-disable-next-line max-len
      setTimeout(
        () =>
          chatWrapIdRef.current.scrollTo(0, chatWrapIdRef.current.scrollHeight),
        500,
      );
    }

    // Try to scroll when isFetching is false (when new messages has arrived)
    if (!isFetchingCurrentMessagesByTopic && currentPageRef.current === 1) {
      chatWrapIdRef.current.scrollTo(0, chatWrapIdRef.current.scrollHeight);
    }

    // Automatically scroll down after sending a message and changing the message array
    if (isSuccessSendMessage) {
      chatWrapIdRef.current.scrollTo(0, chatWrapIdRef.current.scrollHeight);
    }

    // Scroll down if topicId change
    if (messages[0]?.topicId !== topicId) {
      chatWrapIdRef.current.scrollTo(0, chatWrapIdRef.current.scrollHeight);
    }

    // Here proccesing situation with message container
    if (!isFirstUnreadMessageRef.current) {
      return;
    } else {
      unreadMessageContainerRef.current = document.getElementById(
        `#${isFirstUnreadMessageRef.current.id}`,
      );

      // Scroll to current container
      if (unreadMessageContainerRef.current) {
        unreadMessageContainerRef.current.scrollIntoView();
      }
    }

    return () => {
      isFirstUnreadMessageRef.current = null;
      unreadMessageContainerRef.current = null;
    };
    // }, [topicId, messages, isFetchingCurrentMessagesByTopic]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId, messages]);

  // Try to process the situation when user doesn't has a private dialog
  useEffect(() => {
    // To much requests send to the server - so we have to much messages in private dialog
    // if (
    //   topicIdDataError?.data?.detail?.includes(
    //     "Failed to convert 'id' with value",
    //   ) ||
    //   messagesByTopicError?.data?.detail?.includes(
    //     "Failed to convert 'id' with value",
    //   ) ||
    //   topicIdDataError?.data?.detail?.includes(
    //     "Failed to convert 'topicId' with value",
    //   ) ||
    //   messagesByTopicError?.data?.detail?.includes(
    //     "Failed to convert 'topicId' with value",
    //   )
    // ) {
    //   sendFirstMessageToUser({
    //     userEmail: topicId,
    //     accessTokenInStore,
    //     inputMessage: 'Hello! I want to chat with you!',
    //   });
    // }

    if (
      topicIdDataError?.data?.detail?.includes(
        "Failed to convert 'id' with value",
      ) ||
      topicIdDataError?.data?.detail?.includes(
        "Failed to convert 'topicId' with value",
      )
    ) {
      sendFirstMessageToUser({
        userEmail: topicId,
        accessTokenInStore,
        inputMessage: 'Hello! I want to chat with you!',
      });
    }

    if (isSendFirstMessagesSuccess) {
      navigate(`/home/notification/chat/${sendFirstMessageData.id}`);
    }
    // sendFirstMessageData.id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicIdDataError, isSendFirstMessagesSuccess]);

  // Function for searching name of user in private topics array
  const getUserName = () => {
    const existingUser = privateTopics?.find(
      (el) => el?.contact?.id === userId,
    );

    if (existingUser) {
      return existingUser.contact.nickname;
    } else {
      return null;
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
      // sendMessageByWs({ topicId, inputMessage });
      sendMessageToTopic({ topicId, inputMessage, accessTokenInStore });
      inputRef.current.value = '';
      setCurrentPage(1);
    } else if (
      pathname.includes('notification') &&
      connected &&
      getUserName()
    ) {
      sendMessageToTopic({ topicId, inputMessage, accessTokenInStore });
      inputRef.current.value = '';
      setCurrentPage(1);
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
        <ChatWrap id="#chatwrap" ref={chatWrapIdRef}>
          <ChatHeader>
            <UserBox>
              <Avatar size={isMobile ? 'sm' : 'md'}>
                {topicIdData ? getAvatar(isTopics, topicIdData) : null}
              </Avatar>
              <InfoBox>
                <ChatUserName variant={isMobile ? 'h6' : 'h5'}>
                  {pathname.includes('notification')
                    ? getUserName()
                      ? `Приватний чат з ${getUserName()}`
                      : null
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
              You dont have a dialog with this user yet!
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
    // Hide this code because change an approach to the enter message input
    // if (sendMessageError?.data?.message?.includes('subscribed to the topic')) {
    //   alert('Потрібно підписатись на цю тему, щоб відправляти повідомлення');
    //   return;
    // }

    alert('Виникла помилка під час отримання теми (ChatComponent)');

    localLogOutUtil(dispatch);
  }

  return (
    <ChatWrap
      id="#chatwrap"
      onScroll={debounce(scrollEventWithTO, 1000)}
      ref={chatWrapIdRef}
    >
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
      // eslint-disable-next-line max-len
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
            {/* <div ref={observerRef}> */}
            <UserBox>
              <Avatar size={isMobile ? 'sm' : 'md'}>
                {topicIdData ? getAvatar(isTopics, topicIdData) : null}
              </Avatar>
              <InfoBox>
                <ChatUserName variant={isMobile ? 'h6' : 'h5'}>
                  {pathname.includes('notification')
                    ? `Приватний чат з ${getUserName()} `
                    : null}
                  {pathname.includes('topics')
                    ? topicIdData
                      ? topicIdData.name
                      : 'імя користувача'
                    : null}
                </ChatUserName>
                <TypingIndicator variant={isMobile ? 'h6' : 'h5'}>
                  {topicIdData.lastMessage
                    ? topicIdData.lastMessage.sentFrom
                    : null}{' '}
                  / Пишеш...
                </TypingIndicator>
              </InfoBox>
            </UserBox>
            {/* <UsersAvatar topicId={topicId} /> */}
            <UsersAvatar
              currentTopicSubscribers={topicIdData.topicSubscribers}
              topicId={topicId}
            />
            <InfoMoreBox>
              {children}
              <TopicSettingsMenu
                topicId={topicId}
                subscribeStatus={subscribeStatus()}
              />
            </InfoMoreBox>
          </ChatHeader>
          {/* </div> */}
          <ChatSectionWrap>
            <ChatSection>
              {messages &&
                messages.map((item) => (
                  <ChatSection key={item.id} isMyMessage={item.isMyMessage}>
                    <MessageContainerObserver
                      isMyMessage={item.isMyMessage}
                      chatWrapIdRef={chatWrapIdRef}
                      messageId={item.id}
                      messageStatus={item.messageStatus}
                      isFirstUnreadMessage={
                        isFirstUnreadMessageRef?.current?.id === item.id
                          ? item
                          : false
                      }
                    >
                      <UserMassageWrap>
                        <IndicatorBox isMyMessage={item.isMyMessage}>
                          <TimeIndicator
                            isMyMessage={item.isMyMessage}
                            messageStatus={item.messageStatus}
                          >
                            {item.time}
                          </TimeIndicator>
                          <IconActivity isMyMessage={item.isMyMessage}>
                            {item.isOnline ? (
                              <ICONS.PROPERTY_ACTIVITY />
                            ) : (
                              <ICONS.NO_ACTIVITY />
                            )}
                          </IconActivity>
                          <UserName
                            variant="h5"
                            messageStatus={item.messageStatus}
                          >
                            {item.name}
                          </UserName>
                        </IndicatorBox>
                        <TextMessageBlock>
                          <TextMessage isMyMessage={item.isMyMessage}>
                            {item.text}
                          </TextMessage>
                          {!item.isMyMessage && <DropDownMenu />}
                        </TextMessageBlock>
                      </UserMassageWrap>
                      {item.permittedSendingPrivateMessage
                        ? avatarsArray.map(
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
                                      : // eslint-disable-next-line max-len
                                        `/home/notification/chat/${item.senderEmail}/${item.senderId}`
                                  }
                                >
                                  <Avatar key={index}>
                                    <Logo />
                                  </Avatar>
                                </Link>
                              ),
                          )
                        : avatarsArray.map(
                            (Logo, index) =>
                              item.avatarId - 1 === index && (
                                <Avatar key={index}>
                                  <Logo />
                                </Avatar>
                              ),
                          )}
                    </MessageContainerObserver>
                  </ChatSection>
                ))}
              {/* This is the old code without Observer for unread messages */}
              {/* {messages &&
                  messages.map(item => (
                    <ChatSection key={item.id} isMyMessage={item.isMyMessage}>
                      <MessageContainer
                        isMyMessage={item.isMyMessage}
                        ref={observerRef}
                        data-id={item.id}
                      >
                        <UserMassageWrap>
                          <IndicatorBox isMyMessage={item.isMyMessage}>
                            <TimeIndicator isMyMessage={item.isMyMessage}>
                              {item.time}
                            </TimeIndicator>
                            <IconActivity isMyMessage={item.isMyMessage}>
                              {item.isOnline ? <ICONS.PROPERTY_ACTIVITY /> : <ICONS.NO_ACTIVITY />}
                            </IconActivity>
                            <UserName variant="h5">{item.name}</UserName>
                          </IndicatorBox>
                          <TextMessageBlock>
                            <TextMessage isMyMessage={item.isMyMessage}>{item.text}</TextMessage>
                            {!item.isMyMessage && <DropDownMenu />}
                          </TextMessageBlock>
                        </UserMassageWrap>
                        {item.permittedSendingPrivateMessage
                          ? avatarsArray.map(
                              (Logo, index) =>
                                item.avatarId - 1 === index && (
                                  <Link
                                    key={item.id}
                                    to={
                                      privateTopics.some(el => el?.contact?.id === item.senderId)
                                        ? `/home/notification/chat/${getPrivateTopicId({
                                            userId: item.senderId,
                                            privateTopics,
                                          })}/${item.senderId}`
                                        : 
                                        
                                          `/home/notification/chat/${item.senderEmail}/${item.senderId}`
                                    }
                                  >
                                    <Avatar key={index}>
                                      <Logo />
                                    </Avatar>
                                  </Link>
                                )
                            )
                          : avatarsArray.map(
                              (Logo, index) =>
                                item.avatarId - 1 === index && (
                                  <Avatar key={index}>
                                    <Logo />
                                  </Avatar>
                                )
                            )}
                      </MessageContainer>
                    </ChatSection>
                  ))} */}
            </ChatSection>
            <InputBox>
              {/* If user not subscribed to topic - return readOnly message input */}
              {subscribeStatus() ? (
                <ChatInputStyled
                  ref={inputRef} //!
                  type="text" //!
                  maxRows={3}
                  placeholder={'Введіть повідомлення...'}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      handleMessageSend();
                    }
                  }}
                />
              ) : (
                <ChatInputStyled
                  ref={inputRef} //!
                  type="text" //!
                  maxRows={3}
                  placeholder={
                    'Потрібно бути підписаним на цей топік щоб відправляти повідомлення - це можна зробити через меню '
                  }
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      handleMessageSend();
                    }
                  }}
                  readOnly
                />
              )}
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
