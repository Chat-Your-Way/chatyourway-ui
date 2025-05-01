import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../apiParams';

const loadTokensFromStorage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return {
    accessToken: accessToken || null,
    refreshToken: refreshToken || null,
    isLoggedIn: !!accessToken,
  };
};

const authOperationsThunk = createSlice({
  name: 'authenticationApiToolkit',
  initialState: {
    status: 'idle',
    isLoggedIn: loadTokensFromStorage().isLoggedIn,
    accessToken: loadTokensFromStorage().accessToken,
    refreshToken: loadTokensFromStorage().refreshToken,
  },
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
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

    return result;
  },
);
