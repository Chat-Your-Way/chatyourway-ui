import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { client } from '../redux/chat-operations';
import { selectConnected } from '../redux/chatSlice';
// import createClientInstance from '../utils/stompClient';
import { connectWebSocket } from '../redux/chat-operations';
// import SockJS from 'sockjs-client';
// import { BASE_URL } from '../redux/apiParams';
import { selectAccessToken } from '../redux/authOperationsToolkit/authOperationsThunkSelectors';
// import localLogOutUtil from '../utils/localLogOutUtil';

export const useWebSocketConnection = () => {
  const dispatch = useDispatch();
  const isConnected = useSelector(selectConnected);
  const accessTokenInStore = useSelector(selectAccessToken);
  // localStorage.setItem('accessToken', accessTokenInStore);

  useEffect(() => {
    // console.log('useEffect in useWebSocketConnection');
    if (accessTokenInStore && !isConnected) {
      dispatch(connectWebSocket(accessTokenInStore));
      // createClientInstance({ dispatch, accessTokenInStore });
    }
  }, [accessTokenInStore, dispatch, isConnected]);
};
