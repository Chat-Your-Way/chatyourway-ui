import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import authenticationApi from './auth-operations';
import topicsApi from './topics-operations';
import userApi from './user-operations';
import userInfoSlice from './userSlice';
import chatSlice from './chatSlice';
import modalSlice from './modalSlice';
import authOperationsThunk from './authOperationsToolkit/authOperationsThunkSlice';
import messagesAPI from './messagesAPI/messagesAPI';

const store = configureStore({
  reducer: {
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [topicsApi.reducerPath]: topicsApi.reducer,

    [userApi.reducerPath]: userApi.reducer,
    [userInfoSlice.name]: userInfoSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [authOperationsThunk.name]: authOperationsThunk.reducer,
    [messagesAPI.reducerPath]: messagesAPI.reducer,
    [modalSlice.name]: modalSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authenticationApi.middleware)
      .concat(topicsApi.middleware)
      .concat(userApi.middleware)
      .concat(messagesAPI.middleware),
});

export default store;

setupListeners(store.dispatch);
