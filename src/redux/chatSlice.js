// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   connected: false,
//   messages: [],
// };

// const chatSlice = createSlice({
//   name: 'chat',
//   initialState,
//   reducers: {
//     connectSocket() {
//       console.log('CONNECT_SOCKET');
//       return { type: 'CONNECT_SOCKET' };
//     },
//     disconnectSocket() {
//       console.log('DISCONNECT_SOCKET');

//       return { type: 'DISCONNECT_SOCKET' };
//     },
//     sendMessage() {
//       console.log('SEND_MESSAGE');

//       return { type: 'SEND_MESSAGE' };
//     },
//     connectSocketSuccess(state) {
//       state.connected = true;
//     },
//     disconnectSocketSuccess(state) {
//       state.connected = false;
//     },
//     receiveMessage(state, action) {
//       state.messages.push(action.payload);
//     },
//   },
// });

// export const {
//   connectSocket,
//   disconnectSocket,
//   sendMessage,
//   connectSocketSuccess,
//   disconnectSocketSuccess,
//   receiveMessage,
// } = chatSlice.actions;

// export default chatSlice.reducer;
