import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, Referer } from '../apiParams';

export const messagesAPI = createApi({
  reducerPath: 'messagesSlice',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  tagTypes: ['messages'],
  endpoints: (builder) => ({
    getMessagesByTopic: builder.query({
      query: ({
        topicId,
        accessTokenInStore,
        currentPage = '',
        sizeOfMessages = '',
      }) => ({
        //  url: `messages/topic/${topicId}?page=${totalPagesPublicTopic}&size=${sizeOfMessages}`.
        url:
          currentPage && sizeOfMessages
            ? `messages/topic/${topicId}?page=${currentPage}&size=${sizeOfMessages}`
            : `messages/topic/${topicId}`,
        // url: () =>
        //   totalPagesPublicTopic && sizeOfMessages
        //     ? `messages/topic/${topicId}?page=${totalPagesPublicTopic}&size=${sizeOfMessages}`
        //     : `messages/topic/${topicId}`,
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
    setMessageStatus: builder.mutation({
      query: ({ messageId, accessTokenInStore }) => ({
        url: `/messages/${messageId}/read`,
        method: 'POST',
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
  useSetMessageStatusMutation,
} = messagesAPI;
