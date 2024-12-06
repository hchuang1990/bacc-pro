import { GameRecord } from '../../types/game';
import { AlgorithmResult } from './index';

export const trendAnalysis = (records: GameRecord[]): AlgorithmResult => {
  const last10Games = records.slice(-10);
  const segments = [
    last10Games.slice(0, 5),
    last10Games.slice(-5)
  ];

  const trends = segments.map(segment => {
    const bankerCount = segment.filter(game => game.result === 'banker').length;
    return bankerCount / segment.length;
  });

  const trendDifference = trends[1] - trends[0];

  return {
    name: 'Trend Analysis',
    bankerPercentage: 50 + (trendDifference * 50),
    playerPercentage: 50 - (trendDifference * 50),
    description: 'Analyzes result trends'
  };
};