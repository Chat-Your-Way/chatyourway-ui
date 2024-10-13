import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { BASE_URL } from './apiParams';

const whenStateArrLengthMore = (stateArr, actionPayloadArray) => {
  return stateArr.reduce((acuum, el) => {
    if (actionPayloadArray.find((payloadEl) => payloadEl.id === el.id)) {
      return [
        ...acuum,
        actionPayloadArray.find((payloadEl) => payloadEl.id === el.id),
      ];
    } else {
      return [...acuum, el];
    }
  }, []);
};

const handleAllNotificationsArray = (stateArr, actionPayloadArray) => {
  if (!stateArr.length) {
    return [...actionPayloadArray.filter((el) => el.unreadMessageCount !== 0)];
  } else if (stateArr.length >= actionPayloadArray.length) {
    return whenStateArrLengthMore(
      stateArr,
      actionPayloadArray.filter((el) => el.unreadMessageCount !== 0),
    );
  } else {
    return actionPayloadArray
      .filter((el) => el.unreadMessageCount !== 0)
      .reduce((acuum, el) => {
        if (stateArr.find((stateEl) => stateEl.id === el.id)) {
          return [
            ...acuum,
            actionPayloadArray.find((payloadEl) => payloadEl.id === el.id),
          ];
        } else {
          return [...acuum, el];
        }
      }, []);
  }
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    notificationsAllTopics: [],
    notificationsAllTopicsStatus: '',
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
    usersStatusOnlineTyping: [],
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
      if (!state.notificationsAllTopics.length) {
        state.notificationsAllTopics = [...action.payload];
      } else if (state.notificationsAllTopics.length >= action.payload.length) {
        state.notificationsAllTopics = whenStateArrLengthMore(
          state.notificationsAllTopics,
          action.payload,
        );
      } else {
        state.notificationsAllTopics = action.payload.reduce((acuum, el) => {
          if (action.payload.find((payloadEl) => payloadEl.id === el.id)) {
            return [
              ...acuum,
              action.payload.find((payloadEl) => payloadEl.id === el.id),
            ];
          } else {
            return [...acuum, el];
          }
        }, []);
      }
    },
    setAllTopicsNotificationsWS: (state, action) => {
      if (!state.notificationsAllTopics.length) {
        state.notificationsAllTopics = [...action.payload];
      } else {
        state.notificationsAllTopics = whenStateArrLengthMore(
          state.notificationsAllTopics,
          action.payload,
        );
      }
    },
    clearAllTopicsNotifications: (state) => {
      state.notificationsAllTopics = [];
    },

    deletReadedAllTopicsNotification: (state, action) => {
      state.notificationsAllTopics = state.notificationsAllTopics.filter(
        (el) => el.lastMessage.id !== action.payload,
      );
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
      state.notifications.push(action.payload);
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
    setUsersStatusOnlineTyping: (state, action) => {
      if (!state.usersStatusOnlineTyping.length) {
        state.usersStatusOnlineTyping = [
          ...state.usersStatusOnlineTyping,
          action.payload,
        ];
      } else {
        state.usersStatusOnlineTyping = state.usersStatusOnlineTyping.map(
          (el) => {
            if (el.id === action.payload.id) {
              return action.payload;
            } else return el;
          },
        );
      }
    },
    clearUsersStatusOnlineTyping: (state) => {
      state.usersStatusOnlineTyping = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNotificationsAllTopics.pending, (state) => {
        state.notificationsAllTopicsStatus = 'pending';
      })
      .addCase(fetchNotificationsAllTopics.fulfilled, (state, action) => {
        // if (action.payload.httpStatus === 'UNAUTHORIZED') {
        //   return {
        //     ...state,
        //     notificationsAllTopics: [],
        //     notificationsAllTopicsStatus: 'UNAUTHORIZED',
        //   };
        // }

        // state.notificationsAllTopics = [
        //   ...state.notificationsAllTopics,
        //   ...action.payload.filter(el => el.unreadMessageCount !== 0),
        // ];
        state.notificationsAllTopics = handleAllNotificationsArray(
          state.notificationsAllTopics,
          action.payload,
        );

        // if (!state.notificationsAllTopics.length) {
        //   state.notificationsAllTopics = [
        //     ...action.payload.filter(el => el.unreadMessageCount !== 0),
        //   ];
        // } else if (state.notificationsAllTopics.length >= action.payload.length) {
        //   state.notificationsAllTopics = whenStateArrLengthMore(
        //     state.notificationsAllTopics,
        //     action.payload.filter(el => el.unreadMessageCount !== 0)
        //   );
        // } else {
        //   state.notificationsAllTopics = action.payload
        //     .filter(el => el.unreadMessageCount !== 0)
        //     .reduce((acuum, el) => {
        //       if (action.payload.find(payloadEl => payloadEl.id === el.id)) {
        //         return [...acuum, action.payload.find(payloadEl => payloadEl.id === el.id)];
        //       } else {
        //         return [...acuum, el];
        //       }
        //     }, []);
        // }

        state.notificationsAllTopicsStatus = 'successfull';
      })
      .addCase(fetchNotificationsAllTopics.rejected, (state, action) => {
        state.notificationsAllTopics = [];
        state.notificationsAllTopicsStatus = action.error;
      })
      .addCase(fetchNotificationsPrivateTopics.pending, (state) => {
        state.notificationsAllTopicsStatus = 'pending';
      })
      .addCase(fetchNotificationsPrivateTopics.fulfilled, (state, action) => {
        // if (action.payload.httpStatus === 'UNAUTHORIZED') {
        //   return {
        //     ...state,
        //     notificationsAllTopics: [],
        //     notificationsAllTopicsStatus: 'UNAUTHORIZED',
        //   };
        // }

        // state.notificationsAllTopics = [
        //   ...state.notificationsAllTopics,
        //   ...action.payload.filter(el => el.unreadMessageCount !== 0),
        // ];

        state.notificationsAllTopics = handleAllNotificationsArray(
          state.notificationsAllTopics,
          action.payload,
        );

        // if (!state.notificationsAllTopics.length) {
        //   state.notificationsAllTopics = [
        //     ...action.payload.filter(el => el.unreadMessageCount !== 0),
        //   ];
        // } else if (state.notificationsAllTopics.length >= action.payload.length) {
        //   state.notificationsAllTopics = whenStateArrLengthMore(
        //     state.notificationsAllTopics,
        //     action.payload.filter(el => el.unreadMessageCount !== 0)
        //   );
        // } else {
        //   state.notificationsAllTopics = action.payload
        //     .filter(el => el.unreadMessageCount !== 0)
        //     .reduce((acuum, el) => {
        //       if (action.payload.find(payloadEl => payloadEl.id === el.id)) {
        //         return [...acuum, action.payload.find(payloadEl => payloadEl.id === el.id)];
        //       } else {
        //         return [...acuum, el];
        //       }
        //     }, []);
        // }

        state.notificationsAllTopicsStatus = 'successfull';
      })
      .addCase(fetchNotificationsPrivateTopics.rejected, (state, action) => {
        state.notificationsAllTopics = [];
        state.notificationsAllTopicsStatus = action.error;
      });
  },
});

export const {
  setSubscribedAllTopicsNotify,
  setSubscriptionAllTopicsNotify,
  clearSubscriptionAllTopicsNotify,
  setAllTopicsNotifications,
  clearAllTopicsNotifications,
  setAllTopicsNotificationsWS,
  deletReadedAllTopicsNotification,
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
  setUsersStatusOnlineTyping,
  clearUsersStatusOnlineTyping,
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

export const selectUsersStatusOnlineTyping = createSelector(
  selectChatState,
  (chat) => chat.usersStatusOnlineTyping,
);

export const fetchNotificationsAllTopics = createAsyncThunk(
  'fetchNotificationsAll',
  async (accessTokenInStore) => {
    const response = await fetch(`${BASE_URL}/topics/all`, {
      headers: {
        Authorization: `Bearer ${accessTokenInStore}`,
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => result);

    return response;
  },
);

export const fetchNotificationsPrivateTopics = createAsyncThunk(
  'fetchNotificationsPrivate',
  async (accessTokenInStore) => {
    const response = await fetch(`${BASE_URL}/topics/private`, {
      headers: {
        Authorization: `Bearer ${accessTokenInStore}`,
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => result);

    return response;
  },
);
