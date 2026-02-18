import { GameResultRepository } from '../domain/game-result-repository';
import { Command } from './game-result-finder.dto';

export class GameResultFinder {
  private TOP_10_LIMIT = 10;
  constructor(private readonly repository: GameResultRepository) {}

  execute({ run }: Command) {
    return this.repository.list({
      run,
      limit: this.TOP_10_LIMIT,
    });
  }
}
