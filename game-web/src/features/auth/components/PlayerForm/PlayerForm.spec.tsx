import { describe, it, expect, vi, afterEach } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { PlayerForm } from "./PlayerForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "@/features/auth/components/AuthGuard/AuthContext";
import { server } from "@/shared/test/server";
import { http, HttpResponse } from "msw";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

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

describe("PlayerForm", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should login successfully and redirect to /play", async () => {
    server.use(
      http.post("*/login", async () => {
        return HttpResponse.json(
          { id: "1", name: "Test User", run: "12345678-9" },
          { status: 200 },
        );
      }),
    );

    renderWithProvider(<PlayerForm />);

    fireEvent.change(screen.getByLabelText(/Run/i), {
      target: { value: "12.345.678-9" },
    });
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Test User" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Play Now/i }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/play");
    });
  });

  it("should show error on failed login", async () => {
    server.use(
      http.post("*/login", async () => {
        return HttpResponse.json(
          { message: "Invalid credentials" },
          { status: 401 },
        );
      }),
    );

    renderWithProvider(<PlayerForm />);

    fireEvent.change(screen.getByLabelText(/Run/i), {
      target: { value: "12.345.678-9" },
    });
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Test User" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Play Now/i }));

    await waitFor(() => {
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});
