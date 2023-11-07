import { configureStore } from '@reduxjs/toolkit';
import authenticationApi from './auth-operations';

const store = configureStore({
  reducer: {
    [authenticationApi.reducerPath]: authenticationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authenticationApi.middleware),
});

export default store;
