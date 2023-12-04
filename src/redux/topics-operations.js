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
      query: () => ({
        url: '/topics/all',
        method: 'GET',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ajwt}`,
        },
      }),
      providesTags: ['Topics'],
    }),
  }),
});

export const { useCreateMutation, useGetAllQuery } = topicsApi;

export default topicsApi;
