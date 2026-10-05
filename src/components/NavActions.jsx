// components/NavActions.jsx
import CartLink from './CartLink';
import UserMenu from './UserMenu';

function NavActions() {
  return (
    <div className='nav-actions'>
      <CartLink />
      <UserMenu />
    </div>
  );
}

export default NavActions;
