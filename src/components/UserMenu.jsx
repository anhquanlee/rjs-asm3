// components/UserMenu.jsx
import { useState } from 'react';
import { User, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // tuỳ bạn quản lý auth state ở đâu

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // user = null nếu chưa login
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  if (!user) {
    return (
      <div className='user-menu'>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Register</Link>
      </div>
    );
  }

  return (
    <div className='user-menu'>
      <button onClick={() => setIsOpen(!isOpen)} className='user-menu-trigger'>
        <User size={18} />
        <span>{user.name}</span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className='user-menu-dropdown'>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
