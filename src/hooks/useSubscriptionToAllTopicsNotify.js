import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeToAllTopicsNotify } from '../redux/chat-operations';
import {
  selectConnected,
  selectSubscribedAllTopicsNotify,
} from '../redux/chatSlice';

export const useSubscriptionToAllTopicsNotify = (isLoggedIn) => {
  const dispatch = useDispatch();
  const connected = useSelector(selectConnected);
  const subscribedAllTopicsNotify = useSelector(
    selectSubscribedAllTopicsNotify,
  );

  useEffect(() => {
    if (!isLoggedIn || !connected || subscribedAllTopicsNotify) {
      return;
    }

    dispatch(subscribeToAllTopicsNotify());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, connected]);
};
