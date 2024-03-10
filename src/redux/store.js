import { configureStore } from '@reduxjs/toolkit';
import authenticationApi from './auth-operations';
import topicsApi from './topics-operations';
import userApi from './user-operations';
import userInfoSlice from './userSlice';
import chatSlice from './chatSlice';

const store = configureStore({
  reducer: {
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [topicsApi.reducerPath]: topicsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [userInfoSlice.name]: userInfoSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authenticationApi.middleware)
      .concat(topicsApi.middleware)
      .concat(userApi.middleware),
});

export default store;
