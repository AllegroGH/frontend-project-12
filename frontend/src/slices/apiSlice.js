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

    // addChannel: builder.mutation({
    //   query: (channel) => ({
    //     url: '/channels',
    //     method: 'POST',
    //     body: channel,
    //   }),
    // }),

    addChannel: builder.mutation({
      query: (channel) => ({
        url: '/channels',
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channel'],
    }),
    
    renameChannel: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: rest,
      }),
      invalidatesTags: ['Channel'],
    }),

    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channel'],
    }),
   
    getMessages: builder.query({
      query: () => '/messages',
    }),

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
  useAddChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
  useGetMessagesQuery,
  useAddMessageMutation,
} = apiSlice;