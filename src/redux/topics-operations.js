import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, Referer } from './apiParams';

const topicsApi = createApi({
  reducerPath: 'topicsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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
      query: (value) => ({
        url: `/topics/${value}`,
        method: 'GET',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
      query: (id) => ({
        url: `/topics/${id}`,
        method: 'GET',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      providesTags: ['Topics'],
    }),

    subscribe: builder.mutation({
      query: (id) => ({
        url: `/topics/subscribe/${id}`,
        method: 'POST',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['Topics'],
    }),

    unsubscribe: builder.mutation({
      query: (id) => ({
        url: `/topics/unsubscribe/${id}`,
        method: 'PATCH',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
