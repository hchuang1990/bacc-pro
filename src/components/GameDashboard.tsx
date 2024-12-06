import React, { useState, useEffect } from 'react';
import { GameResult, GameRecord, Game } from '../types/game';
import BigRoad from './roads/BigRoad';
import DerivedRoads from './roads/DerivedRoads';
import AlgorithmAnalysis from './AlgorithmAnalysis';
import { BarChart2, Plus, RotateCcw, Layout } from 'lucide-react';

export default function GameDashboard() {
  const [games, setGames] = useState<Game[]>([]);
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    if (games.length > 0 && !currentGameId) {
      setCurrentGameId(games[0].id);
    }
  }, [games]);

  const currentGame = games.find(game => game.id === currentGameId);

  const handleCreateGame = () => {
    const newGame: Game = {
      id: Date.now().toString(),
      name: `Game ${games.length + 1}`,
      createdAt: Date.now(),
      records: []
    };
    setGames([...games, newGame]);
    setCurrentGameId(newGame.id);
  };

  const handleNewResult = (result: GameResult) => {
    if (!currentGame || currentGame.records.length >= 60) return;

    const newRecord: GameRecord = {
      id: Date.now().toString(),
      result,
      timestamp: Date.now(),
      inning: currentGame.records.length + 1
    };

    const updatedGames = games.map(game => 
      game.id === currentGameId
        ? { ...game, records: [...game.records, newRecord] }
        : game
    );

    setGames(updatedGames);
  };

  const handleDeleteLastRecord = () => {
    if (!currentGame || currentGame.records.length === 0) return;

    const updatedGames = games.map(game => 
      game.id === currentGameId
        ? { 
            ...game, 
            records: game.records.slice(0, -1)
          }
        : game
    );

    setGames(updatedGames);
  };

  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Layout className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">No Games Yet</h2>
        <p className="text-gray-500 mb-6">Start by creating your first game</p>
        <button
          onClick={handleCreateGame}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Create New Game
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-32 md:pb-24">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-stretch md:items-center mb-6">
        <div className="flex items-center gap-4 flex-1">
          <select
            value={currentGameId || ''}
            onChange={(e) => setCurrentGameId(e.target.value)}
            className="input-field flex-1"
          >
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.name} ({game.records.length}/60)
              </option>
            ))}
          </select>
          <button
            onClick={handleCreateGame}
            className="btn-secondary flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} />
            New
          </button>
        </div>
        <button
          onClick={() => setShowAnalysis(true)}
          className="btn-primary flex items-center justify-center gap-2"
          disabled={!currentGame || currentGame.records.length === 0}
        >
          <BarChart2 size={20} />
          Analyze Patterns
        </button>
      </div>

      {/* Roads Display */}
      {currentGame && (
        <div className="space-y-4 mb-24">
          <div className="overflow-x-auto">
            <BigRoad records={currentGame.records} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DerivedRoads records={currentGame.records} />
          </div>
        </div>
      )}

      {/* Fixed Bottom Control Panel */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="container mx-auto max-w-md flex gap-2">
          <button
            onClick={() => handleNewResult('banker')}
            className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
            disabled={!currentGame}
          >
            Banker
          </button>
          <button
            onClick={() => handleNewResult('player')}
            className="flex-1 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            disabled={!currentGame}
          >
            Player
          </button>
          <button
            onClick={() => handleNewResult('tie')}
            className="flex-1 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
            disabled={!currentGame}
          >
            Tie
          </button>
          <button
            onClick={handleDeleteLastRecord}
            className="w-12 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center"
            disabled={!currentGame || currentGame.records.length === 0}
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      {/* Analysis Modal */}
      {showAnalysis && (
        <AlgorithmAnalysis 
          gameRecords={currentGame?.records || []} 
          onClose={() => setShowAnalysis(false)}
        />
      )}
    </div>
  );
}