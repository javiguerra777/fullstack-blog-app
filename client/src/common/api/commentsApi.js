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
  }),
});

export const {
  useGetCommentsByPostIdQuery,
  useCreateNewCommentMutation,
} = commentsApi;
export default commentsApi;
