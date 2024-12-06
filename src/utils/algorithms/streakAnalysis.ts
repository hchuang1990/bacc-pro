import { GameRecord } from '../../types/game';
import { AlgorithmResult } from './index';

export const streakAnalysis = (records: GameRecord[]): AlgorithmResult => {
  const last8Games = records.slice(-8);
  let currentStreak = 1;
  let maxStreak = 1;
  let streakResult = last8Games[0]?.result;

  for (let i = 1; i < last8Games.length; i++) {
    if (last8Games[i].result === last8Games[i - 1].result) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 1;
      streakResult = last8Games[i].result;
    }
  }

  const streakFactor = maxStreak / 8;
  return {
    name: 'Streak Analysis',
    bankerPercentage: streakResult === 'banker' ? 50 + (streakFactor * 50) : 50 - (streakFactor * 50),
    playerPercentage: streakResult === 'player' ? 50 + (streakFactor * 50) : 50 - (streakFactor * 50),
    description: 'Analyzes winning streaks'
  };
};