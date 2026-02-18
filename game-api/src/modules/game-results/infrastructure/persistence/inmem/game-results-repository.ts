import { Injectable } from '@nestjs/common';
import { GameResult } from 'src/modules/game-results/domain/game-result';
import { GameResultRepository } from 'src/modules/game-results/domain/game-result-repository';

@Injectable()
export class InMemoryGameResultsRepository implements GameResultRepository {
  private results: GameResult[] = [];

  save(result: GameResult): Promise<void> {
    this.results.push(result);
    return Promise.resolve();
  }

  list(options?: {
    limit?: number;
    offset?: number;
    run?: string;
  }): Promise<GameResult[]> {
    const reversed = this.results.toReversed();

    const results = reversed.filter((result) =>
      options?.run ? result.getPlayerRun() === options.run : true,
    );

    const offset = options?.offset || 0;
    const limit = options?.limit || 10;

    return Promise.resolve(results.slice(offset, offset + limit));
  }
}
