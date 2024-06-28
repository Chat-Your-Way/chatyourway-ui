/* eslint-disable no-unused-vars */
import { memo } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetAllQuery } from '../../../redux/topics-operations';
import { useTopicsContext } from '../TopicsContext';
import ChatItem from './ChatItem';
import { ChatBlockDataHelper } from './ChatBlockDataHelper';
import Loader from '../../../components/Loader';
import { StyledNavLink } from './ChatsBlock.styled';

import {
  selectAllTopicsNotifications,
  setAllTopicsNotifications,
} from '../../../redux/chatSlice';
import { useUser } from '../../../hooks/useUser';
import { PATH } from '../../../constans/routes';
import {
  setAccessToken,
  setIsLoggedIn,
  setRefreshToken,
} from '../../../redux/authOperatonsToolkit/authOperationsThunkSlice';
// eslint-disable-next-line max-len
import { selectAccessToken } from '../../../redux/authOperatonsToolkit/authOperationsThunkSelectors';

const ChatsBlock = ({ filter }) => {
  const { isTopics } = useTopicsContext();
  const ChatItems = ChatBlockDataHelper(isTopics); //?!
  const { pathname } = useLocation();
  const path = pathname.includes('topics') ? 'topics' : 'notification';
  const accessTokenInStore = useSelector(selectAccessToken);
  const { data, isLoading, isError, error } = useGetAllQuery({
    filter,
    accessTokenInStore,
  });
  const { localLogOut } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notificationsAllTopics = useSelector(selectAllTopicsNotifications);

  if (error) {
    alert('Виникла помилка під час отримання тем (ChatsBlock)');
    dispatch(setIsLoggedIn(false));
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  return isLoading ? (
    <Loader />
  ) : (
    data &&
      // notificationsAllTopics.length !== 0 &&
      data.map((item) => {
        const notification = notificationsAllTopics.find(
          (notificationItem) => notificationItem.id === item.id,
        );

        return (
          <StyledNavLink to={`../${path}/chat/${item.id}`} key={item.id}>
            {/* <ChatItem data={item} notification={notification} /> */}
            <ChatItem data={item} />
          </StyledNavLink>
        );
      })
  );
};

export default memo(ChatsBlock);
