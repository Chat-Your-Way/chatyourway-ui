import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    notificationsAllTopics: [],
    subscribedAllTopicsNotify: false,
    subscriptionAllTopicsNotify: [],
    messages: [],
    historyMessages: [],
    newMessages: [],
    subscriptions: [],
    notifications: [],
    connected: false,
    subscribed: false,
    chatOpened: false,
    contactsOpened: false,
  },
  reducers: {
    setSubscribedAllTopicsNotify: (state, action) => {
      state.subscribedAllTopicsNotify = action.payload;
    },
    setSubscriptionAllTopicsNotify: (state, action) => {
      state.subscriptionAllTopicsNotify = [action.payload];
    },
    clearSubscriptionAllTopicsNotify: (state) => {
      state.subscriptionAllTopicsNotify = [];
    },
    setAllTopicsNotifications: (state, action) => {
      state.notificationsAllTopics = [...action.payload];
    },
    clearAllTopicsNotifications: (state) => {
      state.notificationsAllTopics = [];
    },
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
    clearNotifications: (state) => {
      state.notifications = [];
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
    toggleChatOpened: (state) => {
      state.chatOpened = !state.chatOpened;
    },
    toggleContactsOpened: (state) => {
      state.contactsOpened = !state.contactsOpened;
    },
    setChatOpened: (state, action) => {
      state.chatOpened = action.payload;
    },
  },
});

export const {
  setSubscribedAllTopicsNotify,
  setSubscriptionAllTopicsNotify,
  clearSubscriptionAllTopicsNotify,
  setAllTopicsNotifications,
  clearAllTopicsNotifications,
  setMessages,
  clearMessages,
  setHistoryMessages,
  clearHistoryMessages,
  setNewMessages,
  clearNewMessages,
  setNotifications,
  clearNotifications,
  setConnected,
  setSubscribed,
  setSubscriptions,
  clearSubscriptions,
  toggleChatOpened,
  toggleContactsOpened,
  setChatOpened,
} = chatSlice.actions;

export default chatSlice;

export const selectChatState = (state) => state.chat;

export const selectAllTopicsNotifications = createSelector(
  selectChatState,
  (chat) => chat.notificationsAllTopics,
);

export const selectSubscribedAllTopicsNotify = createSelector(
  selectChatState,
  (chat) => chat.subscribedAllTopicsNotify,
);

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

export const selectChatOpened = createSelector(
  selectChatState,
  (chat) => chat.chatOpened,
);

export const selectContactsOpened = createSelector(
  selectChatState,
  (chat) => chat.contactsOpened,
);

export const selectTotalPagesInStore = createSelector(
  selectChatState,
  (chat) => chat.totalPagesInStore,
);

export const selectCurrentPageInStore = createSelector(
  selectChatState,
  (chat) => chat.currentPageInStore,
);

export const selectSizeOfMessagesInStore = createSelector(
  selectChatState,
  (chat) => chat.sizeOfMessagesInStore,
);
