import React from 'react';
import { GameRecord } from '../../types/game';
import { calculateBigRoad, calculateDerivedRoad } from '../../utils/roadCalculations';

interface DerivedRoadsProps {
  records: GameRecord[];
}

export default function DerivedRoads({ records }: DerivedRoadsProps) {
  const bigRoad = calculateBigRoad(records);
  const bigEyeRoad = calculateDerivedRoad(bigRoad, 2);
  const smallRoad = calculateDerivedRoad(bigRoad, 3);
  const cockroachRoad = calculateDerivedRoad(bigRoad, 4);

  const renderDerivedRoad = (
    title: string,
    road: ReturnType<typeof calculateDerivedRoad>,
    redColor: string,
    blueColor: string
  ) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="grid gap-px" style={{ 
        gridTemplateColumns: `repeat(12, minmax(1.25rem, 1fr))`,
        gridTemplateRows: `repeat(6, 1.25rem)`
      }}>
        {Array.from({ length: 72 }).map((_, index) => {
          const cell = road.find(
            cell => cell.position.row * 12 + cell.position.col === index
          );
          
          return (
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
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {renderDerivedRoad('Big Eye Boy Road', bigEyeRoad, 'bg-red-500 text-white', 'bg-blue-500 text-white')}
      {renderDerivedRoad('Small Road', smallRoad, 'bg-red-400 text-white', 'bg-blue-400 text-white')}
      {renderDerivedRoad('Cockroach Road', cockroachRoad, 'bg-red-300 text-white', 'bg-blue-300 text-white')}
    </>
  );
}