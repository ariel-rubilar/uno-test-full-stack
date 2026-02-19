import { describe, it, expect, afterEach } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { ResultsTable } from "./ResultTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { server } from "@/shared/test/server";
import { http, HttpResponse } from "msw";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

const renderWithProvider = (ui: React.ReactElement) => {
  const client = createTestQueryClient();
  return render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
  );
};

const results = [
  {
    id: "1",
    playerRun: "12345678-9",
    playerName: "Alice",
    correctPairs: 5,
    totalPairs: 5,
    attempts: 7,
    maxAttempts: 10,
    outcome: "win",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    playerRun: "98765432-1",
    playerName: "Bob",
    correctPairs: 3,
    totalPairs: 5,
    attempts: 10,
    maxAttempts: 10,
    outcome: "lose",
    createdAt: new Date().toISOString(),
  },
];

describe("ResultsTable", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders empty state when there are no results", async () => {
    server.use(
      http.get("*/game-results", () => {
        return HttpResponse.json([]);
      }),
    );

    renderWithProvider(<ResultsTable />);

    await waitFor(() => {
      expect(screen.getByText(/No games played yet/i)).toBeTruthy();
    });
  });

  it("renders results in the table", async () => {
    server.use(
      http.get("*/game-results", () => {
        return HttpResponse.json(results);
      }),
    );

    renderWithProvider(<ResultsTable />);

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeTruthy();
      expect(screen.getByText("Bob")).toBeTruthy();
      expect(screen.getByText(/Won/i)).toBeTruthy();
      expect(screen.getByText(/Lost/i)).toBeTruthy();
    });
  });

  it("filters results by run", async () => {
    server.use(
      http.get("*/game-results", ({ request }) => {
        const url = new URL(request.url);
        const run = url.searchParams.get("run");
        if (run === "12345678-9") {
          return HttpResponse.json([results[0]]);
        }
        if (run === "98765432-1") {
          return HttpResponse.json([results[1]]);
        }
        if (run === "00000000-0") {
          return HttpResponse.json([]);
        }
        return HttpResponse.json(results);
      }),
    );

    renderWithProvider(<ResultsTable />);

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeTruthy();
      expect(screen.getByText("Bob")).toBeTruthy();
    });

    const input = screen.getByLabelText(/Filter results by run/i);
    fireEvent.change(input, { target: { value: "12345678-9" } });

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeTruthy();
      expect(screen.queryByText("Bob")).not.toBeTruthy();
    });

    fireEvent.change(input, { target: { value: "98765432-1" } });

    await waitFor(() => {
      expect(screen.getByText("Bob")).toBeTruthy();
      expect(screen.queryByText("Alice")).not.toBeTruthy();
    });

    fireEvent.change(input, { target: { value: "00000000-0" } });

    await waitFor(() => {
      expect(screen.getByText(/No games played yet/i)).toBeTruthy();
    });
  });
});
