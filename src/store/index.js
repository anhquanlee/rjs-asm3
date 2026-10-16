import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import popupReducer from './popupSlice';

const store = configureStore({
  reducer: {
    popup: popupReducer,
    auth: authReducer,
  },
});

export default store;
