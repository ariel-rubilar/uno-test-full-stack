import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('game_results')
export class GameResultEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  playerRun: string;

  @Column()
  playerName: string;

  @Column()
  correctPairs: number;

  @Column()
  totalPairs: number;

  @Column()
  failedAttempts: number;

  @Column()
  outcome: string;

  @Column()
  attempts: number;

  @Column()
  maxAttempts: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
