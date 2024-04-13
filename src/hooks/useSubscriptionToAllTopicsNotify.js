import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeToAllTopicsNotify } from '../redux/chat-operations';
import {
  selectConnected,
  selectSubscribedAllTopicsNotify,
} from '../redux/chatSlice';

export const useSubscriptionToAllTopicsNotify = (isAuthenticated) => {
  const dispatch = useDispatch();
  const connected = useSelector(selectConnected);
  const subscribedAllTopicsNotify = useSelector(
    selectSubscribedAllTopicsNotify,
  );

  useEffect(() => {
    if (!isAuthenticated || !connected || subscribedAllTopicsNotify) return;
    dispatch(subscribeToAllTopicsNotify());
  }, [dispatch, connected]);
};
