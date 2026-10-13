import { Outlet } from 'react-router-dom';
import MainNavigation from './Navbar';

function RootLayout() {
  return (
    <div className='min-h-screen bg-white'>
      <MainNavigation />

      <main className='mx-auto flex min-h-95.75 w-full max-w-175 items-center justify-center bg-[#fff0dc] text-black'>
        <Outlet />
      </main>

      <footer className='mx-4 h-45.5 bg-[#111] italic'>
        <div className='mx-auto grid h-full w-full max-w-175 grid-cols-3 pt-11'>
          <div>
            <h3 className='mb-2.5 text-[12px] font-normal text-white'>
              CUSTOMER SERVICES
            </h3>

            <ul className='space-y-0.5 text-[9px] leading-3.25 text-[#666]'>
              <li>
                <a href='#'>Help & Contact Us</a>
              </li>
              <li>
                <a href='#'>Returns & Refunds</a>
              </li>
              <li>
                <a href='#'>Online Stores</a>
              </li>
              <li>
                <a href='#'>Terms & Conditions</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='mb-2.5 text-[12px] font-normal text-white'>
              COMPANY
            </h3>

            <ul className='space-y-0.5 text-[9px] leading-3.25 text-[#666]'>
              <li>
                <a href='#'>What We Do</a>
              </li>
              <li>
                <a href='#'>Available Services</a>
              </li>
              <li>
                <a href='#'>Latest Posts</a>
              </li>
              <li>
                <a href='#'>FAQs</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='mb-2.5 text-[12px] font-normal text-white'>
              SOCIAL MEDIA
            </h3>

            <ul className='space-y-0.5 text-[9px] leading-3.25 text-[#666]'>
              <li>
                <a href='#'>Twitter</a>
              </li>
              <li>
                <a href='#'>Instagram</a>
              </li>
              <li>
                <a href='#'>Facebook</a>
              </li>
              <li>
                <a href='#'>Pinterest</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default RootLayout;
