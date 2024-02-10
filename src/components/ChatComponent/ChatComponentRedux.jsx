// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   connectSocket,
//   disconnectSocket,
//   receiveMessage,
//   sendMessage,
// } from '../../redux/chatSlice';

// const ChatComponent = () => {
//   const dispatch = useDispatch();
//   const { connected, messages } = useSelector((state) => state.chat);

//   useEffect(() => {
//     // Запуск сокету при рендері компонента
//     dispatch(connectSocket());
//     // dispatch(connectSocketSuccess());

//     // Відключення сокету при розмонтуванні компонента
//     return () => {
//       console.log('UNMOUNT');
//       dispatch(disconnectSocket());
//       // dispatch(disconnectSocketSuccess());
//     };
//   }, [dispatch]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const message = event.target.elements.message.value;
//     // Відправка повідомлення через редакс
//     dispatch(sendMessage());
//     dispatch(receiveMessage({ text: message }));
//     event.target.elements.message.value = '';
//   };

//   return (
//     <div>
//       <h2>{connected ? 'Connected' : 'Disconnected'}</h2>
//       <ul>
//         {messages &&
//           messages.map((message, index) => <li key={index}>{message.text}</li>)}
//       </ul>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="message" />
//         <button>Send</button>
//       </form>
//     </div>
//   );
// };

// export default ChatComponent;
