import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { ajwt } from '../../redux/apiParams'; //!
import { useParams } from 'react-router-dom';

const ChatRoom = () => {
  // const { avatarId } = useSelector(getUserInfo); //!?
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const { title: topicId } = useParams();

  const getTopicHistoryDest = '/app/history/topic/';
  const subToTopicDest = '/topic/';
  const subToNotificationDest = '/user/specific/notify/';
  const subToErrorDest = '/user/specific/error';
  const sendToPublicTopicDest = '/app/topic/public/';
  // const sendToPrivateTopicDest = '/app/topic/private/'; //?!

  // const [setError] = useState(null);

  //! сокет коннект //!
  useEffect(() => {
    const connect = () => {
      // const tokenType = 'Bearer';
      const socket = new SockJS(
        `http://chat.eu-central-1.elasticbeanstalk.com/chat?Authorization=Bearer ${ajwt}`,
      );

      const client = Stomp.over(() => socket);

      client.connect(
        {},
        () => {
          setStompClient(client);
          setConnected(true);

          console.log('Connected to WebSocket'); //!
        },
        (error) => {
          console.error('Error connecting to WebSocket:', error);
        },
      );
    };

    connect();

    return () => {
      if (stompClient) {
        stompClient.disconnect((error) => {
          if (error) {
            console.error('Error disconnecting from WebSocket:', error);
          } else {
            setConnected(false);
          }
        });
      }
      console.log('Disconnected from WebSocket'); //!
    };
  }, []);

  //! підписки //!
  useEffect(() => {
    if (!stompClient) return;

    let subscriptionToHistory;
    let subscriptionToTopic;
    let subscriptionToError;
    let subscriptionToNotify;

    const getTopicHistory = () => {
      stompClient.send(
        `${getTopicHistoryDest}${topicId}`,
        {},
        JSON.stringify({ page: 0, pageSize: 100 }),
      );
    };

    getTopicHistory();

    const subscribeToMessageHistory = () => {
      subscriptionToHistory = stompClient.subscribe(
        `/user${subToTopicDest}${topicId}`,
        (message) => {
          let parsedMessage = JSON.parse(message.body);

          console.log(
            'Received message from subscribeToMessageHistory:',
            parsedMessage,
          ); //!

          setMessages((prevMessages) => [...prevMessages, ...parsedMessage]);

          console.log('messages from subscribeToMessageHistory', messages); //!
        },
      );
    };

    subscribeToMessageHistory();

    const subscribeToTopic = () => {
      subscriptionToTopic = stompClient.subscribe(
        `${subToTopicDest}${topicId}`,
        (message) => {
          let parsedMessage = JSON.parse(message.body);

          console.log('Received message from subscribeToTopic:', parsedMessage); //!

          setMessages((prevMessages) => [...prevMessages, parsedMessage]);

          console.log('messages from subscribeToTopic', messages); //!
        },
      );
    };

    subscribeToTopic();

    const subscribeToNotify = () => {
      subscriptionToNotify = stompClient.subscribe(
        `${subToNotificationDest}${topicId}`,
        (message) => {
          let parsedMessage = JSON.parse(message.body);

          console.log(
            'Received message from subscribeToNotify:',
            parsedMessage,
          ); //!
        },
      );
    };

    subscribeToNotify();

    const subscribeToError = () => {
      subscriptionToError = stompClient.subscribe(
        `${subToErrorDest}`,
        (message) => {
          let parsedMessage = JSON.parse(message.body);
          console.log('Received message from subscribeToError:', parsedMessage); //!
        },
      );
    };

    subscribeToError();

    return () => {
      subscriptionToHistory.unsubscribe();
      subscriptionToTopic.unsubscribe(); //?! чи треба відписуватись якщо продовжуєш отримувати повідомлення
      subscriptionToNotify.unsubscribe();
      subscriptionToError.unsubscribe();
      setMessages([]);
    };
  }, [stompClient, topicId]);

  const handleMessageSend = () => {
    // if (!stompClient || !connected || !inputMessage.trim()) return; //!

    stompClient.send(
      `${sendToPublicTopicDest}${topicId}`,
      {},
      JSON.stringify({ content: inputMessage }),
    );

    setInputMessage('');
    console.log(
      'inputMessage from handleMessageSend',
      JSON.stringify({ content: inputMessage }),
    ); //!
    console.log('messages from handleMessageSend', messages); //!
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  return (
    <div>
      {!connected && <div>Connecting to chat...</div>}
      <h1>Chat Room</h1>
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <div key={index}>{message.content}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={inputMessage}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <button onClick={handleMessageSend}>Send</button>
    </div>
  );
};

export default ChatRoom;
