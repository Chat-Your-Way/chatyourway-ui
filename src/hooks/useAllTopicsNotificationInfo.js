import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken } from '../redux/authOperatonsToolkit/authOperationsThunkSelectors';
import {
  useGetAllPrivateTopicsQuery,
  useGetAllQuery,
} from '../redux/topics-operations';
import { setAllTopicsNotifications } from '../redux/chatSlice';

export const useAllTopicsNotificationInfo = (isLoggedIn) => {
  const accessTokenInStore = useSelector(selectAccessToken);
  const { currentData: allTopicsCurrentData } = useGetAllQuery({
    accessTokenInStore,
  });
  const { currentData: privateTopicsData } =
    useGetAllPrivateTopicsQuery(accessTokenInStore);
  const dispatch = useDispatch();
  // useEffect for notification array filling
  useEffect(() => {
    if (isLoggedIn && accessTokenInStore) {
      if (allTopicsCurrentData && privateTopicsData) {
        dispatch(
          setAllTopicsNotifications([
            ...allTopicsCurrentData.filter((el) => el.unreadMessageCount !== 0),
            ...privateTopicsData.filter((el) => el.unreadMessageCount !== 0),
          ]),
        );
      }
    }
  }, [
    isLoggedIn,
    accessTokenInStore,
    allTopicsCurrentData,
    privateTopicsData,
    dispatch,
  ]);
};
