import React from 'react';
import { GameRecord } from '../../types/game';
import { calculateBigRoad } from '../../utils/roadCalculations';

interface BigRoadProps {
  records: GameRecord[];
}

export default function BigRoad({ records }: BigRoadProps) {
  const bigRoad = calculateBigRoad(records);
  const rows = 6;
  const cols = 32; // Extended columns for better visibility

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Big Road</h3>
      <div className="overflow-x-auto">
        <div className="grid gap-px" style={{ 
          gridTemplateColumns: `repeat(${cols}, minmax(1.75rem, 1fr))`,
          gridTemplateRows: `repeat(${rows}, 1.75rem)`
        }}>
          {Array.from({ length: rows * cols }).map((_, index) => {
            const cell = bigRoad.find(
              cell => cell.position.row * cols + cell.position.col === index
            );
            
            return (
              <div
                key={index}
                className={`flex items-center justify-center text-sm ${
                  cell
                    ? cell.result === 'banker'
                      ? 'bg-red-500 text-white'
                      : cell.result === 'player'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-500 text-white'
                    : 'border border-gray-200'
                }`}
              >
                {cell && (cell.result === 'banker' ? '庄' : cell.result === 'player' ? '闲' : '和')}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}