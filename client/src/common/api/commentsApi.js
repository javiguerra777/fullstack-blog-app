import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import baseUrl from '../../environment';

const commentsApi = createApi({
  reducerPath: 'api/commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Comments', 'Comment'],
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query({
      query: ({ id }) => `comments/${id}`,
      transformResponse: (response) => response.data,
      providesTags: ['Comments'],
    }),
    createNewComment: builder.mutation({
      query: ({ payload }) => ({
        url: 'comments',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetCommentsByPostIdQuery,
  useCreateNewCommentMutation,
} = commentsApi;
export default commentsApi;
