import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Layout } from 'lucide-react';

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Layout className="h-6 w-6 text-accent" />
            <span className="font-bold text-xl text-text-primary">Baccarat Analysis</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {user ? (
              // Member navigation
              <>
                <Link
                  to="/dashboard"
                  className={`nav-link ${isActive('/dashboard') ? 'text-accent font-medium' : ''}`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/pricing"
                  className={`nav-link ${isActive('/pricing') ? 'text-accent font-medium' : ''}`}
                >
                  Plans
                </Link>
                <Link
                  to="/account"
                  className={`nav-link ${isActive('/account') ? 'text-accent font-medium' : ''}`}
                >
                  Account
                </Link>
              </>
            ) : (
              // Guest navigation
              <>
                <Link
                  to="/"
                  className={`nav-link ${isActive('/') ? 'text-accent font-medium' : ''}`}
                >
                  Home
                </Link>
                <Link
                  to="/pricing"
                  className={`nav-link ${isActive('/pricing') ? 'text-accent font-medium' : ''}`}
                >
                  Plans
                </Link>
                <Link
                  to="/use-cases"
                  className={`nav-link ${isActive('/use-cases') ? 'text-accent font-medium' : ''}`}
                >
                  Use Cases
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}