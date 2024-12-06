export type GameResult = 'banker' | 'player' | 'tie';

export interface GameRecord {
  id: string;
  result: GameResult;
  timestamp: number;
  inning: number;
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