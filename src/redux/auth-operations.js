import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, Referer } from './apiParams';

const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }),
    }),
    refresh: builder.mutation({
      query: ({ accessTokenInStore }) => ({
        url: '/auth/refresh',
        method: 'POST',
        headers: { Authorization: `Bearer ${accessTokenInStore}` },
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body: body,
        // headers: {
        //   'Content-type': 'application/json',
        //   Referer: 'https://splendid-quokka-41776c.netlify.app/',
        // },
      }),
    }),

    activate: builder.mutation({
      query: ({ activationToken }) => ({
        url: `/auth/activate?Email%20token=${activationToken}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    logout: builder.mutation({
      query: ({ accessTokenInStore }) => ({
        url: '/auth/logout',
        method: 'POST',
        headers: { Authorization: `Bearer ${accessTokenInStore}` },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ newPassword, token }) => ({
        url: `/change/password/restore?newPassword=${newPassword}&token=${token}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useRegistrationMutation,
  useRefreshMutation,
  useLoginMutation,
  useActivateMutation,
  useLogoutMutation,
  useResetPasswordMutation,
} = authenticationApi;

export default authenticationApi;
