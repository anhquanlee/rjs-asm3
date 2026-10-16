import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import CartActions from '../components/cart/CartActions';
import CartList from '../components/cart/CartList';
import CartTotal from '../components/cart/CartTotal';

function CartPage() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const listCart = useSelector((state) => state.cart.listCart);

  const subtotal = listCart.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0
  );

  if (!currentUser) {
    return <Navigate to="/auth?mode=login" state={{ from: '/cart' }} replace />;
  }

  return (
    <div className="w-full bg-white pb-20 italic">
      {/* Page banner */}
      <section className="flex min-h-45 items-center justify-between bg-[#f8f9fa] px-8 md:px-14">
        <h1 className="text-[30px] font-normal text-black">CART</h1>
        <span className="text-md text-[#aaa]">CART</span>
      </section>

      {/* Shopping cart */}
      <section className="mt-14">
        <h2 className="mb-7 text-[20px] font-normal tracking-wide text-black">
          SHOPPING CART
        </h2>

        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,2.1fr)_minmax(260px,1fr)]">
          <div className="min-w-0">
            <CartList listCart={listCart} />
            <CartActions isEmpty={listCart.length === 0} />
          </div>

          <CartTotal subtotal={subtotal} />
        </div>
      </section>
    </div>
  );
}

export default CartPage;
