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
  extraReducers: (builder) => {
    builder
      .addCase(complainTopic.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(complainTopic.fulfilled, (state) => {
        state.status = 'success';
        // state.result = action.payload;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(complainTopic.rejected, (state) => {
        state.status = 'error';
        // state.result = action.payload;
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default complainTopicThunk;

export const complainTopic = createAsyncThunk(
  'complainTopic',
  async (topicId, thunkApi) => {
    try {
      const complainResult = await fetch(
        `${BASE_URL}/topics/${topicId}/complain`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
            Referer: Referer,
          },
        },
      )
        .then((response) => response.json())
        .then((data) => data);

      return complainResult;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
