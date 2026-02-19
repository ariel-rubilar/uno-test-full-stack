import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from './auth.tokens';
import { UserIdentifier } from './application/identifier';
import { UserRepository } from './domain/repository';
import { AuthController } from './auth.controller';
import { SessionModule } from 'src/shared/infractucture/session/session.module';
import { UserGetter } from './application/getter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistence/postgres/user.entity';
import { TypeOrmUserRepository } from './infrastructure/persistence/postgres/user-repository';

@Module({
  imports: [SessionModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [
    TypeOrmUserRepository,
    {
      provide: USER_REPOSITORY,
      useClass: TypeOrmUserRepository,
    },
    {
      provide: UserIdentifier,
      useFactory: (repo: UserRepository) => new UserIdentifier(repo),
      inject: [USER_REPOSITORY],
    },
    {
      provide: UserGetter,
      useFactory: (repo: UserRepository) => new UserGetter(repo),
      inject: [USER_REPOSITORY],
    },
  ],
  exports: [UserIdentifier],
  controllers: [AuthController],
})
export class AuthModule {}
