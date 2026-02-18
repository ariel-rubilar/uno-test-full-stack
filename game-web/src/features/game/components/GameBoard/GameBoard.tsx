"use client";

import { useCallback, useEffect, useRef } from "react";
import { MemoryCard } from "../MemoryCard";
import { GameOver } from "../GameOver/GameOver";
import { GameStats } from "../GameStats";
import { useGameplayStore } from "../../contexts/GameplayContext";
import { useRecordResult } from "../../hooks/useRecordResult";
import { useLazyStartGame } from "../../hooks/useLazyStartGame";

export const GameBoard = () => {
  const cards = useGameplayStore((s) => s.cards);
  const startGame = useGameplayStore((s) => s.start);
  const loadCards = useGameplayStore((s) => s.loadCard);
  const flipCard = useGameplayStore((s) => s.flipCard);
  const gameStatus = useGameplayStore((s) => s.gameStatus);
  const attempts = useGameplayStore((s) => s.attempts);
  const maxAttempts = useGameplayStore((s) => s.maxAttempts);
  const correctPairs = useGameplayStore((s) => s.correctPairs);
  const totalPairs = useGameplayStore((s) => s.totalPairs);
  const failedAttempts = useGameplayStore((s) => s.failedAttempts);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { mutate } = useRecordResult();

  const { refetch } = useLazyStartGame();

  const initGame = useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const { data } = await refetch();

    if (data == null) return;

    loadCards(
      data.cards.map((c) => ({
        id: c.id,
        isFlipped: true,
        isMatched: false,
        label: c.title,
        url: c.url,
        value: c.value,
      })),
      data.maxAttempts,
    );

    timeoutRef.current = setTimeout(() => {
      startGame();
    }, 1500);
  }, [loadCards, startGame, refetch]);

  useEffect(() => {
    initGame();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [initGame]);

  const handleRetry = async () => {
    await initGame();
  };

  const saveResult = useCallback(() => {
    mutate({
      correctPairs,
      failedAttempts,
      totalPairs,
      attempts,
      maxAttempts,
    });
  }, [correctPairs, failedAttempts, totalPairs, attempts, maxAttempts, mutate]);

  const isGaveOver = gameStatus !== "playing" && gameStatus !== "loading";

  useEffect(() => {
    if (isGaveOver) {
      saveResult();
    }
  }, [gameStatus, saveResult, isGaveOver]);

  return (
    <div className="flex flex-col gap-6">
      <GameStats
        attempts={attempts}
        maxAttempts={maxAttempts}
        correctPairs={correctPairs}
        totalPairs={totalPairs}
      />
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {cards.map((card) => (
          <MemoryCard
            key={card.id}
            card={card}
            onClick={flipCard}
            disabled={gameStatus !== "playing"}
          />
        ))}
      </div>
      {isGaveOver && (
        <GameOver
          attempts={attempts}
          correctPairs={correctPairs}
          onReplay={handleRetry}
          won={gameStatus === "won"}
          maxAttempts={maxAttempts}
          totalPairs={totalPairs}
        />
      )}
    </div>
  );
};
