import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import baseUrl from '../../environment';

const postsApi = createApi({
  reducerPath: 'api/postsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => 'posts',
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAllPostsQuery } = postsApi;
export default postsApi;
