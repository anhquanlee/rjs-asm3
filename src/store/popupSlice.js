import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    isOpen: false,
    product: null,
  },
  reducers: {
    SHOW_POPUP(state, action) {
      state.isOpen = true;
      state.product = action.payload;
    },
    HIDE_POPUP(state) {
      state.isOpen = false;
      state.product = null;
    },
  },
});

export const { SHOW_POPUP, HIDE_POPUP } = popupSlice.actions;

export default popupSlice.reducer;
