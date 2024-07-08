import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { client } from '../redux/chat-operations';
import { selectConnected, setConnected } from '../redux/chatSlice';

export const useWebSocketConnection = (isLoggedIn) => {
  const dispatch = useDispatch();
  const connected = useSelector(selectConnected);
  const stompClient = client;

  useEffect(() => {
    if (isLoggedIn && !connected) {
      // dispatch(connectWebSocket());

      stompClient.activate();
      stompClient.configure({
        onConnect: (frame) => {
          if (frame.command === 'CONNECTED') {
            dispatch(setConnected(true));
          }
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
