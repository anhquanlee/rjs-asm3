import { NavLink } from 'react-router-dom';

export default function NavLinks() {
  return (
    <ul>
      <li>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? '' : undefined)}
          end>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/shop'
          className={({ isActive }) => (isActive ? '' : undefined)}>
          Shop
        </NavLink>
      </li>
    </ul>
  );
}
