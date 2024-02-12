import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://chat.eu-central-1.elasticbeanstalk.com:5000/chat',
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      setStompClient(client);
      setConnected(true);
      console.log('Connected to WebSocket');
    };

    client.onDisconnect = () => {
      console.log('Disconnected from WebSocket');
      setConnected(false);
    };

    client.activate();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  const handleMessageSend = () => {
    if (!stompClient || !connected || !inputMessage.trim()) return;
    stompClient.publish({
      destination: '/app/message',
      body: JSON.stringify({ text: inputMessage }),
    });
    setInputMessage('');
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  useEffect(() => {
    if (!stompClient) return;

    const subscription = stompClient.subscribe('/topic/messages', (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        JSON.parse(message.body),
      ]);
    });

    return () => subscription.unsubscribe();
  }, [stompClient]);

  return (
    <div>
      <h1>Chat Room</h1>
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <div key={index}>{message.text}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={inputMessage}
        onChange={handleInputChange}
      />
      <button onClick={handleMessageSend}>Send</button>
      {!connected && <div>Connecting to chat...</div>}
    </div>
  );
};

export default ChatComponent;
