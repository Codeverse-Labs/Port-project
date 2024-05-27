import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userMobileApi = createApi({
  reducerPath: 'userMobileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  tagTypes: ['getRequest'],
  endpoints: (builder) => ({
    getAllUserMobile: builder.query({
        query: () => ({
          url: `/usermobile/`,
          method: 'GET',
        }),
        providesTags: ['getRequest'],
        transformResponse: (response) => response,
      }),

      newUserMobile: builder.mutation({
        query: ({ MobileNumber }) => {
          return {
            url: `/usermobile`,
            method: 'POST',
            body: { MobileNumber },
          };
        },
        invalidatesTags: ['getRequest'],
      }),

      updateUserMobile: builder.mutation({
        query: ({ id, UserId, GivenFrom, GivenUntill }) => {
          return {
            url: `/usermobile/${id}`,
            method: 'PUT',
            body: { UserId, GivenFrom, GivenUntill },
          };
        },
        invalidatesTags: ['getRequest'],
      }),

      deleteUserMobile: builder.mutation({
        query: (id) => {
          return {
            url: `/usermobile/${id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['getRequest'],
      }),
  }),
});

export const { useGetAllUserMobileQuery, useNewUserMobileMutation, useDeleteUserMobileMutation, useUpdateUserMobileMutation } = userMobileApi;
