import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import {
  faCaretDown,
  faCartShopping,
  faUser as faUserSolid,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { ON_LOGOUT } from '../store/authSlice';
import { CLEAR_CART } from '../store/cartSlice';

function NavActions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const listCart = useSelector((state) => state.cart.listCart);

  const cartQuantity = listCart.reduce((total, item) => total + item.quantity, 0);

  function handleLogout() {
    localStorage.removeItem('currentUser');

    dispatch(ON_LOGOUT());
    dispatch(CLEAR_CART());

    navigate('/');
  }

  const cartContent = (
    <>
      <span className="relative inline-flex h-6 w-7 shrink-0 items-center justify-center">
        <FontAwesomeIcon icon={faCartShopping} />

        {currentUser && cartQuantity > 0 && (
          <span className="absolute top-0 right-0 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-red-500 px-0.5 text-[8px] leading-none font-bold text-white not-italic">
            {cartQuantity}
          </span>
        )}
      </span>

      <span>Cart</span>
    </>
  );

  return (
    <div className="flex items-center justify-end gap-3 text-sm">
      {currentUser ? (
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `flex items-center gap-1 ${isActive ? 'text-[#e6ad50]' : 'text-[#666]'}`
          }
        >
          {cartContent}
        </NavLink>
      ) : (
        <NavLink
          to="/auth?mode=login"
          state={{ from: '/cart' }}
          className="flex cursor-not-allowed items-center gap-1 text-[#666]"
        >
          {cartContent}
        </NavLink>
      )}

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
        <NavLink
          to="/auth?mode=login"
          className={({ isActive }) =>
            `flex items-center gap-1 ${isActive ? 'text-[#e6ad50]' : 'text-[#666]'}`
          }
        >
          {({ isActive }) => (
            <>
              <FontAwesomeIcon icon={isActive ? faUserSolid : faUserRegular} />
              <span>Login</span>
            </>
          )}
        </NavLink>
      )}
    </div>
  );
}

export default NavActions;
