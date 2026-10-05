import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // tuỳ bạn quản lý state giỏ hàng ở đâu

function CartLink() {
  const { cartItems } = useCart(); // hoặc lấy từ Redux/Zustand/Context của bạn
  const itemCount =
    cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <Link to='/cart' className='cart-link'>
      <ShoppingCart size={20} />
      <span>Cart</span>
      {itemCount > 0 && <span className='cart-badge'>{itemCount}</span>}
    </Link>
  );
}

export default CartLink;
