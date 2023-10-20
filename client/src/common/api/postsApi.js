import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import baseUrl from '../../environment';

const postsApi = createApi({
  reducerPath: 'api/postsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Posts', 'Post'],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => 'posts',
      transformResponse: (response) => response.data,
      providesTags: ['Posts'],
    }),
    getPost: builder.query({
      query: ({ id }) => `posts/${id}`,
      transformResponse: (response) => response.data,
      providesTags: ['Post'],
    }),
    createPost: builder.mutation({
      query: ({ payload }) => ({
        url: 'posts',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Posts'],
    }),
    updatePost: builder.mutation({
      query: ({ payload, id }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Posts', 'Post'],
    }),
    deletePost: builder.mutation({
      query: ({ id, user_id }) => ({
        url: `posts/${id}`,
        method: 'DELETE',
        body: { user_id },
      }),
      invalidatesTags: ['Posts', 'Post'],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useDeletePostMutation,
  useCreatePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
} = postsApi;
export default postsApi;
