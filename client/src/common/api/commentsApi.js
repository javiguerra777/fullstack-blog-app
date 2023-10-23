/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
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
      query: (id) => `comments/${id}`,
      transformResponse: (response) => response.data,
      providesTags: ['Comments'],
    }),
    createNewComment: builder.mutation({
      query: ({ payload }) => ({
        url: 'comments',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response) => response.data,
      async onQueryStarted(
        { payload },
        { dispatch, queryFulfilled },
      ) {
        const { data } = await queryFulfilled;
        dispatch(
          commentsApi.util.updateQueryData(
            'getCommentsByPostId',
            payload.post_id.toString(),
            (draft) => {
              draft.push(data);
            },
          ),
        );
      },
    }),
    deleteComment: builder.mutation({
      query: ({ id, user_id }) => ({
        url: `comments/${id}`,
        method: 'DELETE',
        body: { user_id },
      }),
      async onQueryStarted(
        { id, post_id },
        { dispatch, queryFulfilled },
      ) {
        const patchUpdate = dispatch(
          commentsApi.util.updateQueryData(
            'getCommentsByPostId',
            post_id.toString(),
            (draft) => {
              const index = draft.findIndex((item) => item.id === id);
              draft.splice(index, 1);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchUpdate.undo();
        }
      },
    }),
  }),
});

export const {
  useGetCommentsByPostIdQuery,
  useCreateNewCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
export default commentsApi;
