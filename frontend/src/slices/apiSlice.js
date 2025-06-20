import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import i18n from '../i18n';
import { toast } from 'react-toastify';

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
    // getChannels: builder.query({
    //   query: () => '/channels',
    // }),

    getChannels: builder.query({
      query: () => '/channels',
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
        toast.error(i18n.t('chatServer.loadingChannelsError'));
        }
      },
    }),

    // addChannel: builder.mutation({
    //   query: (channel) => ({
    //     url: '/channels',
    //     method: 'POST',
    //     body: channel,
    //   }),
    //   invalidatesTags: ['Channel'],
    // }),

    addChannel: builder.mutation({
      query: (channel) => ({
        url: '/channels',
        method: 'POST',
        body: channel,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
        toast.error(i18n.t('chatServer.addChannelError'));
        }
      },      
      invalidatesTags: ['Channel'],
    }),
    
    // renameChannel: builder.mutation({
    //   query: ({ id, ...rest }) => ({
    //     url: `/channels/${id}`,
    //     method: 'PATCH',
    //     body: rest,
    //   }),
    //   invalidatesTags: ['Channel'],
    // }),

    renameChannel: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: rest,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
        toast.error(i18n.t('chatServer.renameChannelError'));
        }
      },         
      invalidatesTags: ['Channel'],
    }),

    // removeChannel: builder.mutation({
    //   query: (id) => ({
    //     url: `/channels/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Channel'],
    // }),

    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
        toast.error(i18n.t('chatServer.removeChannelError'));
        }
      },        
      invalidatesTags: ['Channel'],
    }),    
   
    // getMessages: builder.query({
    //   query: () => '/messages',
    // }),

    getMessages: builder.query({
      query: () => '/messages',
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
        toast.error(i18n.t('chatServer.loadingMessagesError'));
        }
      },        
    }),    

    // addMessage: builder.mutation({
    //   query: (message) => ({
    //     url: '/messages',
    //     method: 'POST',
    //     body: message,
    //   }),
    //   invalidatesTags: ['Message'],
    // }),

    addMessage: builder.mutation({
      query: (message) => ({
        url: '/messages',
        method: 'POST',
        body: message,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
        toast.error(i18n.t('chatServer.addMessageError'));
        }
      },         
      invalidatesTags: ['Message'],
    }),    
    
    // removeMessage: builder.mutation({
    //   query: (id) => ({
    //     url: `/messages/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Message'],
    // }),

    removeMessage: builder.mutation({
      query: (id) => ({
        url: `/messages/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
        toast.error(i18n.t('chatServer.removeMessageError'));
        }
      },          
      invalidatesTags: ['Message'],
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
  useRemoveMessageMutation,
} = apiSlice;