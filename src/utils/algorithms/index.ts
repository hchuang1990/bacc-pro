import { GameRecord } from '../../types/game';
import { patternAnalysis } from './patternAnalysis';
import { streakAnalysis } from './streakAnalysis';
import { alternationAnalysis } from './alternationAnalysis';
import { trendAnalysis } from './trendAnalysis';
import { zoneAnalysis } from './zoneAnalysis';
import { frequencyAnalysis } from './frequencyAnalysis';
import { distributionAnalysis } from './distributionAnalysis';
import { cycleAnalysis } from './cycleAnalysis';
import { sequenceAnalysis } from './sequenceAnalysis';
import { combinedAnalysis } from './combinedAnalysis';

export interface AlgorithmResult {
  name: string;
  bankerPercentage: number;
  playerPercentage: number;
  description: string;
}

export const runAllAlgorithms = (records: GameRecord[]): AlgorithmResult[] => {
  return [
    patternAnalysis(records),
    streakAnalysis(records),
    alternationAnalysis(records),
    trendAnalysis(records),
    zoneAnalysis(records),
    frequencyAnalysis(records),
    distributionAnalysis(records),
    cycleAnalysis(records),
    sequenceAnalysis(records),
    combinedAnalysis(records)
  ];
};