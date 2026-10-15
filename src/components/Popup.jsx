import { faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { HIDE_POPUP } from '../store/popupSlice';

function Popup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen, product } = useSelector((state) => state.popup);

  if (!isOpen || !product) {
    return null;
  }

  function formatPrice(price) {
    return Number(price).toLocaleString('vi-VN');
  }

  function handleClose() {
    dispatch(HIDE_POPUP());
  }

  function handleViewDetail() {
    dispatch(HIDE_POPUP());
    navigate(`/detail/${product._id}`);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-187.5 bg-white px-10 py-14 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-5 right-5 cursor-pointer text-[#777] hover:text-black"
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img
              src={product.img1}
              alt={product.name}
              className="h-75 w-full object-contain"
            />
          </div>

          <div className="italic">
            <h2 className="mb-2 text-[22px] font-normal text-black">
              {product.name}
            </h2>

            <p className="mb-3 text-[17px] text-[#aaa]">
              {formatPrice(product.price)} VND
            </p>

            <p className="mb-6 text-[13px] leading-6 text-[#999]">
              {product.long_desc}
            </p>

            <button
              type="button"
              className="cursor-pointer bg-[#333] px-5 py-2 text-[13px] text-white hover:bg-black"
              onClick={handleViewDetail}
            >
              <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
              View Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
