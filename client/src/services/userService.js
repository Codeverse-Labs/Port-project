import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
        query: () => ({
          url: `/users/`,
          method: 'GET',
        }),
        transformResponse: (response) => response,
      }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
