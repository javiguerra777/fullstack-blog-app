import { configureStore } from '@reduxjs/toolkit';
import PostSlice from './PostSlice';
import UserSlice from './UserSlice';
import CategorySlice from './CategorySlice';
import CommentSlice from './CommentSlice';

const store = configureStore({
  reducer: {
    post: PostSlice,
    user: UserSlice,
    category: CategorySlice,
    comment: CommentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
