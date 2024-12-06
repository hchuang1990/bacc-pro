import { GameResult, GameRecord } from '../types/game';

export interface BeadRoadCell {
  result: GameResult;
  position: { row: number; col: number };
}

export interface BigRoadCell {
  result: GameResult;
  position: { row: number; col: number };
  streak: number;
}

export interface DerivedRoadCell {
  value: boolean;
  position: { row: number; col: number };
}

export const calculateBeadRoad = (records: GameRecord[]): BeadRoadCell[] => {
  return records.map((record, index) => ({
    result: record.result,
    position: {
      row: Math.floor(index / 6),
      col: index % 6
    }
  }));
};

export const calculateBigRoad = (records: GameRecord[]): BigRoadCell[] => {
  const cells: BigRoadCell[] = [];
  let currentCol = 0;
  let currentRow = 0;
  let streak = 1;
  
  for (let i = 0; i < records.length; i++) {
    const current = records[i];
    const previous = records[i - 1];
    
    if (previous && current.result === previous.result) {
      currentRow++;
      streak++;
    } else {
      currentCol++;
      currentRow = 0;
      streak = 1;
    }
    
    cells.push({
      result: current.result,
      position: { row: currentRow, col: currentCol },
      streak
    });
  }
  
  return cells;
};

export const calculateDerivedRoad = (bigRoad: BigRoadCell[], offset: number): DerivedRoadCell[] => {
  const cells: DerivedRoadCell[] = [];
  
  for (let i = offset; i < bigRoad.length; i++) {
    const current = bigRoad[i];
    const previous = bigRoad[i - offset];
    
    if (!previous) continue;
    
    const value = current.streak === previous.streak;
    
    cells.push({
      value,
      position: {
        row: Math.floor((i - offset) / 6),
        col: (i - offset) % 6
      }
    });
  }
  
  return cells;
};