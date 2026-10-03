"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import CareerReadinessResult from "./tools/CareerReadinessResult";

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

  useEffect(() => {
    if (!isNearBottom) {
      return;
    }

    bottomRef.current?.scrollIntoView({
      behavior: "instant",
      block: "end",
    });
  }, [messages, isNearBottom]);

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

  function scrollToLatest() {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });

    setIsNearBottom(true);
  }

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

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  }

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

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5"
      >
        <div className="space-y-4">

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

          {messages.map((message) => (
            <div key={message.id} className="space-y-3">

              {/* Normal user / assistant text */}
              {message.parts.map((part, index) => {

                /*
                 * TEXT PART
                 */
                if (part.type === "text") {
                  return (
                    <div
                      key={index}
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
                        <span className="whitespace-pre-wrap">
                          {part.text}
                        </span>
                      </div>
                    </div>
                  );
                }

                /*
                 * CAREER READINESS TOOL
                 */
                if (
                  part.type ===
                  "tool-analyzeCareerReadiness"
                ) {
                  const toolPart = part as {
                    type: "tool-analyzeCareerReadiness";
                    toolCallId: string;
                    state:
                      | "input-streaming"
                      | "input-available"
                      | "output-available"
                      | "output-error";
                    input?: {
                      targetRole?: string;
                      technicalSkills?: string[];
                      projects?: string[];
                      interviewPreparation?: number;
                      cvReadiness?: number;
                    };
                    output?: {
                      targetRole: string;
                      overallScore: number;
                      breakdown: {
                        technicalSkills: number;
                        projects: number;
                        interviewPreparation: number;
                        cvReadiness: number;
                      };
                      strengths: string[];
                      skillGaps: string[];
                      nextSteps: string[];
                    };
                    errorText?: string;
                  };

                  /*
                   * STATE 1
                   * input-streaming
                   */
                  if (
                    toolPart.state ===
                    "input-streaming"
                  ) {
                    return (
                      <div
                        key={toolPart.toolCallId}
                        className="rounded-xl border border-blue-200 bg-blue-50 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-3 w-3 animate-pulse rounded-full bg-blue-600" />

                          <div>
                            <p className="font-medium text-blue-900">
                              Preparing career assessment…
                            </p>

                            <p className="mt-1 text-sm text-blue-700">
                              LaunchPad AI is preparing the information needed for the assessment.
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  /*
                   * STATE 2
                   * input-available
                   */
                  if (
                    toolPart.state ===
                    "input-available"
                  ) {
                    return (
                      <div
                        key={toolPart.toolCallId}
                        className="rounded-xl border border-amber-200 bg-amber-50 p-4"
                      >
                        <p className="font-medium text-amber-900">
                          Assessing your career readiness…
                        </p>

                        <p className="mt-1 text-sm text-amber-700">
                          Target role:{" "}
                          {toolPart.input?.targetRole ??
                            "Preparing target role"}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-amber-800">
                          <span className="rounded-full bg-amber-100 px-3 py-1">
                            {toolPart.input?.technicalSkills
                              ?.length ?? 0}{" "}
                            skills
                          </span>

                          <span className="rounded-full bg-amber-100 px-3 py-1">
                            {toolPart.input?.projects
                              ?.length ?? 0}{" "}
                            projects
                          </span>

                          <span className="rounded-full bg-amber-100 px-3 py-1">
                            Interview:{" "}
                            {toolPart.input
                              ?.interviewPreparation ??
                              0}
                            %
                          </span>

                          <span className="rounded-full bg-amber-100 px-3 py-1">
                            CV:{" "}
                            {toolPart.input
                              ?.cvReadiness ?? 0}
                            %
                          </span>
                        </div>
                      </div>
                    );
                  }

                  /*
                   * STATE 3
                   * output-available
                   */
                  if (
                    toolPart.state ===
                    "output-available" &&
                    toolPart.output
                  ) {
                    return (
                      <div
                        key={toolPart.toolCallId}
                        className="transition-all duration-200 ease-out"
                      >
                        <CareerReadinessResult
                          result={toolPart.output}
                        />
                      </div>
                    );
                  }

                  /*
                   * STATE 4
                   * output-error
                   */
                  if (
                    toolPart.state ===
                    "output-error"
                  ) {
                    return (
                      <div
                        key={toolPart.toolCallId}
                        className="rounded-xl border border-red-200 bg-red-50 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700">
                            !
                          </div>

                          <div>
                            <p className="font-semibold text-red-900">
                              Career assessment failed
                            </p>

                            <p className="mt-1 text-sm text-red-700">
                              {toolPart.errorText ??
                                "The assessment could not be completed. Please try again."}
                            </p>

                            <p className="mt-2 text-xs text-red-600">
                              Your conversation is still safe and you can continue chatting.
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }

                return null;
              })}
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

          {/* General API error */}
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              Something went wrong. Please try again.
            </div>
          )}

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