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
  const bigRoad: BigRoadCell[] = [];
  let currentCol = 0;
  let currentRow = 0;
  let lastResult: 'banker' | 'player' | 'tie' | null = null;

  records.forEach((record) => {
    if (record.result === 'tie') {
      // For ties, add to the last position if exists
      if (bigRoad.length > 0) {
        bigRoad.push({
          result: 'tie',
          position: {
            row: bigRoad[bigRoad.length - 1].position.row,
            col: bigRoad[bigRoad.length - 1].position.col,
          },
        });
      }
      return;
    }

    if (lastResult === null || lastResult !== record.result) {
      // Start new column
      currentCol++;
      currentRow = 0;
    } else {
      // Continue in same column, next row
      currentRow++;
      // If we reach max rows, start new column
      if (currentRow >= 6) {
        currentCol++;
        currentRow = 0;
      }
    }

    bigRoad.push({
      result: record.result,
      position: {
        row: currentRow,
        col: currentCol - 1, // Adjust to 0-based index
      },
    });

    lastResult = record.result;
  });

  return bigRoad;
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