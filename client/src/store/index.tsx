/* eslint-disable implicit-arrow-linebreak */
import { configureStore } from '@reduxjs/toolkit';
import PostSlice from './PostSlice';
import UserSlice from './UserSlice';
import CommentSlice from './CommentSlice';
import categoriesApi from '../common/api/categoriesApi';

const store = configureStore({
  reducer: {
    post: PostSlice,
    user: UserSlice,
    comment: CommentSlice,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoriesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
