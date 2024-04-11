/* eslint-disable no-unused-vars */
import { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetAllQuery } from '../../../redux/topics-operations';
import { useTopicsContext } from '../TopicsContext';
import ChatItem from './ChatItem';
import { ChatBlockDataHelper } from './ChatBlockDataHelper';
import Loader from '../../../components/Loader';
import { StyledNavLink } from './ChatsBlock.styled';

import {
  connectWebSocket,
  subscribeToAllTopicsNotify,
} from '../../../redux/chat-operations';
import {
  selectAllTopicsNotifications,
  selectConnected,
  selectSubscribedAllTopicsNotify,
} from '../../../redux/chatSlice';

const ChatsBlock = ({ isOpenChat = false, isOpenContacts = false, filter }) => {
  const { isTopics } = useTopicsContext();
  const ChatItems = ChatBlockDataHelper(isTopics); //?!
  const { pathname } = useLocation();
  const path = pathname.includes('topics') ? 'topics' : 'notification';
  const { data, isLoading, isError } = useGetAllQuery(filter);

  const dispatch = useDispatch();
  const connected = useSelector(selectConnected);
  const subscribedAllTopicsNotify = useSelector(
    selectSubscribedAllTopicsNotify,
  );
  const notificationsAllTopics = useSelector(selectAllTopicsNotifications);

  useEffect(() => {
    if (!connected) {
      dispatch(connectWebSocket());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!connected || subscribedAllTopicsNotify) return;

    dispatch(subscribeToAllTopicsNotify());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
