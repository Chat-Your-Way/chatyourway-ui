import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL, Referer } from './apiParams';

export const sendEmailRestorePassword = createAsyncThunk(
  'user/sendEmailRestorePassword',
  async (email, thunkAPI) => {
    try {
      const result = await fetch(`${BASE_URL}/change/password/email`, {
        method: 'POST',
        headers: {
          Referer: Referer,
          'Content-type': 'application/json',
        },
        body: email,
      })
        .then((response) => response.json())
        .then((result) => result);

      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const userInfoSlice = createSlice({
  name: 'currentUser',
  initialState: {
    contactId: '',
    avatarId: '',
    email: '',
    hasPermissionSendingPrivateMessage: '',
    nickname: '',
  },

  reducers: {
    setUserInfo(state, action) {
      return { ...state, ...action.payload, contactId: action.payload.id };
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice;

export const selectUserInfo = (state) => state.currentUser;
