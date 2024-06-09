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
} = telebillApi;
