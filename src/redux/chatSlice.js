import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    historyMessages: [],
    newMessages: [],
    subscriptions: [],
    notifications: [],
    connected: false,
    subscribed: false,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = [...action.payload];
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setHistoryMessages: (state, action) => {
      state.historyMessages = [...action.payload];
    },
    clearHistoryMessages: (state) => {
      state.historyMessages = [];
    },
    setNewMessages: (state, action) => {
      state.newMessages = [...state.newMessages, ...action.payload];
    },
    clearNewMessages: (state) => {
      state.newMessages = [];
    },
    setNotifications: (state, action) => {
      state.notifications = [...action.payload];
    },
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setSubscribed: (state, action) => {
      state.subscribed = action.payload;
    },
    setSubscriptions: (state, action) => {
      state.subscriptions = [...state.subscriptions, action.payload];
    },
    clearSubscriptions: (state) => {
      state.subscriptions = [];
    },
  },
});

export const {
  setMessages,
  clearMessages,
  setHistoryMessages,
  clearHistoryMessages,
  setNewMessages,
  clearNewMessages,
  setNotifications,
  setStompClient,
  setConnected,
  setSubscribed,
  setSubscriptions,
  clearSubscriptions,
} = chatSlice.actions;

export default chatSlice;

export const selectChatState = (state) => state.chat;

export const selectMessages = createSelector(
  selectChatState,
  (chat) => chat.messages,
);

export const selectHistoryMessages = createSelector(
  selectChatState,
  (chat) => chat.historyMessages,
);

export const selectNewMessages = createSelector(
  selectChatState,
  (chat) => chat.newMessages,
);

export const selectNotifications = createSelector(
  selectChatState,
  (chat) => chat.notifications,
);

export const selectConnected = createSelector(
  selectChatState,
  (chat) => chat.connected,
);

export const selectSubscribed = createSelector(
  selectChatState,
  (chat) => chat.subscribed,
);

export const selectSubscriptions = createSelector(
  selectChatState,
  (chat) => chat.subscriptions,
);
