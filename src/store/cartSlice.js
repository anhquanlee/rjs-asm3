import { createSlice } from '@reduxjs/toolkit';

export function getCartStorageKey(email) {
  return `cart_${encodeURIComponent(email.trim().toLowerCase())}`;
}

export function loadUserCart(email) {
  if (!email) {
    return [];
  }

  try {
    const savedCart = localStorage.getItem(getCartStorageKey(email));
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

function getInitialCart() {
  try {
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));

    return savedUser?.email ? loadUserCart(savedUser.email) : [];
  } catch {
    return [];
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    listCart: getInitialCart(),
  },
  reducers: {
    ADD_CART(state, action) {
      const { product, quantity } = action.payload;

      if (!Number.isInteger(quantity) || quantity < 1) {
        return;
      }

      const existingProduct = state.listCart.find(
        (item) => item.product._id.$oid === product._id.$oid
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.listCart.push({
          product,
          quantity,
        });
      }
    },

    UPDATE_CART(state, action) {
      const { productId, quantity } = action.payload;

      if (!Number.isInteger(quantity) || quantity < 1) {
        return;
      }

      const existingProduct = state.listCart.find(
        (item) => item.product._id.$oid === productId
      );

      if (existingProduct) {
        existingProduct.quantity = quantity;
      }
    },

    DELETE_CART(state, action) {
      state.listCart = state.listCart.filter(
        (item) => item.product._id.$oid !== action.payload
      );
    },

    SET_CART(state, action) {
      state.listCart = action.payload;
    },

    CLEAR_CART(state) {
      state.listCart = [];
    },
  },
});

export const { ADD_CART, UPDATE_CART, DELETE_CART, SET_CART, CLEAR_CART } =
  cartSlice.actions;

export default cartSlice.reducer;
