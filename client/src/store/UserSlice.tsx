/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// the url for the backend server
const urlBase = 'http://localhost:5000/api/';
// api calls using async thunk
export const getUser = createAsyncThunk(
  'user/getUser',
  async (request: RequestParams) => {
    const { data } = await axios.post(`${urlBase}login`, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  },
);
type RequestParams = {
  username: string;
  password: string;
};
type UserState = {
  userId: string;
  username: string;
  error: boolean;
  loggedIn: boolean;
};
const initialState = {
  userId: '',
  username: '',
  error: false,
} as UserState;

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.error = false;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.loggedIn = true;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.error = true;
    });
  },
});

// export const {
//   setCurrentId,
//   setCurrentUsername,
//   setCurrentTitle,
//   setCurrentContent,
// } = postSlice.actions;

export default postSlice.reducer;
