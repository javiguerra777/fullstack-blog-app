import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 'test',
  username: 'test',
  title: 'test',
  content: 'test',
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setCurrentId(state, { payload }) {
      state.id = payload;
    },
    setCurrentUsername(state, { payload }) {
      state.username = payload;
    },
    setCurrentTitle(state, { payload }) {
      state.title = payload;
    },
    setCurrentContent(state, { payload }) {
      state.content = payload;
    },
  },
});

export const {
  setCurrentId,
  setCurrentUsername,
  setCurrentTitle,
  setCurrentContent,
} = postSlice.actions;

export default postSlice.reducer;
