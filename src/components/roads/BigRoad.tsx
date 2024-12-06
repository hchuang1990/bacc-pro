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

  // Fill the grid with actual data
  bigRoad.forEach(cell => {
    if (cell.position.row < rows && cell.position.col < cols) {
      grid[cell.position.row][cell.position.col] = cell;
    }
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Big Road</h3>
      <div className="overflow-x-auto">
        <div 
          className="grid gap-px" 
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(1.75rem, 1fr))`,
            gridTemplateRows: `repeat(${rows}, 1.75rem)`
          }}
        >
          {grid.flat().map((cell, index) => (
            <div
              key={index}
              className={`
                flex items-center justify-center text-sm border
                ${cell
                  ? cell.result === 'banker'
                    ? 'bg-red-500 text-white'
                    : cell.result === 'player'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-500 text-white'
                  : 'border-gray-200'
                }
              `}
            >
              {cell && (
                cell.result === 'banker' 
                  ? '庄' 
                  : cell.result === 'player' 
                    ? '闲' 
                    : '和'
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}