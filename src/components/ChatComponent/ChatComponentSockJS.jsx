// import { useState, useEffect } from 'react';
// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';

// const ChatComponent = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [connected, setConnected] = useState(false);
//   const [stompClient, setStompClient] = useState(null);

//   useEffect(() => {
//     const socket = new SockJS(
//       'http://chat.eu-central-1.elasticbeanstalk.com:5000/chat',
//     );
//     const client = Stomp.over(socket);

//     client.connect({}, () => {
//       setStompClient(client);
//       setConnected(true);
//       console.log('Connected to WebSocket');
//     });

//     return () => {
//       if (stompClient) {
//         stompClient.disconnect();
//         console.log('Disconnected from WebSocket');
//         setConnected(false);
//       }
//     };
//   }, []);

//   const handleMessageSend = () => {
//     if (!stompClient || !connected || !inputMessage.trim()) return;
//     stompClient.send(
//       '/app/message',
//       {},
//       JSON.stringify({ text: inputMessage }),
//     );
//     setInputMessage('');
//   };

//   const handleInputChange = (e) => {
//     setInputMessage(e.target.value);
//   };

//   useEffect(() => {
//     if (!stompClient) return;

//     const subscription = stompClient.subscribe('/topic/messages', (message) => {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         JSON.parse(message.body),
//       ]);
//     });

//     return () => subscription.unsubscribe();
//   }, [stompClient]);

//   return (
//     <div>
//       <h1>Chat Room</h1>
//       <div style={{ height: '300px', overflowY: 'scroll' }}>
//         {messages.map((message, index) => (
//           <div key={index}>{message.text}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         placeholder="Type your message..."
//         value={inputMessage}
//         onChange={handleInputChange}
//       />
//       <button onClick={handleMessageSend}>Send</button>
//       {!connected && <div>Connecting to chat...</div>}
//     </div>
//   );
// };

// export default ChatComponent;
