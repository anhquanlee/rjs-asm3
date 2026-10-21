import { NavLink } from 'react-router-dom';

function NavLinks() {
  return (
    <div className="flex items-center justify-start gap-3 text-sm">
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? 'text-[#e6ad50]' : 'text-black')}
      >
        Home
      </NavLink>

      <NavLink
        to="/shop"
        className={({ isActive }) => (isActive ? 'text-[#e6ad50]' : 'text-black')}
      >
        Shop
      </NavLink>
    </div>
  );
}

export default NavLinks;
