import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, Referer } from './apiParams';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    editUserInfo: builder.mutation({
      query: ({ body, accessTokenInStore }) => ({
        url: '/contacts/profile',
        method: 'PATCH',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessTokenInStore}`,
        },
        body: JSON.stringify(body),
      }),
      invalidatesTags: ['User'],
    }),
    getUserInfo: builder.query({
      query: (accessTokenInStore) => ({
        url: `/contacts/profile`,
        method: 'GET',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessTokenInStore}`,
        },
      }),
      providesTags: ['User'],
    }),
    prohibitPrivateMessage: builder.mutation({
      query: (accessTokenInStore) => ({
        url: '/contacts/message/send/prohibit',
        method: 'PATCH',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessTokenInStore}`,
        },
      }),
      invalidatesTags: ['User'],
    }),
    permitPrivateMessage: builder.mutation({
      query: (accessTokenInStore) => ({
        url: '/contacts/message/send/permit',
        method: 'PATCH',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessTokenInStore}`,
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
