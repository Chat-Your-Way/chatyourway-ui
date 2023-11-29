import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, Referer, ajwt } from './apiParams';

const topicsApi = createApi({
  tagTypes: ['Topics'],
  reducerPath: 'topicsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    createNewTopic: builder.mutation({
      query: (payload) => ({
        url: '/topics/create',
        method: 'POST',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ajwt}`,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ['Topics'],
    }),
  }),
});

export const { useCreateNewTopicMutation } = topicsApi;

export default topicsApi;
