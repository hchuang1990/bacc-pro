import { GameRecord } from '../../types/game';
import { AlgorithmResult } from './index';

export const frequencyAnalysis = (records: GameRecord[]): AlgorithmResult => {
  const last15Games = records.slice(-15);
  const frequencies: Record<string, number> = {
    banker: 0,
    player: 0
  };

  last15Games.forEach(game => {
    if (game.result !== 'tie') {
      frequencies[game.result]++;
    }
  });

  const total = frequencies.banker + frequencies.player;

  return {
    name: 'Frequency Analysis',
    bankerPercentage: (frequencies.banker / total) * 100,
    playerPercentage: (frequencies.player / total) * 100,
    description: 'Analyzes outcome frequencies'
  };
};