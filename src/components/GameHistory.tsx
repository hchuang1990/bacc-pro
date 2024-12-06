import React from 'react';
import { GameRecord } from '../types/game';
import BigRoad from './roads/BigRoad';
import DerivedRoads from './roads/DerivedRoads';

interface GameHistoryProps {
  history: GameRecord[];
}

export default function GameHistory({ history }: GameHistoryProps) {
  return (
    <div className="space-y-4">
      {/* Big Road - Full width */}
      <div className="w-full">
        <BigRoad records={history} />
      </div>
      
      {/* Derived Roads - Three columns on desktop, single column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DerivedRoads records={history} />
      </div>
    </div>
  );
}