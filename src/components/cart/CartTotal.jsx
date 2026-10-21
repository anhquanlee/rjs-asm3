import { faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CartTotal({ subtotal }) {
  function formatPrice(price) {
    return Number(price).toLocaleString('vi-VN');
  }

  return (
    <aside className="bg-[#f8f9fa] px-7 py-9">
      <h2 className="mb-7 text-[20px] font-normal text-black">CART TOTAL</h2>

      <div className="flex items-center justify-between gap-3 border-b border-[#ddd] pb-3">
        <span className="text-[13px] text-black">SUBTOTAL</span>

        <span className="text-right text-[12px] text-[#aaa]">{formatPrice(subtotal)} VND</span>
      </div>

      <div className="flex items-center justify-between gap-3 py-4">
        <span className="text-[13px] text-black">TOTAL</span>

        <span className="text-right text-[15px] text-[#666]">{formatPrice(subtotal)} VND</span>
      </div>

      {/* Coupon UI - functionality not required yet */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter your coupon"
          aria-label="Coupon code"
          className="h-11 w-full border border-[#ddd] bg-white px-3 text-[12px] not-italic text-[#aaa] outline-none"
        />

        <button
          type="button"
          className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 bg-[#333] text-[12px] not-italic text-white hover:bg-black"
        >
          <FontAwesomeIcon icon={faGift} />
          Apply coupon
        </button>
      </div>
    </aside>
  );
}

export default CartTotal;
