/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  LoginParams,
  SignUpParams,
  UpdateUserParams,
  UpdatePasswordParams,
} from '../common/models/userslice';
import baseUrl from '../environment';

// api calls using async thunk
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (request: LoginParams) => {
    const { data } = await axios.post(`${baseUrl}login`, request, {
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
    const { data } = await axios.post(`${baseUrl}signup`, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  },
);
export const updateUsername = createAsyncThunk(
  'user/updateUserName',
  async (request: UpdateUserParams) => {
    const { data } = await axios.put(
      `${baseUrl}updateusername`,
      request.body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${request.userId}`,
        },
      },
    );
    return data;
  },
);

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (request: UpdatePasswordParams) => {
    const { data } = await axios.put(
      `${baseUrl}updatepassword`,
      request.body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${request.userId}`,
        },
      },
    );
    return data;
  },
);

export const updateProfilePicture = createAsyncThunk(
  'user/updateProfilePicture',
  async (request: Record<string, unknown>) => {
    const { data } = await axios.put(
      `${baseUrl}updateprofilepicture`,
      request.body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${request.userId}`,
        },
      },
    );
    return data;
  },
);

export const updateEmail = createAsyncThunk(
  'user/updateEmail',
  async (request: Record<string, unknown>) => {
    const { data } = await axios.put(
      `${baseUrl}updateEmail`,
      request.body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${request.userId}`,
        },
      },
    );
    return data;
  },
);

const initialState = {
  token: 0,
  username: '',
  image: '',
  loginError: false,
  loginLoading: false,
  error: false,
  loading: false,
  loggedIn: false,
  displayLogInPrompt: false,
  displayCamera: false,
  id: 0,
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUsername(state, { payload }) {
      state.username = payload;
    },
    signOut(state) {
      state.loggedIn = false;
      state.token = 0;
      state.username = '';
      state.image = '';
      state.id = 0;
      state.email = '';
    },
    toggleDisplayPrompt(state) {
      state.displayLogInPrompt = !state.displayLogInPrompt;
    },
    toggleDisplayCamera(state) {
      state.displayCamera = !state.displayCamera;
    },
    clearError(state) {
      state.error = false;
    },
    setLoggedInTrue(state) {
      state.loggedIn = true;
    },
  },
  extraReducers: (builder) => {
    // for logging in user
    builder.addCase(loginUser.pending, (state) => {
      state.loginError = false;
      state.loginLoading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, { payload: { user } }) => {
        state.token = user.token || 0;
        state.username = user.username;
        state.image = user.profile_picture;
        state.loggedIn = true;
        state.loginError = false;
        state.loginLoading = false;
        state.id = user.id;
        state.email = user.email;
      },
    );
    builder.addCase(loginUser.rejected, (state) => {
      state.loginError = true;
      state.loginLoading = false;
    });
    // for user sign up route
    builder.addCase(signUpUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      signUpUser.fulfilled,
      (state, { payload: { token, userName, email, id } }) => {
        state.loading = false;
        state.error = false;
        state.token = token;
        state.id = id;
        state.email = email;
        state.username = userName;
      },
    );
    builder.addCase(signUpUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    // updating username
    builder.addCase(updateUsername.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(
      updateUsername.fulfilled,
      (state, { payload: { token, username } }) => {
        state.token = token;
        state.username = username;
        state.error = false;
        state.loading = false;
      },
    );
    builder.addCase(updateUsername.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    // update password
    builder.addCase(updatePassword.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(
      updatePassword.fulfilled,
      (state, { payload: { token } }) => {
        state.token = token;
        state.error = false;
        state.loading = false;
      },
    );
    builder.addCase(updatePassword.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    // update profile picture
    builder.addCase(updateProfilePicture.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(
      updateProfilePicture.fulfilled,
      (state, { payload: { profilepicture } }) => {
        state.image = profilepicture;
        state.error = false;
        state.loading = false;
      },
    );
    builder.addCase(updateProfilePicture.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    // update email
    builder.addCase(updateEmail.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(
      updateEmail.fulfilled,
      (state, { payload: { token, email } }) => {
        state.token = token;
        state.email = email;
        state.error = false;
        state.loading = false;
      },
    );
    builder.addCase(updateEmail.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

// eslint-disable-next-line prettier/prettier
export const {
  signOut,
  changeUsername,
  toggleDisplayPrompt,
  toggleDisplayCamera,
  clearError,
  setLoggedInTrue,
} = userSlice.actions;

export default userSlice.reducer;
