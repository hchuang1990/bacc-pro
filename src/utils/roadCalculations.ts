import { GameResult, GameRecord, BigRoadCell, DerivedRoadCell } from '../types/game';

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
  let lastResult: GameResult | null = null;
  let streak = 1;

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
          streak: 0 // Ties don't affect streak
        });
      }
      return;
    }

    if (lastResult === null || lastResult !== record.result) {
      // Start new column
      currentCol++;
      currentRow = 0;
      streak = 1;
    } else {
      // Continue in same column, next row
      currentRow++;
      streak++;
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
      streak
    });

    lastResult = record.result;
  });

  return bigRoad;
};

// Helper function to check if a cell exists in the Big Road
const cellExists = (bigRoad: BigRoadCell[], col: number, row: number): boolean => {
  return bigRoad.some(cell => cell.position.col === col && cell.position.row === row);
};

export const calculateBigEyeRoad = (bigRoad: BigRoadCell[]): DerivedRoadCell[] => {
  const derivedRoad: DerivedRoadCell[] = [];
  let currentCol = 0;
  let currentRow = 0;

  // Start from column 2 (index 1) for Big Eye Boy
  for (let col = 1; col < 32; col++) {
    for (let row = 0; row < 6; row++) {
      // Check the relevant positions for Big Eye Boy pattern
      const hasCurrentCell = cellExists(bigRoad, col, row);
      if (!hasCurrentCell) continue;

      // Big Eye Boy comparison positions
      const B1 = cellExists(bigRoad, col - 1, row - 1);
      const B2 = cellExists(bigRoad, col - 1, row);
      const B3 = cellExists(bigRoad, col - 2, row - 1);

      // Big Eye Boy rule
      const isRed = B1 === B2;

      derivedRoad.push({
        value: isRed,
        position: {
          col: currentCol,
          row: currentRow
        }
      });

      // Update position for next entry
      currentRow++;
      if (currentRow >= 6) {
        currentRow = 0;
        currentCol++;
      }
    }
  }

  return derivedRoad;
};

export const calculateSmallRoad = (bigRoad: BigRoadCell[]): DerivedRoadCell[] => {
  const derivedRoad: DerivedRoadCell[] = [];
  let currentCol = 0;
  let currentRow = 0;

  // Start from column 3 (index 2) for Small Road
  for (let col = 2; col < 32; col++) {
    for (let row = 0; row < 6; row++) {
      const hasCurrentCell = cellExists(bigRoad, col, row);
      if (!hasCurrentCell) continue;

      // Small Road comparison positions
      const S1 = cellExists(bigRoad, col - 2, row - 1);
      const S2 = cellExists(bigRoad, col - 2, row);
      const S3 = cellExists(bigRoad, col - 3, row - 1);

      // Small Road rule
      const isRed = S1 === S2;

      derivedRoad.push({
        value: isRed,
        position: {
          col: currentCol,
          row: currentRow
        }
      });

      currentRow++;
      if (currentRow >= 6) {
        currentRow = 0;
        currentCol++;
      }
    }
  }

  return derivedRoad;
};

export const calculateCockroachRoad = (bigRoad: BigRoadCell[]): DerivedRoadCell[] => {
  const derivedRoad: DerivedRoadCell[] = [];
  let currentCol = 0;
  let currentRow = 0;

  // Start from column 4 (index 3) for Cockroach Road
  for (let col = 3; col < 32; col++) {
    for (let row = 0; row < 6; row++) {
      const hasCurrentCell = cellExists(bigRoad, col, row);
      if (!hasCurrentCell) continue;

      // Cockroach Road comparison positions
      const C1 = cellExists(bigRoad, col - 3, row - 1);
      const C2 = cellExists(bigRoad, col - 3, row);
      const C3 = cellExists(bigRoad, col - 4, row - 1);

      // Cockroach Road rule
      const isRed = C1 === C2;

      derivedRoad.push({
        value: isRed,
        position: {
          col: currentCol,
          row: currentRow
        }
      });

      currentRow++;
      if (currentRow >= 6) {
        currentRow = 0;
        currentCol++;
      }
    }
  }

  return derivedRoad;
};