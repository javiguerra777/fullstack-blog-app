import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import PostSlice from './PostSlice';
import UserSlice from './UserSlice';
import CommentSlice from './CommentSlice';
import categoriesApi from '../common/api/categoriesApi';
import postsApi from '../common/api/postsApi';
import commentsApi from '../common/api/commentsApi';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};
const rootReducer = combineReducers({
  user: UserSlice,
  post: PostSlice,
  comment: CommentSlice,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      postsApi.middleware,
      commentsApi.middleware,
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
