import React from 'react';
import { useAuthStore } from '../../store/authStore';
import Navbar from './Navbar';
import MobileNav from './MobileNav';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-app-bg">
      <Navbar />
      <main className="container mx-auto px-4 py-4 pb-20 md:py-8 md:pb-8">
        {children}
      </main>
      {user && <MobileNav />}
    </div>
  );
}