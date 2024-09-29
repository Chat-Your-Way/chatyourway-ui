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

      // console.log('socket in useEffect', socket);
      // socket.onopen = function (message) { // This thing is working!
      //   console.log('message in onopen', message);
      // };

      // socket.onclose = function (message) {
      //   console.log('message from onclose SockJS', message);
      //   // I think this function does not work.
      // };

      // socket.onerror = function (error) {
      //   console.log('This is error func in SockJS', error);
      // };

      client.configure({
        onConnect: (frame) => {
          // console.log('Lets look at the frame', frame);
          if (frame.command === 'CONNECTED') {
            // console.log('onConnect with frame.command = connected', frame);
            dispatch(setConnected(true));
          }
        },
        onDisconnect: () => {
          // dispatch(setConnected(false));
          // console.log('This is onDisconnect CLG', event);
          localLogOutUtil(dispatch);
        },
        onWebSocketError: () => {
          // console.log('This is onWSError CLG');
          localLogOutUtil(dispatch);
        },
        // onStompError: errorFrame => {
        //   console.log('StompErrorFrame', errorFrame);
        // },
        webSocketFactory: function () {
          return socket;
          // return new SockJS(`${BASE_URL}/chat?Authorization=Bearer ${accessTokenInStore}`);
        },
      });

      client.activate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, connected]);
};
