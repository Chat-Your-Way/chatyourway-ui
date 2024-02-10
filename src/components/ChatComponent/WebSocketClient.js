import { useEffect, useCallback, useRef } from 'react';

const WebSocketClient = ({ onMessageReceived }) => {
  const socketRef = useRef(null);

  const sendMessage = useCallback((message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const socketUrl = `ws://chat.eu-central-1.elasticbeanstalk.com:5000/chat?token=${token}`;

    const newSocket = new WebSocket(socketUrl);

    newSocket.onopen = () => {
      console.log('WebSocket connected');
    };

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      onMessageReceived(message);
    };

    newSocket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    socketRef.current = newSocket;

    return () => {
      newSocket.close();
    };
  }, [onMessageReceived]);

  return {
    sendMessage,
  };
};

export default WebSocketClient;
