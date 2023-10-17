/* eslint-disable implicit-arrow-linebreak */
import { configureStore } from '@reduxjs/toolkit';
import PostSlice from './PostSlice';
import UserSlice from './UserSlice';
import CommentSlice from './CommentSlice';
import categoriesApi from '../common/api/categoriesApi';
import postsApi from '../common/api/postsApi';

const store = configureStore({
  reducer: {
    post: PostSlice,
    user: UserSlice,
    comment: CommentSlice,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      postsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
