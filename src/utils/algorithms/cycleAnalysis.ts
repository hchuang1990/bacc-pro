import { GameRecord } from '../../types/game';
import { AlgorithmResult } from './index';

export const cycleAnalysis = (records: GameRecord[]): AlgorithmResult => {
  const last12Games = records.slice(-12);
  const cycles: Array<{ banker: number; player: number }> = [];
  
  for (let i = 0; i < last12Games.length; i += 4) {
    const cycle = last12Games.slice(i, i + 4);
    const bankerCount = cycle.filter(game => game.result === 'banker').length;
    const playerCount = cycle.filter(game => game.result === 'player').length;
    cycles.push({ banker: bankerCount, player: playerCount });
  }

  const totalBanker = cycles.reduce((sum, cycle) => sum + cycle.banker, 0);
  const totalPlayer = cycles.reduce((sum, cycle) => sum + cycle.player, 0);
  const total = totalBanker + totalPlayer;

  return {
    name: 'Cycle Analysis',
    bankerPercentage: (totalBanker / total) * 100,
    playerPercentage: (totalPlayer / total) * 100,
    description: 'Analyzes cyclic patterns'
  };
};