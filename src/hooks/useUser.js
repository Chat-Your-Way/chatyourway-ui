import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  disconnectWebSocket,
  unsubscribeFromAllTopicsNotify,
} from '../redux/chat-operations';
import { clearAllTopicsNotifications } from '../redux/chatSlice';

export const useUser = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('accessToken'));
  const dispatch = useDispatch();

  const localLogOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuth(null);
    dispatch(unsubscribeFromAllTopicsNotify());
    dispatch(disconnectWebSocket());
    dispatch(clearAllTopicsNotifications());
  };

  const logIn = (accToken, refToken) => {
    localStorage.setItem('accessToken', accToken);
    localStorage.setItem('refreshToken', refToken);
    setIsAuth(accToken);
  };

  return {
    isAuthenticated: !!isAuth,
    isAuth,
    localLogOut,
    logIn,
  };
};
