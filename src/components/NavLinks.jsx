import { useLocation, useNavigate } from 'react-router-dom';

function NavLinks() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex items-center justify-start gap-3 text-sm">
      <button
        type="button"
        className={`cursor-pointer ${
          location.pathname === '/' ? 'text-[#e6ad50]' : 'text-black'
        }`}
        onClick={() => navigate('/')}
      >
        Home
      </button>

      <button
        type="button"
        className={`cursor-pointer ${
          location.pathname === '/shop' ? 'text-[#e6ad50]' : 'text-black'
        }`}
        onClick={() => navigate('/shop')}
      >
        Shop
      </button>
    </div>
  );
}

export default NavLinks;
