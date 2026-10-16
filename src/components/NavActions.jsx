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

function NavActions() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);

  const isCartActive = location.pathname === '/cart';
  const isLoginActive = location.pathname === '/auth';

  function handleLogout() {
    localStorage.removeItem('currentUser');
    dispatch(ON_LOGOUT());
    navigate('/');
  }

  return (
    <div className="flex items-center justify-end gap-3 text-[11px]">
      <button
        type="button"
        className={`flex cursor-pointer items-center gap-1 ${
          isCartActive ? 'text-[#e6ad50]' : 'text-[#666]'
        }`}
        onClick={() => navigate('/cart')}
      >
        <FontAwesomeIcon icon={faCartShopping} />
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
