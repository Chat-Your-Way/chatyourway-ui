import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, Referer, ajwt, rjwt } from './apiParams';

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
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
        headers: { Authorization: `Bearer ${rjwt}` },
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body: body,
      }),
    }),
    activate: builder.mutation({
      query: (activationCode) => ({
        url: `/auth/activate?Email%20token=${activationCode}`,
        method: 'POST',
        headers: { Authorization: `Bearer ${ajwt}` },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        headers: { Authorization: `Bearer ${ajwt}` },
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
} = authenticationApi;

export default authenticationApi;
