import { GameRecord } from '../../types/game';
import { AlgorithmResult } from './index';

export const zoneAnalysis = (records: GameRecord[]): AlgorithmResult => {
  const zones = Math.ceil(records.length / 10);
  const currentZone = records.slice(-10);
  const bankerCount = currentZone.filter(game => game.result === 'banker').length;
  const playerCount = currentZone.filter(game => game.result === 'player').length;
  const total = bankerCount + playerCount;

  return {
    name: 'Zone Analysis',
    bankerPercentage: (bankerCount / total) * 100,
    playerPercentage: (playerCount / total) * 100,
    description: `Analyzes zone ${zones} patterns`
  };
};