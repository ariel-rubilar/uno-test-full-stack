import { describe, it, expect, vi, afterEach } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { GameBoard } from "./GameBoard";
import { GameplayProvider } from "../../contexts/GameplayContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { server } from "@/shared/test/server";
import { http, HttpResponse } from "msw";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for tests
      },
    },
  });

const renderWithProvider = (ui: React.ReactElement) => {
  const client = createTestQueryClient();
  return render(
    <GameplayProvider checkDelay={0}>
      <QueryClientProvider client={client}>{ui}</QueryClientProvider>
    </GameplayProvider>,
  );
};

const setup = () => {
  return renderWithProvider(<GameBoard delayToStart={0} />);
};

const startHandler = (
  cards: {
    id: string;
    title: string;
    url: string;
    value: string;
  }[],
  maxAttempts: number,
) => {
  return http.post(
    "*/gameplays/start",
    () => {
      return HttpResponse.json(
        {
          id: "1",
          cards: cards,
          maxAttempts: maxAttempts,
        },
        { status: 201 },
      );
    },
    { once: true },
  );
};
const saveResultHandler = () => {
  return http.post(
    "*/game-results",
    () => {
      return HttpResponse.json({}, { status: 201 });
    },
    { once: true },
  );
};

describe("GameBoard", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Render component", () => {
    it("should render stats", () => {
      setup();

      const attempts = screen.getByLabelText(/Attempts/);

      expect(attempts.textContent).toContain("0 / 0");

      const pairsFound = screen.getByLabelText(/Pairs Found/);

      expect(pairsFound.textContent).toContain("0 / 0");

      const totals = screen.getByText("0 cards in play");

      expect(totals).toBeTruthy();
    });

    it("should render hidden cards", async () => {
      const client = createTestQueryClient();

      server.use(
        startHandler(
          [
            {
              id: "1",
              title: "1",
              url: "/",
              value: "1",
            },
            {
              id: "2",
              title: "1",
              url: "/",
              value: "1",
            },
          ],
          1,
        ),
      );
      render(
        <GameplayProvider checkDelay={0}>
          <QueryClientProvider client={client}>
            <GameBoard delayToStart={0} />
          </QueryClientProvider>
        </GameplayProvider>,
      );

      await waitFor(() => {
        const hiddenCards = screen.getAllByLabelText(/Hidden card/);

        expect(hiddenCards).toHaveLength(2);
      });
    });

    it("should render gave over win", async () => {
      server.use(
        startHandler(
          [
            {
              id: "1",
              title: "1",
              url: "/",
              value: "1",
            },
            {
              id: "2",
              title: "1",
              url: "/",
              value: "1",
            },
          ],
          1,
        ),
        saveResultHandler(),
      );

      setup();

      const hiddenCards = await screen.findAllByLabelText(/Hidden card/);

      fireEvent.click(hiddenCards[0]);
      fireEvent.click(hiddenCards[1]);

      await waitFor(() => {
        screen.getByText(/You Won!/);
      });
    });

    it("should render gave over Lose", async () => {
      server.use(
        startHandler(
          [
            {
              id: "1",
              title: "1",
              url: "/",
              value: "1",
            },
            {
              id: "2",
              title: "1",
              url: "/",
              value: "1",
            },
            {
              id: "3",
              title: "1",
              url: "/",
              value: "2",
            },
            {
              id: "4",
              title: "1",
              url: "/",
              value: "2",
            },
          ],
          1,
        ),
        saveResultHandler(),
      );

      setup();

      const hiddenCards = await screen.findAllByLabelText(/Hidden card/);

      fireEvent.click(hiddenCards[0]);
      fireEvent.click(hiddenCards[3]);

      await waitFor(() => {
        screen.getByText(/Game Over/);
      });
    });
  });
});
