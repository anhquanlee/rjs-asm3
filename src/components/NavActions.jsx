import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import {
  faCaretDown,
  faCartShopping,
  faUser as faUserSolid,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { ON_LOGOUT } from '../store/authSlice';
import { CLEAR_CART } from '../store/cartSlice';

function NavActions() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const listCart = useSelector((state) => state.cart.listCart);

  const cartQuantity = listCart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const isCartActive = location.pathname === '/cart';
  const isLoginActive = location.pathname === '/auth';

  function handleCartClick() {
    if (!currentUser) {
      navigate('/auth?mode=login', {
        state: { from: '/cart' },
      });
      return;
    }

    navigate('/cart');
  }

  function handleLogout() {
    localStorage.removeItem('currentUser');

    dispatch(ON_LOGOUT());
    dispatch(CLEAR_CART());

    navigate('/');
  }

  return (
    <div className="flex items-center justify-end gap-3 text-sm">
      <button
        type="button"
        className={`flex items-center gap-1 ${
          currentUser ? 'cursor-pointer' : 'cursor-not-allowed'
        } ${isCartActive ? 'text-[#e6ad50]' : 'text-[#666]'}`}
        onClick={handleCartClick}
      >
        <span className="relative inline-flex h-6 w-7 shrink-0 items-center justify-center">
          <FontAwesomeIcon icon={faCartShopping} />

          {currentUser && cartQuantity > 0 && (
            <span className="absolute top-0 right-0 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-red-500 px-0.5 text-[8px] leading-none font-bold text-white not-italic">
              {cartQuantity}
            </span>
          )}
        </span>

        <span>Cart</span>
      </button>

      {currentUser ? (
        <>
          <div className="flex items-center gap-1 text-[#666]">
            <FontAwesomeIcon icon={faUserSolid} />
            <span>{currentUser.fullName}</span>
            <FontAwesomeIcon icon={faCaretDown} className="ml-1 text-[10px]" />
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="cursor-pointer text-[#666] hover:text-[#e6ad50]"
          >
            ( Logout )
          </button>
        </>
      ) : (
        <button
          type="button"
          className={`flex cursor-pointer items-center gap-1 ${
            isLoginActive ? 'text-[#e6ad50]' : 'text-[#666]'
          }`}
          onClick={() => navigate('/auth?mode=login')}
        >
          <FontAwesomeIcon icon={isLoginActive ? faUserSolid : faUserRegular} />
          <span>Login</span>
        </button>
      )}
    </div>
  );
}

export default NavActions;
