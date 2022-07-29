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
export const getPost = createAsyncThunk(
  'post/getPost',
  async (id: string) => {
    const { data } = await axios.get(`${urlBase}posts/${id}`);
    return data;
  },
);
export const getPostByCategory = createAsyncThunk(
  'post/getByCategory',
  async (category: Record<string, unknown>) => {
    const { data } = await axios.post(
      `${urlBase}filteredpost`,
      category,

      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  },
);
type PostState = {
  title: string;
  content: string;
  post: Record<string, unknown>;
  posts: [];
  loading: boolean;
  error: boolean;
};
const initialState = {
  title: '',
  content: '',
  post: {},
  posts: [],
  loading: true,
  error: false,
} as PostState;

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setCurrentTitle(state, { payload }) {
      state.title = payload;
    },
    setCurrentContent(state, { payload }) {
      state.content = payload;
    },
  },
  // extra reducers
  extraReducers: (builder) => {
    // getAllPosts cases
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
    // getPost cases
    builder.addCase(getPost.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getPost.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.post = payload;
    });
    builder.addCase(getPost.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    // getPostByCategory cases
    builder.addCase(getPostByCategory.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      getPostByCategory.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.posts = payload;
      },
    );
    builder.addCase(getPostByCategory.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

// eslint-disable-next-line operator-linebreak
export const { setCurrentTitle, setCurrentContent } =
  postSlice.actions;

export default postSlice.reducer;
