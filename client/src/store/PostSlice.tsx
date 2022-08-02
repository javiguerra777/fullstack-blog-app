/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// the url for the backend server
const urlBase = 'http://localhost:5000/api/';
// api calls using async thunk
export const getAllPosts = createAsyncThunk(
  'post/getPosts',
  async () => {
    const { data } = await axios.get(`${urlBase}posts`);
    return data;
  },
);
type PostState = {
  id: string;
  username: string;
  title: string;
  content: string;
  posts: [];
  loading: boolean;
  error: boolean;
};
const initialState = {
  id: 'test',
  username: 'test',
  title: 'test',
  content: 'test',
  posts: [],
  loading: true,
  error: false,
} as PostState;

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setCurrentId(state, { payload }) {
      state.id = payload;
    },
    setCurrentUsername(state, { payload }) {
      state.username = payload;
    },
    setCurrentTitle(state, { payload }) {
      state.title = payload;
    },
    setCurrentContent(state, { payload }) {
      state.content = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getAllPosts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
    });
    builder.addCase(getAllPosts.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const {
  setCurrentId,
  setCurrentUsername,
  setCurrentTitle,
  setCurrentContent,
} = postSlice.actions;

export default postSlice.reducer;
