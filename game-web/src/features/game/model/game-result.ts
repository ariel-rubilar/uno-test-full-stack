export type GameResult = {
  id: string;
  playerName: string;
  playerRun: string;
  correctPairs: number;
  totalPairs: number;
  failedAttempts: number;
  attempts: number;
  maxAttempts: number;
  outcome: "win" | "lose";
  createdAt: string;
  updatedAt: string;
};
