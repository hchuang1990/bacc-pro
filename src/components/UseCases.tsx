import React from 'react';
import { TrendingUp, Shield, BarChart2, Zap } from 'lucide-react';

export default function UseCases() {
  const cases = [
    {
      title: 'Professional Players',
      description: 'Advanced analytics and pattern recognition for serious players who need comprehensive data analysis.',
      icon: TrendingUp,
    },
    {
      title: 'Casual Players',
      description: 'Easy-to-understand visualizations and basic analysis for recreational players.',
      icon: BarChart2,
    },
    {
      title: 'Teams & Groups',
      description: 'Collaborative features for teams who want to share analysis and strategies.',
      icon: Shield,
    },
    {
      title: 'Analysts',
      description: 'Deep dive into patterns and trends with our advanced analytical tools.',
      icon: Zap,
    },
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Use Cases</h2>
          <p className="mt-4 text-xl text-gray-600">
            Discover how our platform can help different types of users
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {cases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}