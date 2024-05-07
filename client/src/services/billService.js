import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const billApi = createApi({
  reducerPath: 'billApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: (builder) => ({
    getMonthlyBills: builder.query({
        query: ({ month, year }) => ({
          url: `/bills?month=${month}&year=${year}`,
          method: 'GET',
        }),
        transformResponse: (response) => response,
      }),
    getDepartmentBills: builder.query({
        query: ({month, year, department}) => ({
          url: `/bills/dpt?month=${month}&year=${year}&Dpt=${department}`,
          method: 'GET',
        }),
        transformResponse: (response) => response,
      }),

    uploadBills: builder.mutation ({
      query: (selectedFile) => {
        var bodyFormData = new FormData();
        bodyFormData.append('billFile', selectedFile);
        console.log({ bodyFormData, selectedFile });
        return {
          url: '/bills/upload',
          method: 'POST',
          body:  bodyFormData ,
          formData: true
        };
      }
      }),
  }),
});

export const { useGetMonthlyBillsQuery, useGetDepartmentBillsQuery, useUploadBillsMutation } = billApi;
