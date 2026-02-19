import { Module } from '@nestjs/common';

import { SessionModule } from '../../shared/infractucture/session/session.module';

import { GameResultsController } from './game-reults.controller';
import { GAME_RESULT_REPOSITORY } from './game-results.token';
import { GameResultRecoder } from './application/game-result-recoder';
import { GameResultRepository } from './domain/game-result-repository';
import { GameResultFinder } from './application/game-result-finder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameResultEntity } from './infrastructure/persistence/postgres/game-result.entity';
import { TypeOrmGameResultsRepository } from './infrastructure/persistence/postgres/game-results-repository';

@Module({
  imports: [SessionModule, TypeOrmModule.forFeature([GameResultEntity])],
  providers: [
    TypeOrmGameResultsRepository,
    {
      provide: GAME_RESULT_REPOSITORY,
      useClass: TypeOrmGameResultsRepository,
    },
    {
      provide: GameResultRecoder,
      useFactory: (repo: GameResultRepository) => new GameResultRecoder(repo),
      inject: [GAME_RESULT_REPOSITORY],
    },
    {
      provide: GameResultFinder,
      useFactory: (repo: GameResultRepository) => new GameResultFinder(repo),
      inject: [GAME_RESULT_REPOSITORY],
    },
  ],
  exports: [GameResultRecoder],
  controllers: [GameResultsController],
})
export class GameResultsModule {}
