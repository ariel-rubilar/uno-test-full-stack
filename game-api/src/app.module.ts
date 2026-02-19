import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { GameplaysModule } from './modules/gameplays/gameplays.module';
import { GameResultsModule } from './modules/game-results/game-results.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // dev only
    }),
    AuthModule,
    GameplaysModule,
    GameResultsModule,
  ],
})
export class AppModule {}
