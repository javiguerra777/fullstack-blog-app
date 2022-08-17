/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// the url for the backend server
const urlBase = 'http://localhost:5000/api/';
// api calls using async thunk
export const getAllCategories = createAsyncThunk(
  'category/getCategories',
  async () => {
    const { data } = await axios.get(`${urlBase}categories`);
    return data;
  },
);
type CategoryState = {
  categories: [];
  error: boolean;
  loading: boolean;
};
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
