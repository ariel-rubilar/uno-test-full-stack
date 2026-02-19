import { GameResult } from '../domain/game-result';
import { GameResultRepository } from '../domain/game-result-repository';
import { Command } from './game-result-recorder.dto';

export class GameResultRecorder {
  constructor(private readonly repository: GameResultRepository) {}

  execute({
    playerName,
    correctPairs,
    failedAttempts,
    playerRun,
    totalPairs,
    attempts,
    maxAttempts,
  }: Command) {
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
