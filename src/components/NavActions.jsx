import CartLink from './CartLink';
import UserMenu from './UserMenu';

function NavActions() {
  return (
    <div className='flex items-center justify-end gap-3 text-[11px] text-[#666]'>
      <CartLink />
      <UserMenu />
    </div>
  );
}

export default NavActions;
