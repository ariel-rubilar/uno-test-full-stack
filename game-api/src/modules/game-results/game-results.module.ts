import { Module } from '@nestjs/common';

import { SessionModule } from '../../shared/infrastructure/session/session.module';

import { GameResultsController } from './game-results.controller';
import { GAME_RESULT_REPOSITORY } from './game-results.token';
import { GameResultRecorder } from './application/game-result-recorder';
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
      provide: GameResultRecorder,
      useFactory: (repo: GameResultRepository) => new GameResultRecorder(repo),
      inject: [GAME_RESULT_REPOSITORY],
    },
    {
      provide: GameResultFinder,
      useFactory: (repo: GameResultRepository) => new GameResultFinder(repo),
      inject: [GAME_RESULT_REPOSITORY],
    },
  ],
  exports: [GameResultRecorder],
  controllers: [GameResultsController],
})
export class GameResultsModule {}
