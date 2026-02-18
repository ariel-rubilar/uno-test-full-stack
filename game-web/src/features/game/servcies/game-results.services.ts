import { apiFetch } from "@/shared/api/client";

export const recordResult = async ({
  correctPairs,
  failedAttempts,
  totalPairs,
}: {
  correctPairs: number;
  totalPairs: number;
  failedAttempts: number;
}) => {
  await apiFetch("/game-results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correctPairs, failedAttempts, totalPairs }),
  });

  return;
};
