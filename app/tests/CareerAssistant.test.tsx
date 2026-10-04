import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CareerAssistant from "../components/CareerAssistant";

const mockUseChat = vi.fn();

vi.mock("@ai-sdk/react", () => ({
  useChat: () => mockUseChat(),
}));

vi.mock("ai", () => ({
  DefaultChatTransport: vi.fn(),
}));

describe("CareerAssistant", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: vi.fn(),
      status: "ready",
      stop: vi.fn(),
      error: null,
      regenerate: vi.fn(),
    });
  });

  it("renders the first-run welcome state", () => {
    render(<CareerAssistant />);

    expect(
      screen.getByRole("heading", {
        name: "LaunchPad AI Career Assistant",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Welcome to LaunchPad AI 👋")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /assess my career readiness/i,
      })
    ).toBeInTheDocument();
  });

  it("renders a normal chat message", () => {
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "message-1",
          role: "user",
          parts: [
            {
              type: "text",
              text: "Help me become a software engineer.",
            },
          ],
        },
      ],
      sendMessage: vi.fn(),
      status: "ready",
      stop: vi.fn(),
      error: null,
      regenerate: vi.fn(),
    });

    render(<CareerAssistant />);

    expect(
      screen.getByText("Help me become a software engineer.")
    ).toBeInTheDocument();
  });

  it("shows the pending state while the response is being prepared", () => {
    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: vi.fn(),
      status: "submitted",
      stop: vi.fn(),
      error: null,
      regenerate: vi.fn(),
    });

    render(<CareerAssistant />);

    expect(
      screen.getByRole("status")
    ).toHaveTextContent(
      "LaunchPad AI is preparing your response…"
    );
  });

  it("shows the streaming state and stop button", () => {
    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: vi.fn(),
      status: "streaming",
      stop: vi.fn(),
      error: null,
      regenerate: vi.fn(),
    });

    render(<CareerAssistant />);

    expect(
      screen.getByRole("button", {
        name: "Stop generating response",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Message LaunchPad AI")
    ).toBeDisabled();

    expect(
      screen.getByPlaceholderText("LaunchPad AI is responding...")
    ).toBeInTheDocument();
  });

  it("shows the API error and retry button", async () => {
    const user = userEvent.setup();
    const regenerate = vi.fn();

    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: vi.fn(),
      status: "ready",
      stop: vi.fn(),
      error: new Error("Network error"),
      regenerate,
    });

    render(<CareerAssistant />);

    expect(
      screen.getByRole("alert")
    ).toHaveTextContent("Message couldn't be completed");

    expect(
      screen.getByRole("button", {
        name: "Retry message",
      })
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Retry message",
      })
    );

    expect(regenerate).toHaveBeenCalledTimes(1);
  });
});