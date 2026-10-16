import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setLoading(state) {
      state.status = 'loading';
      state.error = null;
    },
    setProducts(state, action) {
      state.items = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    setError(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setLoading, setProducts, setError } = productsSlice.actions;

export const getProducts = (state) => state.products.items;

export const getProduct = (state, id) =>
  state.products.items.find((product) => product._id.$oid === id);

export const getProductsStatus = (state) => state.products.status;

export const getProductsError = (state) => state.products.error;

export default productsSlice.reducer;
