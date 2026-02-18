import { apiFetch } from "@/shared/api/client";
import { GameResult } from "../model/game-result";

export const recordResult = async ({
  correctPairs,
  failedAttempts,
  totalPairs,
  attempts: attempts,
  maxAttempts,
}: {
  correctPairs: number;
  totalPairs: number;
  failedAttempts: number;
  attempts: number;
  maxAttempts: number;
}) => {
  await apiFetch("/game-results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      correctPairs,
      failedAttempts,
      totalPairs,
      attempts,
      maxAttempts,
    }),
  });

  return;
};

export const listResult = async ({ run }: { run?: string }) => {
  const query = new URLSearchParams();
  if (run) {
    query.append("run", run);
  }
  const response = await apiFetch("/game-results?" + query.toString(), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  return data as GameResult[];
};
