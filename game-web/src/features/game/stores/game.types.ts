export type GameCard = {
  id: string;
  value: string;
  url: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
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

export type GameStatus = "playing" | "won" | "lost" | "loading";

export type GameplayStore = {
  cards: GameCard[];
  attempts: number;
  flippedIds: string[];
  correctPairs: number;
  gameStatus: GameStatus;
  start: () => void;
  maxAttempts: number;
  flipCard: (id: string) => void;
  timeoutId: NodeJS.Timeout | null;
  totalPairs: number;
  failedAttempts: number;
  loadCard: (
    card: {
      id: string;
      value: string;
      url: string;
      label: string;
    }[],
    maxAttempts: number,
  ) => void;
  resolveFlippedCards: () => void;
};
