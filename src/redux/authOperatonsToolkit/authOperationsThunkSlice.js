import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../apiParams';

const authOperationsThunk = createSlice({
  name: 'authenticationApiToolkit',
  initialState: {
    status: 'idle',
    isLoggedIn: null,
  },
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(refreshTokenThunk.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        if (action.payload.httpStatus === 'UNAUTHORIZED') {
          return { ...state, status: 'rejected' };
        }
        state.status = 'success';
        state.isLoggedIn = true;
      })
      .addCase(refreshTokenThunk.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { setAccessToken, setRefreshToken, setIsLoggedIn } =
  authOperationsThunk.actions;

export default authOperationsThunk;

export const refreshTokenThunk = createAsyncThunk(
  'refreshTokenThunk',
  async () => {
    const result = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => data);
    // console.log(result);
    return result;
  },
);
