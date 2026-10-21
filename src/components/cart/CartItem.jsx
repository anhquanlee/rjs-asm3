import { faCaretLeft, faCaretRight, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { REMOVE_ITEM, UPDATE_ITEM_QUANTITY } from '../../store/cartSlice';

function CartItem({ product, quantity }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productId = product._id.$oid;
  const itemTotal = Number(product.price) * quantity;

  function formatPrice(price) {
    return Number(price).toLocaleString('vi-VN');
  }

  function handleQuantityChange(newQuantity) {
    if (newQuantity <= 0) {
      dispatch(REMOVE_ITEM(productId));
      return;
    }

    dispatch(
      UPDATE_ITEM_QUANTITY({
        productId,
        quantity: newQuantity,
      })
    );
  }

  function handleRemove() {
    dispatch(REMOVE_ITEM(productId));
  }

  return (
    <tr>
      <td className="px-2 py-6">
        <img src={product.img1} alt={product.name} className="mx-auto h-20 w-17 object-contain" />
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
            onClick={() => handleQuantityChange(quantity - 1)}
            className="cursor-pointer text-[12px] text-black"
            aria-label={`Decrease quantity of ${product.name}`}
          >
            <FontAwesomeIcon icon={faCaretLeft} />
          </button>

          <span className="min-w-3 text-[13px] not-italic text-[#666]">{quantity}</span>

          <button
            type="button"
            onClick={() => handleQuantityChange(quantity + 1)}
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
          onClick={handleRemove}
          className="cursor-pointer text-[13px] text-[#999] hover:text-red-500"
          aria-label={`Remove ${product.name}`}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
