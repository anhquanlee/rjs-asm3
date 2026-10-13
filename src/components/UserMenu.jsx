import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function UserMenu() {
  const navigate = useNavigate();

  return (
    <button
      type='button'
      className='flex cursor-pointer items-center gap-0.5'
      onClick={() => navigate('/login')}>
      <User size={12} strokeWidth={1.5} />
      <span>Login</span>
    </button>
  );
}

export default UserMenu;
