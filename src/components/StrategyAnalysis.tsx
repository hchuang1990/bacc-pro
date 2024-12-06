import React from 'react';
import { Strategy } from '../types/game';
import { TrendingUp } from 'lucide-react';

interface StrategyAnalysisProps {
  strategies: Strategy[];
}

export default function StrategyAnalysis({ strategies }: StrategyAnalysisProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <TrendingUp size={24} className="text-indigo-600" />
        Strategy Analysis
      </h2>
      <div className="space-y-4">
        {strategies.map((strategy, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">{strategy.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{strategy.description}</p>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">Banker Probability</div>
                <div className="text-lg font-semibold text-green-600">
                  {strategy.bankerProbability.toFixed(1)}%
                </div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">Player Probability</div>
                <div className="text-lg font-semibold text-blue-600">
                  {strategy.playerProbability.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}