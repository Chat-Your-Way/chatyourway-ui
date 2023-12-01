import { configureStore } from '@reduxjs/toolkit';
import authenticationApi from './auth-operations';
import topicsApi from './topics-operations';

const store = configureStore({
  reducer: {
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [topicsApi.reducerPath]: topicsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authenticationApi.middleware)
      .concat(topicsApi.middleware),
});

export default store;
