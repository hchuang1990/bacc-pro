import { GameResult, GameRecord, Strategy } from '../types/game';

export const calculateProbabilities = (gameHistory: GameRecord[]): Strategy[] => {
  const total = gameHistory.length;
  if (total === 0) return [];

  const bankerCount = gameHistory.filter(game => game.result === 'banker').length;
  const playerCount = gameHistory.filter(game => game.result === 'player').length;

  const strategies: Strategy[] = [
    {
      name: 'Basic Probability',
      bankerProbability: (bankerCount / total) * 100,
      playerProbability: (playerCount / total) * 100,
      description: 'Simple historical win rate analysis'
    },
    {
      name: 'Trend Analysis',
      bankerProbability: calculateTrendProbability(gameHistory, 'banker'),
      playerProbability: calculateTrendProbability(gameHistory, 'player'),
      description: 'Analysis based on recent trend patterns'
    }
  ];

  return strategies;
};

const calculateTrendProbability = (history: GameRecord[], type: 'banker' | 'player'): number => {
  if (history.length < 3) return 50;
  
  const recentGames = history.slice(-3);
  const streakCount = recentGames.filter(game => game.result === type).length;
  
  return ((streakCount / 3) * 100);
};