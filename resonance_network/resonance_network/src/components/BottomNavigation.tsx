import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: 'fa-house', label: 'HOME' },
    { path: '/check-in', icon: 'fa-square-check', label: 'CHECK-IN' },
    { path: '/pods', icon: 'fa-users', label: 'PODS' },
    { path: '/profile', icon: 'fa-user', label: 'PROFILE' },
  ];

  const isActive = (path: string) => {
    if (path === '/home') {
      return location.pathname === '/home' || location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-pixel-dark border-t-2 border-retro-cyan safe-area-bottom">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center py-2 px-3 transition-all ${
              isActive(item.path)
                ? 'text-retro-cyan'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <i className={`fa ${item.icon} text-lg mb-1`}></i>
            <span className="font-pixel text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;