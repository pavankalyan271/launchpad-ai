"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

export default function CareerAssistant() {
  const [input, setInput] = useState("");
  const [isNearBottom, setIsNearBottom] = useState(true);

  const messagesContainerRef =
    useRef<HTMLDivElement>(null);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  const {
    messages,
    sendMessage,
    status,
    stop,
    error,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isStreaming =
    status === "submitted" ||
    status === "streaming";

  /*
   * Auto-scroll only when the user is already near
   * the bottom of the conversation.
   *
   * During streaming we use instant scrolling instead
   * of repeatedly starting smooth animations.
   */
  useEffect(() => {
    if (!isNearBottom) {
      return;
    }

    bottomRef.current?.scrollIntoView({
      behavior: "instant",
      block: "end",
    });
  }, [messages, isNearBottom]);

  /*
   * Track whether the user has manually scrolled
   * away from the latest message.
   */
  function handleScroll() {
    const container =
      messagesContainerRef.current;

    if (!container) {
      return;
    }

    const distanceFromBottom =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    setIsNearBottom(distanceFromBottom < 100);
  }

  /*
   * Manually jump to the newest message.
   */
  function scrollToLatest() {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });

    setIsNearBottom(true);
  }

  /*
   * Send a message.
   */
  function handleSend() {
    const text = input.trim();

    if (!text) {
      return;
    }

    if (isStreaming) {
      return;
    }

    sendMessage({
      text,
    });

    setInput("");
    setIsNearBottom(true);
  }

  /*
   * Press Enter to send.
   */
  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  }

  /*
   * Stop the current generation.
   *
   * AI SDK keeps the content that has already
   * streamed into the message state.
   */
  function handleStop() {
    stop();
  }

  return (
    <div className="flex h-[650px] max-h-[calc(100vh-120px)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}
      <header className="border-b border-gray-200 p-4 sm:p-5">
        <h1 className="text-lg font-semibold sm:text-xl">
          LaunchPad AI Career Assistant
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Ask me about careers, skills, CVs,
          interviews, or your next career step.
        </p>
      </header>

      {/* Conversation */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5"
>
        <div className="space-y-4">

          {/* Welcome */}
          {messages.length === 0 && (
            <div className="rounded-xl bg-gray-50 p-5 text-sm text-gray-600">
              <p className="font-medium text-gray-900">
                Welcome to LaunchPad AI 👋
              </p>

              <p className="mt-2">
                Tell me your career goal and I&apos;ll
                help you figure out your next step.
              </p>
            </div>
          )}

          {/* Messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[80%] sm:text-base ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {message.parts.map(
                  (part, index) => {
                    if (part.type !== "text") {
                      return null;
                    }

                    return (
                      <span
                        key={index}
                        className="whitespace-pre-wrap"
                      >
                        {part.text}
                      </span>
                    );
                  }
                )}
              </div>
            </div>
          ))}

          {/* Thinking indicator */}
          {status === "submitted" && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-600">
                LaunchPad AI is thinking
                <span className="ml-1 animate-pulse">
                  ...
                </span>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              Something went wrong. Please try again.
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Jump to latest */}
      {!isNearBottom && (
        <div className="relative">
          <button
            type="button"
            onClick={scrollToLatest}
            className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50"
          >
            ↓ Jump to latest
          </button>
        </div>
      )}

      {/* Input */}
      <div className="shrink-0 border-t border-gray-200 bg-white p-3 sm:p-4">
        <div className="flex w-full items-center gap-2 sm:gap-3">

          {/* Message input */}
          <input
            type="text"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
            placeholder="Ask LaunchPad AI..."
            aria-label="Message LaunchPad AI"
            autoComplete="off"
            className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 sm:text-base"
          />

          {/* Stop / Send */}
          {isStreaming ? (
            <button
              type="button"
              onClick={handleStop}
              className="shrink-0 rounded-xl bg-red-600 px-4 py-3 font-medium text-white hover:bg-red-700 sm:px-5"
            >
              Stop
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSend}
              className="shrink-0 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 sm:px-5"
            >
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
}