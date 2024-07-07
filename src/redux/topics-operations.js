import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, Referer } from './apiParams';

const topicsApi = createApi({
  reducerPath: 'topicsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Topics'],
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (body) => ({
        url: '/topics/create',
        method: 'POST',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(body),
      }),
      invalidatesTags: ['Topics'],
    }),

    getAll: builder.query({
      query: ({ filter = 'all', accessTokenInStore }) => ({
        url: `/topics/${filter}`,
        method: 'GET',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          Authorization: `Bearer ${accessTokenInStore}`,
        },
      }),
      providesTags: ['Topics'],
    }),

    addFavourite: builder.mutation({
      query: (id) => ({
        url: `/topics/${id}/favourite/add`,
        method: 'PATCH',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['Topics'],
    }),

    removeFavourite: builder.mutation({
      query: (id) => ({
        url: `/topics/${id}/favourite/remove`,
        method: 'PATCH',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['Topics'],
    }),

    getById: builder.query({
      query: ({ topicId, accessTokenInStore }) => ({
        url: `/topics/${topicId}`,
        method: 'GET',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessTokenInStore}`,
        },
      }),
      providesTags: ['Topics'],
    }),

    subscribe: builder.mutation({
      query: ({ topicId, accessTokenInStore }) => ({
        url: `/topics/subscribe/${topicId}`,
        method: 'POST',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessTokenInStore}`,
        },
      }),
      invalidatesTags: ['Topics'],
    }),

    unsubscribe: builder.mutation({
      query: ({ topicId, accessTokenInStore }) => ({
        url: `/topics/unsubscribe/${topicId}`,
        method: 'PATCH',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessTokenInStore}`,
        },
      }),
      invalidatesTags: ['Topics'],
    }),

    update: builder.mutation({}),

    createPrivate: builder.mutation({}),

    delete: builder.mutation({}),

    getSubscribers: builder.query({}),

    search: builder.query({}),

    getByTag: builder.query({}),
  }),
});

export const {
  useCreateMutation,
  useGetAllQuery,
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
  useGetByIdQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
} = topicsApi;

export default topicsApi;
