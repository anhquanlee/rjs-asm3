import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import cartReducer, { getCartStorageKey } from './cartSlice';
import popupReducer from './popupSlice';

const store = configureStore({
  reducer: {
    popup: popupReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

let previousCart = store.getState().cart.listCart;

// exe every dispatch redux called
store.subscribe(() => {
  const state = store.getState();
  const currentCart = state.cart.listCart;
  const currentUser = state.auth.currentUser;

  if (currentCart === previousCart) {
    return;
  }

  previousCart = currentCart;

  if (!currentUser?.email) {
    return;
  }

  localStorage.setItem(
    getCartStorageKey(currentUser.email),
    JSON.stringify(currentCart)
  );
});

export default store;
