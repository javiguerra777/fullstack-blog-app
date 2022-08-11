/* eslint-disable object-curly-newline */
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
export const signUpUser = createAsyncThunk(
  'user/signUpuser',
  async (request: SignUpParams) => {
    const { data } = await axios.post(`${urlBase}signup`, request, {
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

type SignUpParams = {
  username: string;
  password: string;
  date: number;
};

type UserState = {
  userId: string;
  username: string;
  image: string;
  loading: boolean;
  error: boolean;
  loggedIn: boolean;
  displayLogInPrompt: boolean;
  displayCamera: boolean;
  id: string;
};

const initialState = {
  userId: '',
  username: '',
  image: '',
  error: false,
  loading: false,
  loggedIn: false,
  displayLogInPrompt: false,
  displayCamera: false,
  id: '',
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUsername(state, { payload }) {
      state.username = payload;
    },
    signOut(state) {
      state.loggedIn = false;
      state.userId = '';
      state.username = '';
      state.image = '';
    },
    toggleDisplayPrompt(state) {
      state.displayLogInPrompt = !state.displayLogInPrompt;
    },
    toggleDisplayCamera(state) {
      state.displayCamera = !state.displayCamera;
    },
  },
  extraReducers: (builder) => {
    // for logging in user
    builder.addCase(loginUser.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (
        state,
        { payload: { token, username, profileImage, userid } },
      ) => {
        state.userId = token;
        state.username = username;
        state.image = profileImage;
        state.loggedIn = true;
        state.error = false;
        state.loading = false;
        state.id = userid;
      },
    );
    builder.addCase(loginUser.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    // for user signup route
    builder.addCase(signUpUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(signUpUser.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(signUpUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

// eslint-disable-next-line prettier/prettier
export const {
  signOut,
  changeUsername,
  toggleDisplayPrompt,
  toggleDisplayCamera,
} = userSlice.actions;

export default userSlice.reducer;
