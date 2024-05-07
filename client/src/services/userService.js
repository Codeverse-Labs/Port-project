import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  tagTypes: ['getRequest'],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
        query: () => ({
          url: `/users/`,
          method: 'GET',
        }),
        providesTags: ['getRequest'],
        transformResponse: (response) => response,
      }),

      newUser: builder.mutation({
        query: ({ name, position, department }) => {
          return {
            url: `/users`,
            method: 'POST',
            body: { name, position, department },
          };
        },
        invalidatesTags: ['getRequest'],
      }),

      updateUser: builder.mutation({
        query: ({ id, name, position, department }) => {
          return {
            url: `/users/${id}`,
            method: 'PUT',
            body: { name, position, department },
          };
        },
        invalidatesTags: ['getRequest'],
      }),

      deleteUser: builder.mutation({
        query: (id) => {
          return {
            url: `/users/${id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['getRequest'],
      }),
  }),
});

export const { useGetAllUsersQuery, useNewUserMutation, useDeleteUserMutation, useUpdateUserMutation } = userApi;
