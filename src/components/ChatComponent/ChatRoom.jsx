import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
// import { ajwt } from '../../redux/apiParams'; //!

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  // const [setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         'http://chat.eu-central-1.elasticbeanstalk.com/user/specific/notify/4',
  //         {
  //           headers: {
  //             Authorization: `Bearer ${ajwt}`,
  //           },
  //         },
  //       );

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const data = await response.json();
  //       console.log('Data:', data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  //! сокет коннект //!
  useEffect(() => {
    const connect = () => {
      const socket = new SockJS(
        'http://chat.eu-central-1.elasticbeanstalk.com:5000/chat',
      );
      // const client = Stomp.over(socket); //!
      const client = Stomp.over(() => socket);

      // const headers = {
      //   Authorization: `Bearer ${ajwt}`,
      // }; //?!

      client.connect({}, () => {
        setStompClient(client);
        setConnected(true);
        console.log('Connected to WebSocket');
      });
      // client.connect(headers, () => {
      //   setStompClient(client);
      //   setConnected(true);
      //   console.log('Connected to WebSocket');
      // });
    };
    connect();

    return () => {
      if (stompClient) {
        stompClient.disconnect();
        console.log('Disconnected from WebSocket'); //!
        setConnected(false);
      }
    };
  }, []);

  //! підписки //!
  useEffect(() => {
    if (!stompClient) return;

    let subscribtionToError;
    let subscriptionToNotify;
    let subscriptionToHistory;
    let subscriptionToTopic;
    const subToTopicDest = '/topic/';
    const getTopicHistoryDest = '/app/history/topic/';

    const subscribeToError = () =>
      (subscribtionToError = stompClient.subscribe(
        '/user/specific/error',
        (message) => {
          console.log(
            'Received message from subscribeToError:',
            JSON.parse(message.body),
          );
        },
      ));

    subscribeToError();

    const subscribeToNotify = () =>
      (subscriptionToNotify = stompClient.subscribe(
        '/user/specific/notify/' + '4',
        (message) => {
          console.log(
            'Received message from subscribeToNotify:',
            JSON.parse(message.body),
          );
          // let parseMessage = JSON.parse(messages.body);

          // parseMessage.forEach((message) => showMessage(message));
        },
      ));

    subscribeToNotify();

    const subscribeToMessageHistory = () =>
      (subscriptionToHistory = stompClient.subscribe(
        '/user' + subToTopicDest + '4',
        (message) => {
          console.log(
            'Received message from subscribeToMessageHistory:',
            JSON.parse(message.body),
          );
          setMessages((prevMessages) => [
            ...prevMessages,
            JSON.parse(message.body),
          ]);

          // let parseMessage = JSON.parse(messages.body);

          // parseMessage.forEach((message) => showMessage(message));
        },
      ));

    subscribeToMessageHistory();

    // const showMessage = (message) => {
    //   let response = document.getElementById('messages');
    //   response.innerText += '>>> ' + JSON.stringify(message) + '\n';
    // };

    const subscribeToTopic = () => {
      // subscribeToMessageHistory();

      subscriptionToTopic = stompClient.subscribe(
        `${subToTopicDest}4`,
        (message) => {
          console.log(
            'Received message from subscribeToTopic:',
            JSON.parse(message.body),
          );
          setMessages((prevMessages) => [
            ...prevMessages,
            JSON.parse(message.body),
          ]);
        },
      );
    };

    subscribeToTopic();

    const getTopicHistory = () => {
      stompClient.send(
        getTopicHistoryDest + '4',
        {},
        JSON.stringify({ page: 0, pageSize: 5 }),
      );
    };

    getTopicHistory();

    return () => {
      subscribtionToError.unsubscribe();
      subscriptionToNotify.unsubscribe();
      subscriptionToHistory.unsubscribe();
      subscriptionToTopic.unsubscribe();
    };
  }, [stompClient]);

  const handleMessageSend = () => {
    // if (!stompClient || !connected || !inputMessage.trim()) return; //!

    stompClient.send(
      '/app/topic/public/' + '4',
      {},
      JSON.stringify({ content: inputMessage }),
    );

    setInputMessage('');
    console.log('inputMessage', JSON.stringify({ content: inputMessage }));
    console.log('messages', messages);
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
    </div>
  );
};

export default ChatRoom;
