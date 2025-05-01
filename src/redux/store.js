import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import authenticationApi from './auth-operations';
import topicsApi from './topics-operations';
import userApi from './user-operations';
import userInfoSlice from './userSlice';
import chatSlice from './chatSlice';
import modalSlice from './modalSlice';
import authOperationsThunk from './authOperationsToolkit/authOperationsThunkSlice';
import messagesAPI from './messagesAPI/messagesAPI';
import complainTopicThunk from './complainTopicToolkit/complainTopicToolkit';

const authPersistConfig = {
  key: 'authOperationsThunk',
  storage,
  whitelist: ['accessToken', 'refreshToken'],
};

const chatPersistConfig = {
  key: 'chat',
  storage,
  // whitelist: [
  //   'typingStatus',
  //   'notificationsAllTopics',
  //   'notificationsAllTopicsStatus',
  //   'subscribedAllTopicsNotify',
  //   'subscriptionAllTopicsNotify',
  //   'messages',
  //   'historyMessages',
  //   'newMessages',
  //   'subscriptions',
  //   'notifications',
  //   'connected',
  //   'subscribed',
  //   'chatOpened',
  //   'contactsOpened',
  //   'onlineContacts',
  //   'onlineContactsStatus',
  // ], // укажи, что нужно сохранять
  blacklist: [
    //   'typingStatus',
    'connected',
    //   'subscribed',
    //   'chatOpened',
    //   'contactsOpened',
    //   'onlineContacts',
    //   'onlineContactsStatus',
  ],
};

const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authOperationsThunk.reducer,
);
const persistedChatReducer = persistReducer(
  chatPersistConfig,
  chatSlice.reducer,
);

const store = configureStore({
  reducer: {
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [topicsApi.reducerPath]: topicsApi.reducer,

    [userApi.reducerPath]: userApi.reducer,
    [userInfoSlice.name]: userInfoSlice.reducer,
    [chatSlice.name]: persistedChatReducer,
    [authOperationsThunk.name]: persistedAuthReducer,
    [messagesAPI.reducerPath]: messagesAPI.reducer,
    [modalSlice.name]: modalSlice.reducer,
    [complainTopicThunk.name]: complainTopicThunk.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['/home/topics'], // add paths to ignore
      },
    })
      .concat(authenticationApi.middleware)
      .concat(topicsApi.middleware)
      .concat(userApi.middleware)
      .concat(messagesAPI.middleware),
});

const persistor = persistStore(store);

export { store, persistor };

setupListeners(store.dispatch);
