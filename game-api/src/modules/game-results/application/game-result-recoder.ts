import { GameResult } from '../domain/game-result';
import { GameResultRepository } from '../domain/game-result-repository';
import { Commad } from './game-result-recoder.dto';

export class GameResultRecoder {
  constructor(private readonly repository: GameResultRepository) {}

  execute({
    playerName,
    correctPairs,
    failedAttempts,
    playerRun,
    totalPairs,
    attempts,
    maxAttempts,
  }: Commad) {
    const result = GameResult.create({
      playerName,
      playerRun,
      correctPairs,
      totalPairs,
      failedAttempts,
      attempts,
      maxAttempts,
    });

    return this.repository.save(result);
  }
}
