import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { ADD_CART } from '../../store/cartSlice';

function ProductInfo({ product }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);

  const [quantity, setQuantity] = useState(1);

  function formatPrice(price) {
    return Number(price).toLocaleString('vi-VN');
  }

  function handleAddToCart() {
    if (!currentUser) {
      navigate('/auth?mode=login', {
        state: {
          from: `${location.pathname}${location.search}`,
        },
      });
      return;
    }

    dispatch(
      ADD_CART({
        product,
        quantity,
      })
    );
  }

  return (
    <div className="pt-6">
      <h1 className="mb-8 text-[32px] leading-[1.2] font-normal text-black md:text-[38px]">
        {product.name}
      </h1>

      <p className="mb-9 text-[20px] font-light text-[#a3a3a3]">
        {formatPrice(product.price)} VND
      </p>

      <p className="mb-9 whitespace-pre-line text-[14px] leading-[2.1] text-[#aaa]">
        {product.short_desc}
      </p>

      <p className="mb-6 text-[14px]">
        <span className="font-medium text-black">CATEGORY: </span>
        <span className="ml-1 text-[#a3a3a3]">{product.category}</span>
      </p>

      {/* Quantity and cart button */}
      <div className="flex items-center">
        <div className="flex h-11.5 items-center border border-[#ddd]">
          <span className="pr-10 pl-4 text-[13px] tracking-wide text-[#b5b5b5]">
            QUANTITY
          </span>

          <button
            type="button"
            disabled={quantity === 1}
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="cursor-pointer px-2 text-[12px] text-black disabled:opacity-30"
            aria-label="Decrease quantity"
          >
            <FontAwesomeIcon icon={faCaretLeft} />
          </button>

          <span className="min-w-6 text-center text-[16px] not-italic text-[#555]">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() => setQuantity((prev) => prev + 1)}
            className="cursor-pointer px-2 text-[12px] text-black"
            aria-label="Increase quantity"
          >
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="h-11.5 cursor-pointer bg-[#333] px-7 text-[14px] text-white hover:bg-black"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;
