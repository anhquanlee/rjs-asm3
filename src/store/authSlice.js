import { createSlice } from '@reduxjs/toolkit';

const savedUser = localStorage.getItem('currentUser');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: savedUser ? JSON.parse(savedUser) : null,
  },
  reducers: {
    ON_LOGIN(state, action) {
      state.currentUser = action.payload;
    },
    ON_LOGOUT(state) {
      state.currentUser = null;
    },
  },
});

export const { ON_LOGIN, ON_LOGOUT } = authSlice.actions;

export default authSlice.reducer;
