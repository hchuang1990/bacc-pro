import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'lucide-react';

export default function DesktopHeader() {
  return (
    <header className="hidden md:block bg-white border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold flex items-center gap-2 text-text-primary">
            <Layout className="h-6 w-6 text-accent" />
            Baccarat Analysis
          </Link>
          <nav className="space-x-6">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/analysis" className="nav-link">Analysis</Link>
            <Link to="/pricing" className="nav-link">Plans</Link>
            <Link to="/account" className="nav-link">Account</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}