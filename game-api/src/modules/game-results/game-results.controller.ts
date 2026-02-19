import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GameResultRecorder } from './application/game-result-recorder';
import { SessionAuthGuard } from 'src/shared/infrastructure/session/session.guard';
import { GameResultFinder } from './application/game-result-finder';

@Controller('game-results')
export class GameResultsController {
  constructor(
    private readonly recoder: GameResultRecorder,
    private readonly finder: GameResultFinder,
  ) {}

  @UseGuards(SessionAuthGuard)
  @Post()
  async save(
    @Body()
    body: {
      correctPairs: number;
      totalPairs: number;
      failedAttempts: number;
      attempts: number;
      maxAttempts: number;
    },
    @Req()
    req: Request & { userId: string; userName: string; userRun: string },
  ) {
    return this.recoder.execute({
      playerName: req.userName,
      playerRun: req.userRun,
      ...body,
    });
  }

  @Get()
  async list(@Query() query: { run?: string }) {
    return this.finder.execute({
      run: query.run,
    });
  }
}
