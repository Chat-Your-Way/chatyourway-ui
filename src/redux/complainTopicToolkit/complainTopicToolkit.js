import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL, Referer } from '../apiParams';

const complainTopicThunk = createSlice({
  name: 'complainTopic',
  initialState: {
    status: 'idle',
    isError: null,
    isLoading: false,
    result: null,
  },
  reducers: {
    complainStatusChange: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(complainTopic.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(complainTopic.fulfilled, (state, action) => {
        state.status = 'success';
        state.isError = false;
        state.isLoading = false;
        state.result = action.payload;
      })
      .addCase(complainTopic.rejected, (state, action) => {
        state.status = 'error';
        state.isLoading = false;
        state.isError = true;
        state.result = action.payload;
      });
  },
});

export default complainTopicThunk;

export const complainTopic = createAsyncThunk(
  'complainTopic',
  async (topicId, thunkApi) => {
    const state = thunkApi.getState();
    const accessToken = state.auth.accessToken;
    try {
      const complainResult = await fetch(
        `${BASE_URL}/topics/${topicId}/complain`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            Referer: Referer,
          },
        },
      )
        .then((response) => {
          return response;
        })
        .then((data) => data);

      return complainResult;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const { complainStatusChange } = complainTopicThunk.actions;
