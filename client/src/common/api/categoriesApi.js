import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import baseUrl from '../../environment';

const categoriesApi = createApi({
  reducerPath: 'api/categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => 'categories',
      transformResponse: (response) => response.data,
    }),
  }),
});
export const { useGetAllCategoriesQuery } = categoriesApi;
export default categoriesApi;
