/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CategoryState } from '../types/reduxTypes';

// the url for the backend server
const urlBase = 'https://rest-api-blog-backend.herokuapp.com/api/';
// api calls using async thunk
export const getAllCategories = createAsyncThunk(
  'category/getCategories',
  async () => {
    const { data } = await axios.get(`${urlBase}categories`);
    return data;
  },
);

const initialState = {
  categories: [],
  loading: true,
  error: false,
} as CategoryState;

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      getAllCategories.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.categories = payload;
      },
    );
    builder.addCase(getAllCategories.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default categorySlice.reducer;
