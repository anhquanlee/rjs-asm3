import { configureStore } from '@reduxjs/toolkit';

import popupReducer from './popupSlice';
import productsReducer from './productsSlice';

const store = configureStore({
  reducer: {
    popup: popupReducer,
    products: productsReducer,
  },
});

export default store;
