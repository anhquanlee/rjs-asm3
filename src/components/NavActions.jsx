import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import {
  faCartShopping,
  faUser as faUserSolid,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';

function NavActions() {
  const navigate = useNavigate();
  const location = useLocation();

  const isCartActive = location.pathname === '/cart';
  const isLoginActive = location.pathname === '/login';

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

      <button
        type="button"
        className={`flex cursor-pointer items-center gap-1 ${
          isLoginActive ? 'text-[#e6ad50]' : 'text-[#666]'
        }`}
        onClick={() => navigate('/login')}
      >
        <FontAwesomeIcon icon={isLoginActive ? faUserSolid : faUserRegular} />
        <span>Login</span>
      </button>
    </div>
  );
}

export default NavActions;
