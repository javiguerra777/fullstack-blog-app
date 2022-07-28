import { configureStore, combineReducers } from '@reduxjs/toolkit';
import PostSlice from './PostSlice';
import UserSlice from './UserSlice';
import CategorySlice from './CategorySlice';

const rootReducer = combineReducers({});
export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: {
    post: PostSlice,
    user: UserSlice,
    category: CategorySlice,
  },
});