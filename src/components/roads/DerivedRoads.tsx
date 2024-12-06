import React from 'react';
import { GameRecord } from '../../types/game';
import { 
  calculateBigRoad, 
  calculateBigEyeRoad, 
  calculateSmallRoad, 
  calculateCockroachRoad 
} from '../../utils/roadCalculations';

interface DerivedRoadsProps {
  records: GameRecord[];
}

export default function DerivedRoads({ records }: DerivedRoadsProps) {
  const bigRoad = calculateBigRoad(records);
  const bigEyeRoad = calculateBigEyeRoad(bigRoad);
  const smallRoad = calculateSmallRoad(bigRoad);
  const cockroachRoad = calculateCockroachRoad(bigRoad);

  const renderDerivedRoad = (
    title: string,
    road: Array<{ value: boolean; position: { row: number; col: number } }>,
    redColor: string,
    blueColor: string,
    columns: number
  ) => {
    const rows = 6;
    
    // Create a 2D grid
    const grid = Array.from({ length: rows }, () => 
      Array.from({ length: columns }, () => null)
    );

    // Fill the grid with road data
    road.forEach(cell => {
      if (cell.position.row < rows && cell.position.col < columns) {
        grid[cell.position.row][cell.position.col] = cell;
      }
    });

    return (
      <div className="bg-white p-4 rounded-lg shadow" style={{ width: '100%' }}>
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <div className="grid gap-px" style={{ 
          gridTemplateColumns: `repeat(${columns}, minmax(1.75rem, 1fr))`,
          gridTemplateRows: `repeat(${rows}, 1.75rem)`
        }}>
          {grid.flat().map((cell, index) => (
            <div
              key={index}
              className={`flex items-center justify-center text-xs ${
                cell
                  ? cell.value
                    ? redColor
                    : blueColor
                  : 'border border-gray-200'
              }`}
            >
              {cell && (cell.value ? '●' : '○')}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-4">
      {renderDerivedRoad('Big Eye Boy Road', bigEyeRoad, 'bg-red-500 text-white', 'bg-blue-500 text-white', 12)}
      {renderDerivedRoad('Small Road', smallRoad, 'bg-red-500 text-white', 'bg-blue-500 text-white', 10)}
      {renderDerivedRoad('Cockroach Road', cockroachRoad, 'bg-red-500 text-white', 'bg-blue-500 text-white', 10)}
    </div>
  );
}