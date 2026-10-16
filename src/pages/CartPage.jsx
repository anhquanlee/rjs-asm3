import {
  faArrowLeft,
  faArrowRight,
  faCaretLeft,
  faCaretRight,
  faGift,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { DELETE_CART, UPDATE_CART } from '../store/cartSlice';

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const listCart = useSelector((state) => state.cart.listCart);

  const subtotal = listCart.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0
  );

  function formatPrice(price) {
    return Number(price).toLocaleString('vi-VN');
  }

  function handleQuantityChange(productId, quantity) {
    if (quantity < 1) {
      return;
    }

    dispatch(
      UPDATE_CART({
        productId,
        quantity,
      })
    );
  }

  function handleRemove(productId) {
    dispatch(DELETE_CART(productId));
  }

  if (!currentUser) {
    return <Navigate to="/auth?mode=login" state={{ from: '/cart' }} replace />;
  }

  return (
    <div className="w-full bg-white px-5 pb-20 italic">
      {/* Page banner */}
      <section className="flex min-h-45 items-center justify-between bg-[#f8f9fa] px-8 md:px-14">
        <h1 className="text-[30px] font-normal text-black">CART</h1>

        <span className="text-[13px] text-[#aaa]">CART</span>
      </section>

      {/* Shopping cart */}
      <section className="mt-14">
        <h2 className="mb-7 text-[20px] font-normal tracking-wide text-black">
          SHOPPING CART
        </h2>

        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,2.1fr)_minmax(260px,1fr)]">
          {/* Cart items */}
          <div className="min-w-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-145 border-collapse text-center">
                <thead className="bg-[#f8f9fa]">
                  <tr className="text-[12px] tracking-wide text-black">
                    <th className="px-2 py-5 font-normal">IMAGE</th>
                    <th className="px-2 py-5 font-normal">PRODUCT</th>
                    <th className="px-2 py-5 font-normal">PRICE</th>
                    <th className="px-2 py-5 font-normal">QUANTITY</th>
                    <th className="px-2 py-5 font-normal">TOTAL</th>
                    <th className="px-2 py-5 font-normal">REMOVE</th>
                  </tr>
                </thead>

                <tbody>
                  {listCart.map(({ product, quantity }) => {
                    const productId = product._id.$oid;
                    const itemTotal = Number(product.price) * quantity;

                    return (
                      <tr key={productId}>
                        <td className="px-2 py-6">
                          <img
                            src={product.img1}
                            alt={product.name}
                            className="mx-auto h-20 w-17 object-contain"
                          />
                        </td>

                        <td className="max-w-40 px-2 py-6">
                          <button
                            type="button"
                            onClick={() => navigate(`/detail/${productId}`)}
                            className="cursor-pointer text-[13px] leading-5 font-medium text-black hover:text-[#e6ad50]"
                          >
                            {product.name}
                          </button>
                        </td>

                        <td className="px-2 py-6 text-[12px] leading-5 text-[#aaa]">
                          {formatPrice(product.price)}
                          <br />
                          VND
                        </td>

                        <td className="px-2 py-6">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              type="button"
                              disabled={quantity <= 1}
                              onClick={() =>
                                handleQuantityChange(productId, quantity - 1)
                              }
                              className="cursor-pointer text-[12px] text-black disabled:cursor-not-allowed disabled:opacity-30"
                              aria-label={`Decrease quantity of ${product.name}`}
                            >
                              <FontAwesomeIcon icon={faCaretLeft} />
                            </button>

                            <span className="min-w-3 text-[13px] not-italic text-[#666]">
                              {quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(productId, quantity + 1)
                              }
                              className="cursor-pointer text-[12px] text-black"
                              aria-label={`Increase quantity of ${product.name}`}
                            >
                              <FontAwesomeIcon icon={faCaretRight} />
                            </button>
                          </div>
                        </td>

                        <td className="px-2 py-6 text-[12px] leading-5 text-[#aaa]">
                          {formatPrice(itemTotal)}
                          <br />
                          VND
                        </td>

                        <td className="px-2 py-6">
                          <button
                            type="button"
                            onClick={() => handleRemove(productId)}
                            className="cursor-pointer text-[13px] text-[#999] hover:text-red-500"
                            aria-label={`Remove ${product.name}`}
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {listCart.length === 0 && (
              <p className="py-12 text-center text-[14px] text-[#999]">
                Your shopping cart is empty.
              </p>
            )}

            {/* Shopping actions */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 bg-[#f8f9fa] px-5 py-4">
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="flex cursor-pointer items-center gap-2 text-[12px] text-[#777] hover:text-black"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-black" />
                Continue shopping
              </button>

              <button
                type="button"
                onClick={() => navigate('/checkout')}
                disabled={listCart.length === 0}
                className="flex cursor-pointer items-center gap-3 border border-[#555] px-4 py-2 text-[12px] text-[#666] hover:bg-[#333] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#666]"
              >
                Proceed to checkout
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>

          {/* Cart total */}
          <aside className="bg-[#f8f9fa] px-7 py-9">
            <h2 className="mb-7 text-[20px] font-normal text-black">
              CART TOTAL
            </h2>

            <div className="flex items-center justify-between gap-3 border-b border-[#ddd] pb-3">
              <span className="text-[13px] text-black">SUBTOTAL</span>

              <span className="text-right text-[12px] text-[#aaa]">
                {formatPrice(subtotal)} VND
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 py-4">
              <span className="text-[13px] text-black">TOTAL</span>

              <span className="text-right text-[15px] text-[#666]">
                {formatPrice(subtotal)} VND
              </span>
            </div>

            {/* Coupon UI - functionality not required yet */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter your coupon"
                aria-label="Coupon code"
                disabled
                className="h-11 w-full border border-[#ddd] bg-white px-3 text-[12px] not-italic text-[#aaa] outline-none disabled:cursor-not-allowed"
              />

              <button
                type="button"
                disabled
                className="flex h-10 w-full cursor-not-allowed items-center justify-center gap-2 bg-[#333] text-[12px] not-italic text-white opacity-70"
              >
                <FontAwesomeIcon icon={faGift} />
                Apply coupon
              </button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default CartPage;
