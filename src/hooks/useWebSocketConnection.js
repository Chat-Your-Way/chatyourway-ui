import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWebSocket } from '../redux/chat-operations';
import { selectConnected } from '../redux/chatSlice';

export const useWebSocketConnection = (isAuthenticated) => {
  const dispatch = useDispatch();
  const connected = useSelector(selectConnected);

  useEffect(() => {
    if (isAuthenticated && !connected) {
      dispatch(connectWebSocket());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
