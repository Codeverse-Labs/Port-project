import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const telecomApi = createApi({
  reducerPath: 'telecomApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  tagTypes: ['getRequest'],
  endpoints: (builder) => ({
    getAllTelecom: builder.query({
        query: () => ({
          url: `/telecom/`,
          method: 'GET',
        }),
        providesTags: ['getRequest'],
        transformResponse: (response) => response,
      }),

      newTelecom: builder.mutation({
        query: ({ mobileNumber }) => {
          return {
            url: `/telecom`,
            method: 'POST',
            body: { mobileNumber },
          };
        },
        invalidatesTags: ['getRequest'],
      }),

      updateTelecom: builder.mutation({
        query: ({ id, mobileNumber }) => {
          return {
            url: `/telecom/${id}`,
            method: 'PUT',
            body: { mobileNumber },
          };
        },
        invalidatesTags: ['getRequest'],
      }),

      deleteTelecom: builder.mutation({
        query: (id) => {
          return {
            url: `/telecom/${id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['getRequest'],
      }),
  }),
});

export const { useGetAllTelecomQuery, useNewTelecomMutation, useDeleteTelecomMutation, useUpdateTelecomMutation } = telecomApi;
