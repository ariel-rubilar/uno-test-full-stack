export type GameCard = {
  id: number;
  url: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export type GameplayStore = {
  cards: GameCard[];
  attempts: number;
  flippedIds: [string, string];
  correctPairs: number;
  gameStatus: GameStatus;
};

export interface GameResult {
  id: string;
  playerName: string;
  playerNickname: string;
  totalPairs: number;
  correctPairs: number;
  attempts: number;
  maxAttempts: number;
  won: boolean;
  date: string;
}

export type GameStatus = "playing" | "won" | "lost";
