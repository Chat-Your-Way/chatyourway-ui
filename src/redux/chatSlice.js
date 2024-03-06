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
    },
    setHistoryMessages: (state, action) => {
      state.historyMessages = action.payload;
    },
    setNewMessage: (state, action) => {
      state.newMessage = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setStompClient: (state, action) => {
      state.stompClient = action.payload;
    },
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setSubscription: (state, action) => {
      state.subscriptions.push(action.payload);
    },
    clearSubscriptions: (state) => {
      //   state.subscriptions.forEach((subscription) => {
      //     subscription.unsubscribe();
      //   });
      state.subscriptions = [];
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
