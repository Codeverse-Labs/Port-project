import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const departmentApi = createApi({
  reducerPath: 'departmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  tagTypes: ['getRequest'],
  endpoints: (builder) => ({
    newDepartment: builder.mutation({
      query: ({ name, shortName }) => {
        return {
          url: `/dpt`,
          method: 'POST',
          body: { name, shortName },
        };
      },
      invalidatesTags: ['getRequest'],
    }),

    getAllDepartments: builder.query({
      query: () => ({
        url: `/dpt`,
        method: 'GET',
      }),
      providesTags: ['getRequest'],
      transformResponse: (response) => response,
    }),

    updateDepartment: builder.mutation({
        query: ({ id, name, shortName }) => {
          return {
            url: `/dpt/${id}`,
            method: 'PUT',
            body: { name, shortName },
          };
        },
        invalidatesTags: ['getRequest'],
      }),
    deleteDepartment: builder.mutation({
        query: (id) => {
          return {
            url: `/dpt/${id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['getRequest'],
      }),
  }),
});

export const { useGetAllDepartmentsQuery, useNewDepartmentMutation, useDeleteDepartmentMutation, useUpdateDepartmentMutation } = departmentApi;
