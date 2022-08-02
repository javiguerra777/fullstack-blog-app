/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// the url for the backend server
const urlBase = 'http://localhost:5000/api/';
// api calls using async thunk
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (request: RequestParams) => {
    const { data } = await axios.post(`${urlBase}login`, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  },
);
export type RequestParams = {
  username: string;
  password: string;
};
export type UserState = {
  userId: string;
  username: string;
  error: boolean;
  loggedIn: boolean;
};
const initialState = {
  userId: '',
  username: '',
  error: false,
  loggedIn: false,
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUsername(state, { payload }) {
      state.username = payload;
    },
    toggleLoggedin(state) {
      state.loggedIn = !state.loggedIn;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.error = false;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.userId = payload;
      state.loggedIn = true;
      state.error = false;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.error = true;
    });
  },
});

export const { toggleLoggedin, changeUsername } = userSlice.actions;

export default userSlice.reducer;
