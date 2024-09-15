/* eslint-disable no-unused-vars */
import { memo, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  useGetAllPrivateTopicsQuery,
  useGetAllQuery,
} from '../../../redux/topics-operations';
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
import localLogOutUtil from '../../../utils/localLogOutUtil';

const ChatsBlock = ({ filter, searchInputValue }) => {
  const { isTopics, showTopics, setPrivateTopics } = useTopicsContext();
  const ChatItems = ChatBlockDataHelper(isTopics); //?!
  const { pathname } = useLocation();
  const path = pathname.includes('topics') ? 'topics' : 'notification';
  const accessTokenInStore = useSelector(selectAccessToken);
  const {
    currentData: allTopicsData,
    isLoading,
    isError,
    error,
  } = useGetAllQuery(
    {
      filter,
      accessTokenInStore,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );

  const {
    isLoading: isLoadingPrivateTopics,
    data: privateTopics,
    currentData: currentPrivateTopicsData,
    isFetching: isFetchingPrivateTopics,
    error: privateTopicsError,
  } = useGetAllPrivateTopicsQuery(accessTokenInStore, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (currentPrivateTopicsData) {
      setPrivateTopics(currentPrivateTopicsData);
    } else {
      setPrivateTopics([]);
    }
  }, [currentPrivateTopicsData, setPrivateTopics]);

  // useEffect for notification array filling
  useEffect(() => {
    if (!allTopicsData || !currentPrivateTopicsData) {
      return;
    }

    dispatch(
      setAllTopicsNotifications([
        ...allTopicsData.filter((el) => el.unreadMessageCount !== 0),
        ...currentPrivateTopicsData.filter((el) => el.unreadMessageCount !== 0),
      ]),
    );
  }, [allTopicsData, currentPrivateTopicsData, dispatch]);

  const { localLogOut } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notificationsAllTopics = useSelector(selectAllTopicsNotifications);

  const filteredAllTopicsData = allTopicsData?.filter((item) =>
    item.name.toLowerCase().includes(searchInputValue.toLowerCase().trim()),
  );
  const filteredCurrentPrivateTopics = currentPrivateTopicsData?.filter(
    (item) =>
      item.name.toLowerCase().includes(searchInputValue.toLowerCase().trim()),
  );

  if (error) {
    alert('Виникла помилка під час отримання тем (ChatsBlock)');
    localLogOutUtil(dispatch);
    // dispatch(setIsLoggedIn(false));
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
  }

  return isLoading ? (
    <Loader />
  ) : isTopics ? (
    allTopicsData &&
    // notificationsAllTopics.length !== 0 &&
    filteredAllTopicsData.map((item) => {
      const notification = notificationsAllTopics.find(
        (notificationItem) => notificationItem.id === item.id,
      );

      return (
        <StyledNavLink
          to={`../${path}/chat/${item.id}/${item.contact.id}`}
          key={item.id}
        >
          {/* <ChatItem data={item} notification={notification} /> */}
          <ChatItem data={item} />
        </StyledNavLink>
      );
    })
  ) : (
    privateTopics &&
    // notificationsAllTopics.length !== 0 &&
    filteredCurrentPrivateTopics.map((item) => {
      const notification = notificationsAllTopics.find(
        (notificationItem) => notificationItem.id === item.id,
      );

      return (
        <StyledNavLink
          to={`../${path}/chat/${item.id}/${item.contact.id}`}
          key={item.id}
        >
          {/* <ChatItem data={item} notification={notification} /> */}
          <ChatItem data={item} />
        </StyledNavLink>
      );
    })
  );
};

export default memo(ChatsBlock);
