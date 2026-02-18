type Outcome = 'win' | 'lose';

export class GameResult {
  constructor(
    public readonly id: string,
    public readonly playerName: string,
    public readonly playerRun: string,
    public readonly correctPairs: number,
    public readonly totalPairs: number,
    public readonly failedAttempts: number,
    public readonly outcome: Outcome,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly attempts: number,
    public readonly maxAttempts: number,
  ) {}

  static create(props: {
    playerName: string;
    playerRun: string;
    correctPairs: number;
    totalPairs: number;
    failedAttempts: number;
    attempts: number;
    maxAttempts: number;
  }): GameResult {
    const id = crypto.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    const outcome = props.correctPairs === props.totalPairs ? 'win' : 'lose';

    return new GameResult(
      id,
      props.playerName,
      props.playerRun,
      props.correctPairs,
      props.totalPairs,
      props.failedAttempts,
      outcome,
      createdAt,
      updatedAt,
      props.attempts,
      props.maxAttempts,
    );
  }

  getId() {
    return this.id;
  }

  getPlayerName() {
    return this.playerName;
  }

  getPlayerRun() {
    return this.playerRun;
  }

  getCorrectPairs() {
    return this.correctPairs;
  }

  getTotalPairs() {
    return this.totalPairs;
  }

  getFailedAttempts() {
    return this.failedAttempts;
  }

  getOutcome() {
    return this.outcome;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  getAttemps() {
    return this.attempts;
  }

  getMaxAttemps() {
    return this.maxAttempts;
  }
}
