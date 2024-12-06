import React from 'react';
import { GameRecord, BigRoadCell } from '../../types/game';
import { calculateBigRoad } from '../../utils/roadCalculations';

interface BigRoadProps {
  records: GameRecord[];
}

export default function BigRoad({ records }: BigRoadProps) {
  const bigRoad = calculateBigRoad(records);
  const rows = 6;
  const cols = 32;

  // Create a 2D array to represent the grid
  const grid: (BigRoadCell | null)[][] = Array.from({ length: rows }, () => 
    Array.from({ length: cols }, () => null)
  );

  // Create a map to track ties at each position
  const tieMap = new Map<string, number>();

  // Fill the grid with actual data
  bigRoad.forEach(cell => {
    if (cell.position.row < rows && cell.position.col < cols) {
      const key = `${cell.position.row}-${cell.position.col}`;
      if (cell.result === 'tie') {
        const count = tieMap.get(key) || 0;
        tieMap.set(key, count + 1);
      } else {
        grid[cell.position.row][cell.position.col] = cell;
      }
    }
  });

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-3">Big Road</h3>
      <div className="overflow-x-auto">
        <div className="border border-gray-300 rounded">
          <div 
            className="grid" 
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(2rem, 1fr))`,
              gridTemplateRows: `repeat(${rows}, 2rem)`,
              gap: '1px',
              background: '#e5e7eb',
              padding: '1px',
            }}
          >
            {grid.flat().map((cell, index) => {
              const row = Math.floor(index / cols);
              const col = index % cols;
              const key = `${row}-${col}`;
              const tieCount = tieMap.get(key) || 0;

              return (
                <div
                  key={index}
                  className="relative flex items-center justify-center bg-white"
                >
                  {cell && (
                    <div
                      className={`
                        w-7 h-7 rounded-full flex items-center justify-center relative
                        ${cell.result === 'banker'
                          ? 'bg-red-500 text-white'
                          : 'bg-blue-500 text-white'
                        }
                      `}
                    >
                      {cell.result === 'banker' ? '庄' : '闲'}
                      {tieCount > 0 && (
                        <div 
                          className="absolute -top-1 -right-1 text-[10px] bg-yellow-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center"
                        >
                          {tieCount}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}