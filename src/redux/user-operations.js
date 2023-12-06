import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, Referer, ajwt } from './apiParams';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    editUserInfo: builder.mutation({
      query: (body) => ({
        url: '/contacts/profile',
        method: 'PATCH',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ajwt}`,
        },
        body: JSON.stringify(body),
      }),
      invalidatesTags: ['User'],
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: `/contacts/profile`,
        method: 'GET',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ajwt}`,
        },
      }),
      providesTags: ['User'],
    }),
    prohibitPrivateMessage: builder.mutation({
      query: () => ({
        url: '/contacts/message/send/prohibit',
        method: 'PATCH',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ajwt}`,
        },
      }),
      invalidatesTags: ['User'],
    }),
    permitPrivateMessage: builder.mutation({
      query: () => ({
        url: '/contacts/message/send/permit',
        method: 'PATCH',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ajwt}`,
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useEditUserInfoMutation,
  useGetUserInfoQuery,
  usePermitPrivateMessageMutation,
  useProhibitPrivateMessageMutation,
} = userApi;

export default userApi;
