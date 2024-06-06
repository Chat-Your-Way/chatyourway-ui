/* eslint-disable no-unused-vars */
import { memo } from 'react';

import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetAllQuery } from '../../../redux/topics-operations';
import { useTopicsContext } from '../TopicsContext';
import ChatItem from './ChatItem';
import { ChatBlockDataHelper } from './ChatBlockDataHelper';
import Loader from '../../../components/Loader';
import { StyledNavLink } from './ChatsBlock.styled';

import { selectAllTopicsNotifications } from '../../../redux/chatSlice';
import { useUser } from '../../../hooks/useUser';

const ChatsBlock = ({ filter }) => {
  const { isTopics } = useTopicsContext();
  const ChatItems = ChatBlockDataHelper(isTopics); //?!
  const { pathname } = useLocation();
  const path = pathname.includes('topics') ? 'topics' : 'notification';
  const { data, isLoading, isError } = useGetAllQuery(filter);
  const { localLogOut } = useUser();

  const notificationsAllTopics = useSelector(selectAllTopicsNotifications);

  if (isError) {
    alert('Виникла помилка під час отримання тем');
    localLogOut();
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
            <ChatItem data={item} notification={notification} />
          </StyledNavLink>
        );
      })
  );
};

export default memo(ChatsBlock);
