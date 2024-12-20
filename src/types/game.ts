export type GameResult = 'banker' | 'player' | 'tie';

export interface GameRecord {
  result: GameResult;
  timestamp?: number;
}

export interface Game {
  id: string;
  name: string;
  createdAt: number;
  records: GameRecord[];
}

export interface Strategy {
  name: string;
  bankerProbability: number;
  playerProbability: number;
  description: string;
}

export interface RoadmapData {
  bigRoad: GameResult[];
  bigEyeBoy: boolean[];
  smallRoad: boolean[];
  cockroachPig: boolean[];
}

export interface BigRoadCell {
  result: GameResult;
  position: {
    row: number;
    col: number;
  };
}