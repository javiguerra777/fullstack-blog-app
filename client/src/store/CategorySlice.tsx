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
    console.log(data);
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
        state.categories = payload;
      },
    );
    builder.addCase(getAllCategories.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

// export const {
//   setCurrentId,
//   setCurrentUsername,
//   setCurrentTitle,
//   setCurrentContent,
// } = categorySlice.actions;

export default categorySlice.reducer;
