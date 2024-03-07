import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    historyMessages: [],
    newMessage: [],
    notifications: [],
    // stompClient: null,
    connected: false,
    subscriptions: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = [...state.messages, ...action.payload];
      console.log('state.messages', state.messages); //!
    },
    setHistoryMessages: (state, action) => {
      state.historyMessages = action.payload;
      console.log('state.historyMessages', state.historyMessages); //!
    },
    setNewMessage: (state, action) => {
      state.newMessage = action.payload;
      console.log('state.newMessage', state.newMessage); //!
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
      console.log('state.notifications', state.notifications); //!
    },
    // setStompClient: (state, action) => {
    //   state.stompClient = action.payload;
    //   console.log('state.stompClient', state.stompClient); //!
    // },
    setConnected: (state, action) => {
      state.connected = action.payload;
      console.log('state.connected', state.connected); //!
    },
    setSubscription: (state, action) => {
      state.subscriptions.push(action.payload);
      console.log('state.subscriptions setSubscription', state.subscriptions); //!
    },
    clearSubscriptions: (state) => {
      //   state.subscriptions.forEach((subscription) => {
      //     subscription.unsubscribe();
      //   });
      state.subscriptions = [];
      console.log(
        'state.subscriptions clearSubscriptions',
        state.subscriptions,
      ); //!
    },
  },
});

export const {
  setMessages,
  setHistoryMessages,
  setNewMessage,
  setNotifications,
  setStompClient,
  setConnected,
  setSubscription,
  clearSubscriptions,
} = chatSlice.actions;

export default chatSlice;
// export default chatSlice.reducer;

export const getMessages = (state) => state.messages;
export const getHistoryMessages = (state) => state.historyMessages;
export const getNewMessage = (state) => state.newMessage;
export const getNotifications = (state) => state.notifications;
export const getStompClient = (state) => state.stompClient;
export const getConnected = (state) => state.connected;
