import NavActions from './NavActions';
import NavLinks from './NavLinks';

function MainNavigation() {
  return (
    <header className="h-21.25 w-full bg-white">
      <nav className="mx-auto grid h-full w-full max-w-225 grid-cols-[1fr_auto_1fr] items-center px-4 italic">
        <NavLinks />

        <p className="text-[15px] text-black">BOUTIQUE</p>

        <NavActions />
      </nav>
    </header>
  );
}

export default MainNavigation;
