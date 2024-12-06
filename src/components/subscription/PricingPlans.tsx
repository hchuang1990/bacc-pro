import React from 'react';
import { Crown, Zap, Star } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: ['Basic game tracking', 'Simple analysis', 'Limited history'],
    icon: Star,
    color: 'bg-gray-100',
    buttonColor: 'bg-gray-600',
  },
  {
    name: 'Pro',
    price: '$19.99/month',
    features: ['Advanced analysis', 'Unlimited history', 'Priority support'],
    icon: Zap,
    color: 'bg-indigo-100',
    buttonColor: 'bg-indigo-600',
    popular: true,
  },
  {
    name: 'Premium',
    price: '$49.99/month',
    features: ['AI predictions', 'Custom strategies', '24/7 support'],
    icon: Crown,
    color: 'bg-purple-100',
    buttonColor: 'bg-purple-600',
  },
];

export default function PricingPlans() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Select the perfect plan for your analysis needs
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
                  plan.popular ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <div className="p-6">
                  <Icon className={`h-12 w-12 ${plan.color} p-2 rounded-md`} />
                  <h3 className="text-2xl font-semibold text-gray-900 mt-4">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-gray-500">{plan.price}</p>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex">
                        <span className="text-green-500">✓</span>
                        <span className="ml-3 text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`mt-8 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${plan.buttonColor} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {user ? 'Upgrade Now' : 'Get Started'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}