import { configureStore } from '@reduxjs/toolkit';
import authenticationApi from './auth-operations';
import topicsApi from './topics-operations';
import userApi from './user-operations';
import userInfoSlice from './userSlice';
// import chatReducer from './chatSlice'; //!
// import socketMiddleware from './socketMiddleware'; //!
// import startListening from './createStompMiddleware'; //!

// const getAccessToken = () => localStorage.getItem('accessToken'); //!

// const url = 'http://chat.eu-central-1.elasticbeanstalk.com:5000/chat';
//!
// {
//   Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : '',
// },

const store = configureStore({
  reducer: {
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [topicsApi.reducerPath]: topicsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [userInfoSlice.name]: userInfoSlice.reducer,
    // chat: chatReducer, //!
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authenticationApi.middleware)
      .concat(topicsApi.middleware)
      .concat(userApi.middleware),
  // .concat(socketMiddleware(url)), //!
});

export default store;
