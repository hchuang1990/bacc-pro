import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Settings, CreditCard, Shield } from 'lucide-react';

export default function AccountSettings() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <Settings className="text-indigo-600" />
        Account Settings
      </h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="text-gray-500" />
          Profile Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subscription Status
            </label>
            <p className="mt-1 text-gray-900 capitalize">{user.subscription || 'Free'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="text-gray-500" />
          Billing Information
        </h3>
        <p className="text-gray-600 mb-4">Manage your subscription and billing details</p>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
          Manage Subscription
        </button>
      </div>

      <button
        onClick={() => signOut()}
        className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}