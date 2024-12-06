import React, { useState, useEffect } from 'react';
import { GameResult, GameRecord, Game } from '../types/game';
import BigRoad from './roads/BigRoad';
import DerivedRoads from './roads/DerivedRoads';
import AlgorithmAnalysis from './AlgorithmAnalysis';
import { BarChart2, Plus, RotateCcw, Layout, Play } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export default function GameDashboard() {
  const { 
    games, 
    currentGameId, 
    showAnalysis,
    createGame,
    addGameResult,
    deleteLastRecord,
    setCurrentGameId,
    setShowAnalysis 
  } = useGameStore();

  const currentGame = games.find(game => game.id === currentGameId);

  useEffect(() => {
    if (games.length > 0 && !currentGameId) {
      setCurrentGameId(games[0].id);
    }
  }, [games, currentGameId, setCurrentGameId]);

  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Layout className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">No Games Yet</h2>
        <p className="text-gray-500 mb-6">Start by creating your first game</p>
        <button
          onClick={createGame}
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
            onClick={createGame}
            className="btn-secondary flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} />
            New Game
          </button>
          <button
          onClick={() => setShowAnalysis(true)}
          className="btn-primary flex items-center justify-center gap-2"
          disabled={!currentGame || currentGame.records.length === 0}
        >
          <Play size={20} />
          Run Prediction
        </button>
        </div>
      </div>

      {/* Roads Display */}
      {currentGame && (
        <div className="space-y-4 mb-24">
          <div className="w-full overflow-x-auto">
            <BigRoad records={currentGame.records} />
          </div>
          <div className="w-full">
            <DerivedRoads records={currentGame.records} />
          </div>
        </div>
      )}

      {/* Fixed Bottom Control Panel */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="container mx-auto max-w-md flex gap-2">
          <button
            onClick={() => addGameResult('banker')}
            className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
            disabled={!currentGame}
          >
            Banker
          </button>
          <button
            onClick={() => addGameResult('player')}
            className="flex-1 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            disabled={!currentGame}
          >
            Player
          </button>
          <button
            onClick={() => addGameResult('tie')}
            className="flex-1 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
            disabled={!currentGame}
          >
            Tie
          </button>
          <button
            onClick={deleteLastRecord}
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