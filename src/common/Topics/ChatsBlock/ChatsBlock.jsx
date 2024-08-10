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
      refetchOnMountOrArgChange: 5,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );

  const {
    isLoading: isLoadingPrivateTopics,
    data: privateTopics,
    currentData: currentPrivateTopics,
    isFetching: isFetchingPrivateTopics,
    error: privateTopicsError,
  } = useGetAllPrivateTopicsQuery(accessTokenInStore, {
    refetchOnMountOrArgChange: 10,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (currentPrivateTopics) {
      setPrivateTopics(currentPrivateTopics);
    } else {
      setPrivateTopics([]);
    }
  }, [currentPrivateTopics, setPrivateTopics]);

  const { localLogOut } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notificationsAllTopics = useSelector(selectAllTopicsNotifications);

  const filteredAllTopicsData = allTopicsData?.filter((item) =>
    item.name.includes(searchInputValue),
  );
  const filteredCurrentPrivateTopics = currentPrivateTopics?.filter((item) =>
    item.name.includes(searchInputValue),
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
          to={`../${path}/chat/${item.id}/${item.createdBy.id}`}
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
