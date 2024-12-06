import React, { useState } from 'react';
import { GameResult } from '../types/game';
import { CircleDollarSign, Wallet, Users } from 'lucide-react';

interface GameInputProps {
  onNewGame: (result: GameResult) => void;
  currentInning: number;
  disabled: boolean;
}

export default function GameInput({ onNewGame, currentInning, disabled }: GameInputProps) {
  const [selectedResult, setSelectedResult] = useState<GameResult | null>(null);

  const handleSubmit = () => {
    if (selectedResult) {
      onNewGame(selectedResult);
      setSelectedResult(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Record New Result</h2>
        <span className="text-lg font-medium text-indigo-600">
          Inning: {currentInning}/60
        </span>
      </div>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setSelectedResult('banker')}
          disabled={disabled}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            selectedResult === 'banker'
              ? 'bg-green-600 text-white'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Wallet size={20} />
          Banker
        </button>
        <button
          onClick={() => setSelectedResult('player')}
          disabled={disabled}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            selectedResult === 'player'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Users size={20} />
          Player
        </button>
        <button
          onClick={() => setSelectedResult('tie')}
          disabled={disabled}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            selectedResult === 'tie'
              ? 'bg-gray-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <CircleDollarSign size={20} />
          Tie
        </button>
      </div>
      <button
        onClick={handleSubmit}
        disabled={!selectedResult || disabled}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        Record Result
      </button>
    </div>
  );
}