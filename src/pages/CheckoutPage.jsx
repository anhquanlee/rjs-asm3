import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import BillingDetails from '../components/checkout/BillingDetails';
import YourOrder from '../components/checkout/YourOrder';

function CheckoutPage() {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const listCart = useSelector((state) => state.cart.listCart);

  if (!currentUser) {
    return (
      <Navigate to="/auth?mode=login" state={{ from: '/checkout' }} replace />
    );
  }

  return (
    <div className="w-full bg-white pb-20 italic">
      {/* Checkout banner */}
      <section className="flex min-h-45 items-center justify-between bg-[#f8f9fa] px-8 md:px-14">
        <h1 className="text-[30px] font-normal tracking-wide text-black">
          CHECKOUT
        </h1>

        <div className="flex items-center gap-2 text-[12px] tracking-wide">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="cursor-pointer text-black hover:text-[#e6ad50]"
          >
            HOME
          </button>

          <span className="text-[#aaa]">/</span>

          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="cursor-pointer text-black hover:text-[#e6ad50]"
          >
            CART
          </button>

          <span className="text-[#aaa]">/</span>
          <span className="text-[#aaa]">CHECKOUT</span>
        </div>
      </section>

      {/* Billing details */}
      <section className="mt-14">
        <h2 className="mb-8 text-[20px] font-normal tracking-wide text-black">
          BILLING DETAILS
        </h2>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(260px,1fr)]">
          <BillingDetails
            currentUser={currentUser}
            isEmpty={listCart.length === 0}
          />
          <YourOrder listCart={listCart} />
        </div>
      </section>
    </div>
  );
}

export default CheckoutPage;
