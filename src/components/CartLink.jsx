import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CartLink() {
  const navigate = useNavigate();

  return (
    <button
      type='button'
      className='flex cursor-pointer items-center gap-0.5'
      onClick={() => navigate('/cart')}>
      <ShoppingCart size={12} strokeWidth={1.5} />
      <span>Cart</span>
    </button>
  );
}

export default CartLink;
