"use client";

import { useCallback, useEffect, useRef } from "react";
import { MemoryCard } from "../MemoryCard";
import { start } from "../../servcies/gemaplays.services";
import { GameOver } from "../GameOver/GameOver";
import { GameStats } from "../GameStats";
import { useGameplayStore } from "../../contexts/GameplayContext";
import { recordResult } from "../../servcies/game-results.services";

export const GameBoard = () => {
  const cards = useGameplayStore((s) => s.cards);
  const startGame = useGameplayStore((s) => s.start);
  const loadCards = useGameplayStore((s) => s.loadCard);
  const flipCard = useGameplayStore((s) => s.flipCard);
  const gameStatus = useGameplayStore((s) => s.gameStatus);
  const attempts = useGameplayStore((s) => s.attemps);
  const maxAttemps = useGameplayStore((s) => s.maxAttemps);
  const correctPairs = useGameplayStore((s) => s.correctPairs);
  const totalPairs = useGameplayStore((s) => s.totalPairs);
  const failedAttempts = useGameplayStore((s) => s.failedAttempts);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const initGame = useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const data = await start();

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
  }, [loadCards, startGame]);

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

  const saveResult = useCallback(async () => {
    await recordResult({
      correctPairs,
      failedAttempts,
      totalPairs,
    }).catch((e) => {
      console.error(e);
    });
  }, [correctPairs, failedAttempts, totalPairs]);

  const isGaveOver = gameStatus !== "playing" && gameStatus !== "loading";

  useEffect(() => {
    console.log(isGaveOver);
    if (isGaveOver) {
      saveResult();
    }
  }, [gameStatus, saveResult, isGaveOver]);

  return (
    <div className="flex flex-col gap-6">
      <GameStats
        attempts={attempts}
        maxAttempts={maxAttemps}
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
          maxAttempts={maxAttemps}
          totalPairs={totalPairs}
        />
      )}
    </div>
  );
};
