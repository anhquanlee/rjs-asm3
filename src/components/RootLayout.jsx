import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import MainNavigation from './Navbar';

function RootLayout() {
  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />

      <main className="mx-auto flex min-h-95.75 w-full max-w-235 items-center justify-center bg-[#fff0dc] text-black">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default RootLayout;
