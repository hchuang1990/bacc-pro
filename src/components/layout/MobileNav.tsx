import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, User } from 'lucide-react';

export default function MobileNav() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around items-center h-16">
        <Link
          to="/dashboard"
          className={`flex flex-col items-center space-y-1 px-4 ${
            isActive('/dashboard') ? 'text-accent' : 'text-text-secondary'
          }`}
        >
          <LayoutDashboard size={24} />
          <span className="text-xs">Board</span>
        </Link>
        <Link
          to="/account"
          className={`flex flex-col items-center space-y-1 px-4 ${
            isActive('/account') ? 'text-accent' : 'text-text-secondary'
          }`}
        >
          <User size={24} />
          <span className="text-xs">Account</span>
        </Link>
      </div>
    </nav>
  );
}