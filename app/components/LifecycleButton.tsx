"use client";

import { useEffect, useRef, useState } from "react";

type ButtonState = "idle" | "loading" | "success" | "error";

type LifecycleButtonProps = {
  label?: string;
  onAction?: () => Promise<boolean>;
  disabled?: boolean;
};

export default function LifecycleButton({
  label = "Send message",
  onAction,
  disabled = false,
}: LifecycleButtonProps) {
  const [state, setState] = useState<ButtonState>("idle");

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const actionIdRef = useRef(0);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function clearResetTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  function resetToIdle(actionId: number, delay: number) {
    clearResetTimer();

    timeoutRef.current = setTimeout(() => {
      if (actionIdRef.current === actionId) {
        setState("idle");
        timeoutRef.current = null;
      }
    }, delay);
  }

  async function handleClick() {
    if (disabled || state === "loading") {
      return;
    }

    clearResetTimer();

    const actionId = ++actionIdRef.current;

    setState("loading");

    try {
      const success = onAction
        ? await onAction()
        : await new Promise<boolean>((resolve) =>
            setTimeout(() => resolve(true), 900)
          );

      if (actionIdRef.current !== actionId) {
        return;
      }

      setState(success ? "success" : "error");
      resetToIdle(actionId, success ? 1000 : 1200);
    } catch {
      if (actionIdRef.current !== actionId) {
        return;
      }

      setState("error");
      resetToIdle(actionId, 1200);
    }
  }

  const isLoading = state === "loading";
  const isSuccess = state === "success";
  const isError = state === "error";

  const statusMessage =
    isLoading
      ? "Sending message"
      : isSuccess
        ? "Message sent successfully"
        : isError
          ? "Message failed. Retry available"
          : "";

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || isLoading}
        aria-label={
          isLoading
            ? "Sending message"
            : isSuccess
              ? "Message sent"
              : isError
                ? "Retry sending message"
                : label
        }
        className={[
          "relative inline-flex min-w-36 items-center justify-center",
          "overflow-hidden rounded-xl px-5 py-3",
          "font-medium text-white shadow-sm",
          "transition-[transform,background-color,box-shadow,opacity]",
          "duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-blue-300 focus-visible:ring-offset-2",
          "active:scale-95",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "motion-reduce:transition-none motion-reduce:transform-none",
          isSuccess
            ? "bg-emerald-600"
            : isError
              ? "bg-red-600"
              : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5",
          isError
            ? "motion-safe:animate-[lifecycle-shake_300ms_ease-in-out]"
            : "",
        ].join(" ")}
      >
        <span
          className={[
            "inline-flex items-center gap-2",
            "transition-[opacity,transform]",
            "duration-200 ease-out",
            "motion-reduce:transition-none motion-reduce:transform-none",
            isLoading
              ? "translate-y-2 opacity-0"
              : "translate-y-0 opacity-100",
          ].join(" ")}
        >
          {isSuccess && (
            <span aria-hidden="true" className="text-lg">
              ✓
            </span>
          )}

          {isError && (
            <span aria-hidden="true" className="text-lg">
              !
            </span>
          )}

          {isSuccess ? "Sent" : isError ? "Retry" : label}
        </span>

        {isLoading && (
          <span
            className="absolute inline-flex items-center gap-2"
            role="status"
            aria-label="Sending"
          >
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
            />
            Sending…
          </span>
        )}
      </button>

      <span className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </span>
    </>
  );
}