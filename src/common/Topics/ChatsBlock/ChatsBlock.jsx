/* eslint-disable no-unused-vars */
import { memo, useEffect } from 'react';
import ChatItem from './ChatItem';
import { ChatBlockDataHelper } from './ChatBlockDataHelper';
import { StyledNavLink } from './ChatsBlock.styled';
import { useLocation } from 'react-router-dom';
import { useTopicsContext } from '../TopicsContext';
import { useGetAllQuery } from '../../../redux/topics-operations';
import Loader from '../../../components/Loader';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllTopicsNotifications,
  selectConnected,
  selectSubscribedAllTopicsNotify,
} from '../../../redux/chatSlice';
import {
  connectWebSocket,
  disconnectWebSocket, //!
  subscriptionToAllNotify,
} from '../../../redux/chat-operations';

const ChatsBlock = ({ isOpenChat = false, isOpenContacts = false, filter }) => {
  const { isTopics } = useTopicsContext();
  const ChatItems = ChatBlockDataHelper(isTopics);
  const { pathname } = useLocation();
  const path = pathname.includes('topics') ? 'topics' : 'notification';

  const { data, isLoading, isError } = useGetAllQuery(filter);

  console.log('data', data); //!!!!!!!!!!!!!!!!

  const dispatch = useDispatch();
  // const historyMessages = useSelector(selectHistoryMessages);
  const notificationsAllTopics = useSelector(selectAllTopicsNotifications);
  // const newMessages = useSelector(selectNewMessages);
  // const messages = useSelector(selectMessages);
  const connected = useSelector(selectConnected);
  // const subscribed = useSelector(selectSubscribed);
  const subscribedAllTopicsNotify = useSelector(
    selectSubscribedAllTopicsNotify,
  );

  // const inputRef = useRef(null);

  useEffect(() => {
    if (!connected) {
      dispatch(connectWebSocket());
    }

    // return () => {
    //   //   dispatch(unsubscribeFromMessages());
    //   dispatch(disconnectWebSocket());
    //   //   dispatch(clearMessages());
    //   //   dispatch(clearHistoryMessages());
    //   //   dispatch(clearNewMessages());
    // };
  }, []);

  useEffect(() => {
    if (!connected || subscribedAllTopicsNotify) return; //!

    // if (subscribed) {
    //   dispatch(unsubscribeFromMessages());
    // }

    // dispatch(clearMessages());
    // dispatch(clearHistoryMessages());
    // dispatch(clearNewMessages());
    console.log('connected', connected); //!!!!!!!!!!!!!!!!

    dispatch(subscriptionToAllNotify());
    // dispatch(getTopicHistory());
  }, [dispatch, connected]);

  if (isError) {
    alert('Виникла помилка під час отримання тем');
  }

  return isLoading ? (
    <Loader />
  ) : (
    data &&
      notificationsAllTopics.length !== 0 &&
      data.map((item) => {
        const notification = notificationsAllTopics.find(
          (notificationItem) => notificationItem.topicId === item.id,
        );

        return (
          <StyledNavLink to={`../${path}/chat/${item.id}`} key={item.id}>
            <ChatItem
              isOpenChat={isOpenChat}
              isOpenContacts={isOpenContacts}
              data={item}
              notification={notification}
            />
          </StyledNavLink>
        );
      })
  );
};

export default memo(ChatsBlock);
