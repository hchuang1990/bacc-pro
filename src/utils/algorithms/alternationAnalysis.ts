import { GameRecord } from '../../types/game';
import { AlgorithmResult } from './index';

export const alternationAnalysis = (records: GameRecord[]): AlgorithmResult => {
  const last6Games = records.slice(-6);
  let alternations = 0;

  for (let i = 1; i < last6Games.length; i++) {
    if (last6Games[i].result !== last6Games[i - 1].result) {
      alternations++;
    }
  }

  const alternationRate = alternations / (last6Games.length - 1);
  const lastResult = last6Games[last6Games.length - 1]?.result;

  return {
    name: 'Alternation Analysis',
    bankerPercentage: lastResult === 'player' ? alternationRate * 100 : (1 - alternationRate) * 100,
    playerPercentage: lastResult === 'banker' ? alternationRate * 100 : (1 - alternationRate) * 100,
    description: 'Analyzes pattern alternations'
  };
};