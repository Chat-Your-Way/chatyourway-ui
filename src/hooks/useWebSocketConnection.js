import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { client } from '../redux/chat-operations';
import { selectConnected } from '../redux/chatSlice';
import createClientInstance from '../utils/stompClient';
// import { connectWebSocket } from '../redux/chat-operations';
// import SockJS from 'sockjs-client';
// import { BASE_URL } from '../redux/apiParams';
import { selectAccessToken } from '../redux/authOperatonsToolkit/authOperationsThunkSelectors';
// import localLogOutUtil from '../utils/localLogOutUtil';

export const useWebSocketConnection = (isLoggedIn) => {
  const dispatch = useDispatch();
  const connected = useSelector(selectConnected);
  const accessTokenInStore = useSelector(selectAccessToken);

  useEffect(() => {
    if (isLoggedIn && !connected) {
      // dispatch(connectWebSocket());
      createClientInstance({ dispatch, accessTokenInStore });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, connected]);
};
