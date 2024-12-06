import { GameRecord } from '../../types/game';
import { AlgorithmResult } from './index';

export const patternAnalysis = (records: GameRecord[]): AlgorithmResult => {
  const last5Games = records.slice(-5);
  const bankerCount = last5Games.filter(game => game.result === 'banker').length;
  const playerCount = last5Games.filter(game => game.result === 'player').length;
  const total = bankerCount + playerCount;

  return {
    name: 'Pattern Analysis',
    bankerPercentage: total > 0 ? (bankerCount / total) * 100 : 50,
    playerPercentage: total > 0 ? (playerCount / total) * 100 : 50,
    description: 'Analyzes recent game patterns'
  };
};