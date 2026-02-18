import { GameResult } from './game-result';

type ListGameResultsOptions = {
  limit?: number;
  offset?: number;
  run?: string;
};

interface GameResultRepository {
  save: (gameResult: GameResult) => Promise<void>;
  list: (options?: ListGameResultsOptions) => Promise<GameResult[]>;
}

export type { GameResultRepository };
