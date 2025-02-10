import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, Referer } from './apiParams';

const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    async responseHandler(response) {
      const contentType = response.headers.get('Content-Type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (e) {
          console.error('Ошибка при парсинге JSON:', e);
          throw new Error('Невозможно распарсить JSON');
        }
      } else if (contentType && contentType.includes('text/plain')) {
        try {
          data = await response.text();
        } catch (e) {
          console.error('Ошибка при парсинге текстового ответа:', e);
          throw new Error('Невозможно распарсить текст');
        }
      }

      return { data };
    },
  }),

  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        headers: {
          Referer: Referer,
          'Content-Type': 'application/json',
        },
        body: body,
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
      }),
    }),
    activate: builder.mutation({
      query: ({ activationToken }) => ({
        url: `/auth/activate?token=${activationToken}`,
        method: 'POST',
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
    resendActivationEmail: builder.mutation({
      query: (body) => ({
        url: '/auth/resend/email',
        method: 'POST',
        body: body,
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
  useResendActivationEmailMutation,
} = authenticationApi;

export default authenticationApi;
