/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// the url for the backend server
const urlBase = 'https://rest-api-blog-backend.herokuapp.com/api/';
// api calls using async thunk
export const getFriendsInfo = createAsyncThunk(
  'category/getFriendsInfo',
  async ({ username, token }: ReqParams) => {
    const { data } = await axios.get(
      `${urlBase}usersProfileInfo/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  },
);
export const getFriendsPosts = createAsyncThunk(
  'category/getFriendsPosts',
  async ({ username, token }: ReqParams) => {
    const { data } = await axios.get(
      `${urlBase}usersProfilePosts/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  },
);

type ReqParams = {
  username: string;
  token: string;
};
type UsersState = {
  otherUserName: string;
  usersPosts: [];
  usersProfilePicture: string;
  loading: boolean;
  error: boolean;
  postsLoading: boolean;
  postsError: boolean;
};

const initialState = {
  otherUserName: '',
  usersPosts: [],
  usersProfilePicture: '',
  loading: false,
  error: false,
} as UsersState;

export const profileSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get user cases
    builder.addCase(getFriendsInfo.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      getFriendsInfo.fulfilled,
      (state, { payload: { user, image } }) => {
        state.otherUserName = user;
        state.usersProfilePicture = image;
        state.loading = false;
        state.error = false;
      },
    );
    builder.addCase(getFriendsInfo.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    // get posts cases
    builder.addCase(getFriendsPosts.pending, (state) => {
      state.postsLoading = true;
      state.postsError = false;
    });
    builder.addCase(
      getFriendsPosts.fulfilled,
      (state, { payload }) => {
        state.usersPosts = payload;
        state.postsLoading = false;
        state.postsError = false;
      },
    );
    builder.addCase(getFriendsPosts.rejected, (state) => {
      state.postsLoading = false;
      state.postsError = true;
    });
  },
});

export default profileSlice.reducer;
