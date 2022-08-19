/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CommentState } from '../types/reduxTypes';

// the url for the backend server
const urlBase = 'http://localhost:5000/api/';
// api calls using async thunk
export const getComments = createAsyncThunk(
  'comment/getComments',
  async (id: string) => {
    const { data } = await axios.get(`${urlBase}comments/${id}`);
    return data;
  },
);

const initialState = {
  comments: [],
  loading: true,
  error: false,
  comment: '',
} as CommentState;
export const commentSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // changes the individual comment string input by user
    changeComment(state, { payload }) {
      state.comment = payload;
    },
    // changes the comment array in the comment section
    changeComments(state, { payload }) {
      state.comments = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getComments.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.comments = payload;
    });
    builder.addCase(getComments.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { changeComment, changeComments } = commentSlice.actions;

export default commentSlice.reducer;
