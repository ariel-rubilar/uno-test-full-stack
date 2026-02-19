import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameResult } from 'src/modules/game-results/domain/game-result';
import { GameResultRepository } from 'src/modules/game-results/domain/game-result-repository';
import { GameResultEntity } from './game-result.entity';

@Injectable()
export class TypeOrmGameResultsRepository implements GameResultRepository {
  constructor(
    @InjectRepository(GameResultEntity)
    private readonly repo: Repository<GameResultEntity>,
  ) {}

  async save(result: GameResult): Promise<void> {
    const entity = this.toEntity(result);
    await this.repo.save(entity);
  }

  async list(options?: {
    limit?: number;
    offset?: number;
    run?: string;
  }): Promise<GameResult[]> {
    const qb = this.repo.createQueryBuilder('game_result');
    if (options?.run) {
      qb.where('game_result.playerRun = :run', { run: options.run });
    }
    qb.orderBy('game_result.id', 'DESC');
    qb.skip(options?.offset || 0);
    qb.take(options?.limit || 10);

    const entities = await qb.getMany();
    return entities.map((e) => this.toDomain(e));
  }

  private toDomain(entity: GameResultEntity): GameResult {
    return new GameResult(
      entity.id,
      entity.playerName,
      entity.playerRun,
      entity.correctPairs,
      entity.totalPairs,
      entity.failedAttempts,
      entity.outcome as 'win' | 'lose',
      entity.createdAt,
      entity.updatedAt,
      entity.attempts,
      entity.maxAttempts,
    );
  }

  private toEntity(result: GameResult): GameResultEntity {
    return {
      id: result.getId(),
      playerRun: result.getPlayerRun(),
      attempts: result.getAttempts(),
      maxAttempts: result.getMaxAttempts(),
      playerName: result.getPlayerName(),
      correctPairs: result.getCorrectPairs(),
      totalPairs: result.getTotalPairs(),
      failedAttempts: result.getFailedAttempts(),
      outcome: result.getOutcome(),
      createdAt: result.getCreatedAt(),
      updatedAt: result.getUpdatedAt(),
    };
  }
}
