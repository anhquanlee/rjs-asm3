import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Banner from '../components/Banner';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Services from '../components/Services';

import store from '../store';
import {
  getProductsStatus,
  setError,
  setLoading,
  setProducts,
} from '../store/productsSlice';

const API_URL =
  'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74';

async function fetchProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch products.');
  }

  return await response.json();
}

function HomePage() {
  const dispatch = useDispatch();
  const status = useSelector(getProductsStatus);

  useEffect(() => {
    if (status !== 'idle' || store.getState().products.status !== 'idle') {
      return;
    }

    dispatch(setLoading());

    fetchProducts()
      .then((data) => {
        dispatch(setProducts(data));
      })
      .catch((error) => {
        dispatch(setError(error.message));
      });
  }, [dispatch, status]);

  return (
    <div className="w-full">
      <Banner />
      <Categories />
      <Products />
      <Services />
    </div>
  );
}

export default HomePage;
