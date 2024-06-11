import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const telebillApi = createApi({
  reducerPath: 'telebillApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  tagTypes: ['getRequest'],
  endpoints: (builder) => ({
    getAllTelebills: builder.query({
      query: () => ({
        url: `/telebills/`,
        method: 'GET',
      }),
      providesTags: ['getRequest'],
      transformResponse: (response) => response,
    }),

    newTelebills: builder.mutation({
      query: ({
        mobile,
        rent,
        other,
        voiceUsage,
        callCharges,
        total,
        dpt,
        month,
        year,
      }) => {
        return {
          url: `/telebills`,
          method: 'POST',
          body: {
            mobile,
            rent,
            other,
            voiceUsage,
            callCharges,
            total,
            dpt,
            month,
            year,
          },
        };
      },
      invalidatesTags: ['getRequest'],
    }),

    getMonthlyTelebills: builder.query({
      query: ({ month, year }) => ({
        url: `/telebills?month=${month}&year=${year}`,
        method: 'GET',
      }),
      providesTags: ['getRequest'],
      transformResponse: (response) => response,
    }),

    getTelebillPayable: builder.query({
      query: ({ month, year }) => ({
        url: `/telebill/payable?month=${month}&year=${year}`,
        method: 'GET',
      }),
      providesTags: ['getRequest'],
      transformResponse: (response) => response,
    }),

    newTelebillPayable: builder.mutation({
      query: ({
        year,
        month,
        discount,
        teleLev,
        cess,
        sscl,
        iddLevy,
        vat,
        total,
      }) => {
        return {
          url: `/telebill/payable`,
          method: 'POST',
          body: {
            year,
            month,
            discount,
            teleLev,
            cess,
            sscl,
            iddLevy,
            vat,
            total,
          },
        };
      },
      invalidatesTags: ['getRequest'],
    }),

    updateTelebillPayable: builder.mutation({
      query: ({
        id,
        year,
        month,
        discount,
        teleLev,
        cess,
        sscl,
        iddLevy,
        vat,
        total,
      }) => {
        return {
          url: `/telebill/payable/${id}`,
          method: 'PUT',
          body: {
            year,
            month,
            discount,
            teleLev,
            cess,
            sscl,
            iddLevy,
            vat,
            total,
          },
        };
      },
      invalidatesTags: ['getRequest'],
    }),

    updateTelebills: builder.mutation({
      query: ({
        id,
        mobile,
        rent,
        other,
        voiceUsage,
        callCharges,
        total,
        dpt,
        month,
        year,
      }) => {
        return {
          url: `/telebills/${id}`,
          method: 'PUT',
          body: {
            mobile,
            rent,
            other,
            voiceUsage,
            callCharges,
            total,
            dpt,
            month,
            year,
          },
        };
      },
      invalidatesTags: ['getRequest'],
    }),

    deleteTelebills: builder.mutation({
      query: (id) => {
        return {
          url: `/telebills/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['getRequest'],
    }),
  }),
});

export const {
  useGetAllTelebillsQuery,
  useNewTelebillsMutation,
  useDeleteTelebillsMutation,
  useUpdateTelebillsMutation,
  useGetMonthlyTelebillsQuery,
  useGetTelebillPayableQuery,
  useNewTelebillPayableMutation,
  useUpdateTelebillPayableMutation,

} = telebillApi;
