import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { client } from '../redux/chat-operations';
import { selectConnected, setConnected } from '../redux/chatSlice';
// import { connectWebSocket } from '../redux/chat-operations';
import SockJS from 'sockjs-client';
import { selectAccessToken } from '../redux/authOperatonsToolkit/authOperationsThunkSelectors';
import { BASE_URL } from '../redux/apiParams';
import localLogOutUtil from '../utils/localLogOutUtil';

export const useWebSocketConnection = (isLoggedIn) => {
  const dispatch = useDispatch();
  const connected = useSelector(selectConnected);
  const accessTokenInStore = useSelector(selectAccessToken);

  useEffect(() => {
    if (isLoggedIn && !connected) {
      // dispatch(connectWebSocket());
      const socket = new SockJS(
        `${BASE_URL}/chat?Authorization=Bearer ${accessTokenInStore}`,
      );

      socket.onmessage = function () {
        // I think this gunction does not work.
      };

      client.configure({
        onConnect: (frame) => {
          if (frame.command === 'CONNECTED') {
            dispatch(setConnected(true));
          }
        },
        onDisconnect: () => {
          dispatch(setConnected(false));
          localLogOutUtil(dispatch);
        },
        onWebSocketError: () => {
          localLogOutUtil(dispatch);
        },
        webSocketFactory: function () {
          return socket;
        },
      });

      client.activate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
