import { useDispatch } from 'react-redux';
import { useRouteLoaderData } from 'react-router-dom';

import { SHOW_POPUP } from '../../store/popupSlice';
import Popup from './Popup';

function Products() {
  const dispatch = useDispatch();
  const products = useRouteLoaderData('root');

  function formatPrice(price) {
    return Number(price).toLocaleString('vi-VN');
  }

  function handleShowPopup(product) {
    dispatch(SHOW_POPUP(product));
  }

  return (
    <section className="w-full bg-white py-12">
      <div className="mb-7 text-left italic">
        <p className="mb-1 text-[11px] tracking-[2px] text-[#b5b5b5]">
          MADE THE HARD WAY
        </p>

        <h2 className="text-[18px] font-semibold tracking-[2px] text-black">
          TOP TRENDING PRODUCTS
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {products.slice(0, 8).map((product) => (
          <div key={product._id.$oid} className="text-center italic">
            <button
              type="button"
              className="mb-4 flex h-57.5 w-full cursor-pointer items-center justify-center overflow-hidden"
              onClick={() => handleShowPopup(product)}
            >
              <img
                src={product.img1}
                alt={product.name}
                className="h-full w-full object-contain transition-all duration-300 hover:scale-105 hover:opacity-70"
              />
            </button>

            <h3 className="mb-1 text-[13px] font-normal text-black">
              {product.name}
            </h3>

            <p className="text-[11px] text-[#a3a3a3]">
              {formatPrice(product.price)} VND
            </p>
          </div>
        ))}
      </div>

      <Popup />
    </section>
  );
}

export default Products;
