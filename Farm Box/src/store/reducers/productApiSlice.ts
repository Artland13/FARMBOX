import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from 'models/IProduct';

import url from '../../url';

export const productApiSlice = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      IProduct[],
      { limit: number; page: number; title: string }
    >({
      query: ({ limit = 15, page = 1, title = '' }) => ({
        url: `/product?title=${title}&limit=${limit}&page=${page}`,
        method: 'get',
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productApiSlice;
