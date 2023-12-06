import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice = createSlice({
  name: 'currentUser',
  initialState: {
    avatarId: '',
    email: '',
    hasPermissionSendingPrivateMessage: '',
    nickname: '',
  },

  reducers: {
    setUserInfo(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice;

export const getUserInfo = (state) => state.currentUser;
