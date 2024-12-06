import { create } from 'zustand';
import { Game, GameResult } from '../types/game';

interface GameStore {
  games: Game[];
  currentGameId: string | null;
  showAnalysis: boolean;
  setShowAnalysis: (show: boolean) => void;
  createGame: () => void;
  addGameResult: (result: GameResult) => void;
  deleteLastRecord: () => void;
  setCurrentGameId: (id: string) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  games: [],
  currentGameId: null,
  showAnalysis: false,

  setShowAnalysis: (show) => set({ showAnalysis: show }),

  createGame: () => {
    const { games } = get();
    const newGame: Game = {
      id: Date.now().toString(),
      name: `Game ${games.length + 1}`,
      createdAt: Date.now(),
      records: []
    };
    set((state) => ({ 
      games: [...state.games, newGame],
      currentGameId: newGame.id 
    }));
  },

  addGameResult: (result) => {
    const { games, currentGameId } = get();
    const currentGame = games.find(game => game.id === currentGameId);
    if (!currentGame || currentGame.records.length >= 60) return;

    const newRecord = {
      id: Date.now().toString(),
      result,
      timestamp: Date.now(),
      inning: currentGame.records.length + 1
    };

    set((state) => ({
      games: state.games.map(game =>
        game.id === currentGameId
          ? { ...game, records: [...game.records, newRecord] }
          : game
      )
    }));
  },

  deleteLastRecord: () => {
    const { games, currentGameId } = get();
    const currentGame = games.find(game => game.id === currentGameId);
    if (!currentGame || currentGame.records.length === 0) return;

    set((state) => ({
      games: state.games.map(game =>
        game.id === currentGameId
          ? { ...game, records: game.records.slice(0, -1) }
          : game
      )
    }));
  },

  setCurrentGameId: (id) => set({ currentGameId: id })
})); 