// import { useEffect } from 'react';
// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';
// import { useSelector, useDispatch } from 'react-redux';
// import { receiveMessage } from '../../redux/chatSlice';

// const ChatComponent = () => {
//   const dispatch = useDispatch();
//   const messages = useSelector((state) => state.chat.messages);

//   useEffect(() => {
//     // const socket = new SockJS('https://echo.websocket.org/.ws'); //!
//     const options = {
//       transports: ['websocket', 'xhr-polling'], // додайте 'websocket' у список
//     };
//     const socket = new SockJS(
//       'http://chat.eu-central-1.elasticbeanstalk.com:5000/chat',
//       null,
//       options,
//     );
//     // const socket = new SockJS(
//     //   'ws://chat.eu-central-1.elasticbeanstalk.com:5000/chat',
//     // ); //?
//     const token = localStorage.getItem('accessToken'); // Отримання токена JWT

//     console.log('token', token); //!

//     const stompClient = Stomp.over(() => socket, {
//       webSocketFactory: () => new WebSocket(socket.url, ['Bearer', token]), //!
//     });
//     // const stompClient = Stomp.over(() => socket);

//     const subToTopicDest =
//       'http://chat.eu-central-1.elasticbeanstalk.com:5000/topic/';
//     const subToError =
//       'http://chat.eu-central-1.elasticbeanstalk.com:5000/user/specific/error';

//     stompClient.connect({}, (frame) => {
//       console.log('Connected: ' + frame);
//       subscribeToError();

//       const subscribeToTopic = () => {
//         stompClient.subscribe(subToTopicDest, (messages) => {
//           const message = JSON.parse(messages.body);
//           dispatch(receiveMessage(message)); // Redux action
//         });
//       };

//       const subscribeToError = () => {
//         stompClient.subscribe(subToError, (messages) => {
//           const errorMessage = JSON.parse(messages.body);
//           console.log(errorMessage);
//           // Handle error message
//         });
//       };

//       subscribeToTopic();
//       subscribeToError();
//     });

//     return () => {
//       stompClient.disconnect();
//     };
//   }, [dispatch]);

//   return (
//     <div>
//       <h1>Chat Component</h1>
//       <ul>
//         {messages.map((message, index) => (
//           <li key={index}>{message.text}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ChatComponent;
