import { useState, useEffect } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";

const ChatComponent = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const connect = () => {
      const socket = new SockJS(
        "http://chat.eu-central-1.elasticbeanstalk.com:5000/chat");
      const stompClient = over(socket);

      stompClient.connect({}, () => {
        setConnected(true);
      });
    };

    connect();

    return () => {
      // close
    };
  }, []);

  return (
    <div className="container">
      {connected ? (
        <p>WebSocket connection successful!</p>
      ) : (
        <p>Connecting to WebSocket...</p>
      )}
    </div>
  );
};

export default ChatComponent;
