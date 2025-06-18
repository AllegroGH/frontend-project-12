import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '/channels',
    }),
    getMessages: builder.query({
      query: () => '/messages',
    }),
    // addChannel: builder.mutation({
    //   query: (channel) => ({
    //     url: '/channels',
    //     method: 'POST',
    //     body: channel,
    //   }),
    // }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: '/messages',
        method: 'POST',
        body: message,
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useGetMessagesQuery,
  useAddChannelMutation,
  useAddMessageMutation,
} = apiSlice;