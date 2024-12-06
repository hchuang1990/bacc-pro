import React from 'react';
import { Game } from '../types/game';
import { Plus, Table2 } from 'lucide-react';

interface GameSelectorProps {
  games: Game[];
  currentGameId: string | null;
  onGameSelect: (gameId: string) => void;
  onCreateGame: () => void;
}

export default function GameSelector({ games, currentGameId, onGameSelect, onCreateGame }: GameSelectorProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Table2 size={24} className="text-indigo-600" />
          Game Selection
        </h2>
        <button
          onClick={onCreateGame}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          New Game
        </button>
      </div>
      <select
        value={currentGameId || ''}
        onChange={(e) => onGameSelect(e.target.value)}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="" disabled>Select a game</option>
        {games.map((game) => (
          <option key={game.id} value={game.id}>
            {game.name} ({game.records.length}/60 innings)
          </option>
        ))}
      </select>
    </div>
  );
}