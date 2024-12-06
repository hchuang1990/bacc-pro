import { GameRecord } from '../../types/game';
import { AlgorithmResult } from './index';

export const sequenceAnalysis = (records: GameRecord[]): AlgorithmResult => {
  const last7Games = records.slice(-7);
  const sequences: { [key: string]: number } = { banker: 0, player: 0 };
  
  for (let i = 0; i < last7Games.length - 2; i++) {
    const sequence = last7Games.slice(i, i + 3).map(g => g.result).join('');
    const nextResult = last7Games[i + 3]?.result;
    if (nextResult && nextResult !== 'tie') {
      sequences[nextResult]++;
    }
  }

  const total = sequences.banker + sequences.player;

  return {
    name: 'Sequence Analysis',
    bankerPercentage: total > 0 ? (sequences.banker / total) * 100 : 50,
    playerPercentage: total > 0 ? (sequences.player / total) * 100 : 50,
    description: 'Analyzes result sequences'
  };
};