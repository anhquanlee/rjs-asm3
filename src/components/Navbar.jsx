import NavActions from './NavActions';
import NavLinks from './NavLinks';

function MainNavigation({ children }) {
  // const token = useRouteLoaderData('root');

  return (
    <header className='italic text-black'>
      <nav>
        <NavLinks />
        <p>BOUTIQUE</p>
        <NavActions />
      </nav>
    </header>
  );
}

export default MainNavigation;
