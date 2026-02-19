import { GameplayStore, GameStatus } from "./game.types";
import { createStore } from "zustand/vanilla";

export const createGameplayStore = ({
  checkDelay = 800,
}: {
  checkDelay?: number;
}) =>
  createStore<GameplayStore>((set) => ({
    attempts: 0,
    cards: [],
    correctPairs: 0,
    flippedIds: [],
    gameStatus: "loading",
    maxAttempts: 0,
    timeoutId: null,
    totalPairs: 0,
    failedAttempts: 0,
    start: () => {
      set((state) => {
        if (state.timeoutId) clearTimeout(state.timeoutId);

        return {
          attempts: 0,
          cards: state.cards.map((c) => ({
            ...c,
            isFlipped: false,
            isMatched: false,
          })),
          gameStatus: "playing",
          correctPairs: 0,
          flippedIds: [],
          timeoutId: null,
          failedAttempts: 0,
        };
      });
    },
    loadCard: (
      cards: {
        id: string;
        value: string;
        url: string;
        label: string;
      }[],
      maxAttempts: number,
    ) =>
      set((state) => {
        if (state.timeoutId) clearTimeout(state.timeoutId);

        return {
          attempts: 0,
          cards: cards.map((c) => ({
            ...c,
            isFlipped: true,
            isMatched: false,
          })),
          gameStatus: "loading",
          correctPairs: 0,
          flippedIds: [],
          maxAttempts: maxAttempts,
          timeoutId: null,
          totalPairs: cards.length / 2,
          failedAttempts: 0,
        };
      }),
    flipCard: (id: string) => {
      set((state) => {
        if (state.flippedIds.length >= 2 || state.flippedIds.includes(id)) {
          return state;
        }
        return {
          cards: state.cards.map((c) =>
            c.id === id ? { ...c, isFlipped: true } : c,
          ),
          flippedIds: [...state.flippedIds, id],
        };
      });
    },
    resolveFlippedCards: () => {
      set((state) => {
        const [a, b] = state.flippedIds;
        const first = state.cards.find((c) => c.id === a);
        const second = state.cards.find((c) => c.id === b);

<<<<<<< HEAD
        if (!first || !second) return state;
=======
      if (!shouldResolve) return;
>>>>>>> d9c8cad5e0bf888cba33d42d66e7482735ad86ca

        const isMatch = first.value === second.value;
        const newAttempts = state.attempts + 1;
        const newFailedAttempts = state.failedAttempts + 1;
        const newCards = state.cards.map((c) =>
          c.id === a || c.id === b
            ? {
                ...c,
                isMatched: isMatch,
                isFlipped: isMatch,
              }
            : c,
        );
        const isAllMatched = newCards.every((c) => c.isMatched);

        let newStatus: GameStatus = state.gameStatus;
        if (isAllMatched) {
          newStatus = "won";
        } else if (newAttempts >= state.maxAttempts) {
          newStatus = "lost";
        }

<<<<<<< HEAD
        return {
          cards: newCards,
          flippedIds: [],
          attempts: newAttempts,
          correctPairs: isMatch ? state.correctPairs + 1 : state.correctPairs,
          gameStatus: newStatus,
          failedAttempts: newFailedAttempts,
        };
      });
=======
          const isMatch = first.value === second.value;

          const newFailedAttempts = state.failedAttempts + 1;

          const newAttempts = state.attempts + 1;

          const newCards = state.cards.map((c) =>
            c.id === a || c.id === b
              ? {
                  ...c,
                  isMatched: isMatch,
                  isFlipped: isMatch,
                }
              : c,
          );

          const isAllMatched = newCards.every((c) => c.isMatched);

          let newStatus: GameStatus = state.gameStatus;

          if (isAllMatched) {
            newStatus = "won";
          } else if (newAttempts >= state.maxAttempts) {
            newStatus = "lost";
          }

          return {
            cards: newCards,
            flippedIds: [],
            attempts: newAttempts,
            correctPairs: isMatch ? state.correctPairs + 1 : state.correctPairs,
            timeoutId: null,
            gameStatus: newStatus,
            failedAttempts: newFailedAttempts,
          };
        });
      }, checkDelay);

      set({ timeoutId: timeout });
>>>>>>> d9c8cad5e0bf888cba33d42d66e7482735ad86ca
    },
  }));
