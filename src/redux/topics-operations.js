import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, Referer, ajwt } from './apiParams';

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
          Authorization: `Bearer ${ajwt}`,
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
          Authorization: `Bearer ${ajwt}`,
        },
      }),
      providesTags: ['Topics'],
    }),

    update: builder.mutation({}),

    subscribe: builder.mutation({}),

    createPrivate: builder.mutation({}),

    removeFavourite: builder.mutation({}),

    addFavourite: builder.mutation({}),

    unsubscribe: builder.mutation({}),

    messageProhibit: builder.query({}),

    messagePermit: builder.query({}),

    getById: builder.query({}),

    delete: builder.mutation({}),

    getSubscribers: builder.query({}),

    search: builder.query({}),

    getByTag: builder.query({}),
  }),
});

export const { useCreateMutation, useGetAllQuery } = topicsApi;

export default topicsApi;
