import { GameRecord } from '../../types/game';
import { AlgorithmResult } from './index';

export const distributionAnalysis = (records: GameRecord[]): AlgorithmResult => {
  const last20Games = records.slice(-20);
  let bankerRuns = 0;
  let playerRuns = 0;
  let currentRun = 1;

  for (let i = 1; i < last20Games.length; i++) {
    if (last20Games[i].result === last20Games[i - 1].result) {
      currentRun++;
    } else {
      if (last20Games[i - 1].result === 'banker') {
        bankerRuns += currentRun;
      } else if (last20Games[i - 1].result === 'player') {
        playerRuns += currentRun;
      }
      currentRun = 1;
    }
  }

  const totalRuns = bankerRuns + playerRuns;

  return {
    name: 'Distribution Analysis',
    bankerPercentage: (bankerRuns / totalRuns) * 100,
    playerPercentage: (playerRuns / totalRuns) * 100,
    description: 'Analyzes run distributions'
  };
};