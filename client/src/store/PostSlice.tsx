/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// the url for the backend server
const urlBase = 'http://localhost:5000/api/';
// api calls using async thunk

// gets all the posts from the database
export const getAllPosts = createAsyncThunk(
  'post/getPosts',
  async () => {
    const { data } = await axios.get(`${urlBase}posts`);
    return data;
  },
);

// gets a single post from the database
export const getPost = createAsyncThunk(
  'post/getPost',
  async (id: string) => {
    const { data } = await axios.get(`${urlBase}posts/${id}`);
    return data;
  },
);

// gets all posts from the database based on category
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

// adds post to the database
export const addNewPost = createAsyncThunk(
  'post/addNewPost',
  async (post: Record<string, unknown>) => {
    const { data } = await axios.post(`${urlBase}posts`, post.post, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${post.userId}`,
      },
    });
    return data;
  },
);

// edit post in the database
export const editPost = createAsyncThunk(
  'post/editPost',
  async (post: Record<string, unknown>) => {
    const { data } = await axios.put(
      `${urlBase}posts/${post.postId}`,
      post.post,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${post.userId}`,
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
      state.title = payload.title;
      state.content = payload.body;
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
    // addNewPost cases
    builder.addCase(addNewPost.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(addNewPost.fulfilled, (state) => {
      state.loading = false;
      state.title = '';
      state.content = '';
    });
    builder.addCase(addNewPost.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    // editPost cases
    builder.addCase(editPost.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(editPost.fulfilled, (state) => {
      state.loading = false;
      state.title = '';
      state.content = '';
    });
    builder.addCase(editPost.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

// eslint-disable-next-line operator-linebreak
export const { setCurrentTitle, setCurrentContent } =
  postSlice.actions;

export default postSlice.reducer;
