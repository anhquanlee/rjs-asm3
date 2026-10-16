import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

function CartActions({ isEmpty }) {
  const navigate = useNavigate();

  return (
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
        disabled={isEmpty}
        className="flex cursor-pointer items-center gap-3 border border-[#555] px-4 py-2 text-[12px] text-[#666] hover:bg-[#333] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#666]"
      >
        Proceed to checkout
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
}

export default CartActions;
