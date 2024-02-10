// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';
// import { connectSocketSuccess, disconnectSocketSuccess } from './chatSlice';

// const socketMiddleware = (url, headers = {}) => {
//   const options = {
//     transports: ['websocket', 'xhr-polling'],
//   };
//   const socket = new SockJS(url, null, options);
//   let stompClient;

//   const connectSocket = (dispatch) => {
//     stompClient = Stomp.over(socket);

//     stompClient.connect(
//       headers,
//       () => {
//         console.log('Connected to WebSocket');
//         dispatch(connectSocketSuccess());
//       },
//       (error) => {
//         console.error('Error connecting to WebSocket:', error);
//       },
//     );
//   };

//   const disconnectSocket = (dispatch) => {
//     if (stompClient && stompClient.connected) {
//       stompClient.disconnect(() => {
//         console.log('Disconnected from WebSocket');
//         dispatch(disconnectSocketSuccess());
//       });
//     }
//   };

//   return (store) => (next) => (action) => {
//     const { dispatch } = store;
//     switch (action.type) {
//       case 'CONNECT_SOCKET':
//         connectSocket(dispatch);
//         break;
//       case 'DISCONNECT_SOCKET':
//         disconnectSocket(dispatch);
//         break;
//       case 'SEND_MESSAGE':
//         if (stompClient && stompClient.connected) {
//           stompClient.send('/app/message', {}, JSON.stringify(action.payload));
//         }
//         break;
//       default:
//         return next(action);
//     }
//   };
// };

// export default socketMiddleware;
