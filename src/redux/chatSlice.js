import { createSlice } from '@reduxjs/toolkit';
// import { createSelector } from 'reselect';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    historyMessages: [],
    newMessage: [],
    notifications: [],
    connected: false,
    subscripted: false,
    subscriptions: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = [...state.messages, ...action.payload];
    },
    clearMessages: (state) => {
      state.messages = [];
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
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setSubscripted: (state, action) => {
      state.subscripted = action.payload;
    },
    setSubscriptions: (state, action) => {
      state.subscriptions.push(action.payload);
    },
    clearSubscriptions: (state) => {
      // state.subscriptions.forEach(({ subscription }) => {
      //   subscription.unsubscribe();
      // });

      state.subscriptions = [];
    },
  },
});

export const {
  setMessages,
  clearMessages,
  setHistoryMessages,
  setNewMessage,
  setNotifications,
  setStompClient,
  setConnected,
  setSubscripted,
  setSubscriptions,
  clearSubscriptions,
} = chatSlice.actions;

export default chatSlice;

// export const selectChatState = (state) => state.chat;

// export const selectMessages = createSelector(
//   selectChatState,
//   (chat) => chat.messages,
// );

// export const selectHistoryMessages = createSelector(
//   selectChatState,
//   (chat) => chat.historyMessages,
// );

// export const selectNewMessage = createSelector(
//   selectChatState,
//   (chat) => chat.newMessage,
// );

// export const selectNotifications = createSelector(
//   selectChatState,
//   (chat) => chat.notifications,
// );

// export const selectConnected = createSelector(
//   selectChatState,
//   (chat) => chat.connected,
// );

// export const selectSubscripted = createSelector(
//   selectChatState,
//   (chat) => chat.subscripted,
// );

// export const selectSubscriptions = createSelector(
//   selectChatState,
//   (chat) => chat.subscriptions,
// );

export const getMessages = (state) => state.chat.messages;
export const getHistoryMessages = (state) => state.chat.historyMessages;
export const getNewMessage = (state) => state.chat.newMessage;
export const getNotifications = (state) => state.chat.notifications;
export const getConnected = (state) => state.chat.connected;
export const getSubscripted = (state) => state.chat.subscripted;
export const getSubscriptions = (state) => state.chat.subscriptions;
