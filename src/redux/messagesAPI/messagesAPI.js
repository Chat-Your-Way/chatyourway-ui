import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, Referer } from '../apiParams';

export const messagesAPI = createApi({
  reducerPath: 'messagesSlice',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  tagTypes: ['messages'],
  endpoints: (builder) => ({
    getMessagesByTopic: builder.query({
      query: ({ topicId, accessTokenInStore }) => ({
        url: `messages/topic/${topicId}`,
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessTokenInStore}`,
        },
      }),
      providesTags: ['messages'],
    }),
    sendMessageToTopic: builder.mutation({
      query: ({ topicId, inputMessage, accessTokenInStore }) => ({
        url: `/messages/topic/${topicId}`,
        method: 'POST',
        body: JSON.stringify({ content: inputMessage }),
        headers: {
          Authorization: `Bearer ${accessTokenInStore}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['messages'],
    }),
    sendMessageToNewTopic: builder.mutation({
      query: ({ userEmail, accessTokenInStore, inputMessage }) => ({
        url: `/messages/private/${userEmail}`,
        method: 'POST',
        body: JSON.stringify({ content: inputMessage }),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessTokenInStore}`,
        },
      }),
      invalidatesTags: ['messages'],
    }),
  }),
});

export const {
  useGetMessagesByTopicQuery,
  useSendMessageToTopicMutation,
  useSendMessageToNewTopicMutation,
} = messagesAPI;
