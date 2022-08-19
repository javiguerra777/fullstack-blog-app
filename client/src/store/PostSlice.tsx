/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DeletePostParams, PostState } from '../types/reduxTypes';

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

// adds post from the webcam to the database
export const addWebCamImage = createAsyncThunk(
  'post/addWebCamImage',
  async (image: Record<string, unknown>) => {
    const { data } = await axios.post(
      `${urlBase}/image`,
      image.post,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${image.userId}`,
        },
      },
    );
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

// delete post in the database
export const deletePost = createAsyncThunk(
  'post/deletePost',
  async ({ id, userId }: DeletePostParams) => {
    const { data } = await axios.delete(`${urlBase}posts/${id}`, {
      headers: { Authorization: `Bearer ${userId}` },
    });
    return data;
  },
);

const initialState = {
  title: '',
  content: '',
  post: {},
  posts: [],
  loading: true,
  error: false,
  image: '',
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
    setCurrentImage(state, { payload }) {
      state.image = payload;
    },
    updateFilteredPosts(state, { payload }) {
      state.posts = payload;
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
      state.error = false;
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
        state.error = false;
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
      state.error = false;
      state.title = '';
      state.content = '';
    });
    builder.addCase(addNewPost.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    // addWebCamImage cases
    builder.addCase(addWebCamImage.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(addWebCamImage.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
      state.title = '';
      state.content = '';
    });
    builder.addCase(addWebCamImage.rejected, (state) => {
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
      state.error = false;
      state.title = '';
      state.content = '';
    });
    builder.addCase(editPost.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    // deletePost cases
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(deletePost.fulfilled, (state) => {
      state.loading = false;
      state.title = '';
      state.content = '';
    });
    builder.addCase(deletePost.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

// eslint-disable-next-line operator-linebreak
export const {
  setCurrentTitle,
  setCurrentContent,
  setCurrentImage,
  updateFilteredPosts,
} = postSlice.actions;

export default postSlice.reducer;
