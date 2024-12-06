import { GameRecord } from '../../types/game';
import { AlgorithmResult } from './index';

export const combinedAnalysis = (records: GameRecord[]): AlgorithmResult => {
  const last10Games = records.slice(-10);
  const bankerCount = last10Games.filter(game => game.result === 'banker').length;
  const playerCount = last10Games.filter(game => game.result === 'player').length;
  
  let alternations = 0;
  for (let i = 1; i < last10Games.length; i++) {
    if (last10Games[i].result !== last10Games[i - 1].result) {
      alternations++;
    }
  }

  const alternationFactor = alternations / (last10Games.length - 1);
  const total = bankerCount + playerCount;

  return {
    name: 'Combined Analysis',
    bankerPercentage: total > 0 ? ((bankerCount / total) * (1 - alternationFactor) * 100) : 50,
    playerPercentage: total > 0 ? ((playerCount / total) * (1 - alternationFactor) * 100) : 50,
    description: 'Combines multiple analysis methods'
  };
};