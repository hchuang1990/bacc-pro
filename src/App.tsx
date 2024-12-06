import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './components/LandingPage';
import UseCases from './components/UseCases';
import PricingPlans from './components/subscription/PricingPlans';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import AccountSettings from './components/account/AccountSettings';
import GameDashboard from './components/GameDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/pricing" element={<PricingPlans />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginForm />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <SignUpForm />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <GameDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountSettings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;