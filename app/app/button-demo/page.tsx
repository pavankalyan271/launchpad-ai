"use client";

import { useState } from "react";

import LifecycleButton from "../../components/LifecycleButton";

type DemoMode = "random" | "success" | "error";

export default function ButtonDemoPage() {
  const [mode, setMode] = useState<DemoMode>("random");

  async function handleAction() {
    const delay = 700 + Math.floor(Math.random() * 900);

    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });

    if (mode === "success") {
      return true;
    }

    if (mode === "error") {
      return false;
    }

    return Math.random() >= 0.2;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            FE-10 · Motion Lifecycle
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Send Message Button
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            A reusable button that communicates its complete lifecycle:
            idle, hover/focus, loading, success, error, and disabled.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setMode("success")}
              className={[
                "rounded-xl border px-4 py-2 text-sm font-medium transition",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300",
                mode === "success"
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
              ].join(" ")}
            >
              Force Success
            </button>

            <button
              type="button"
              onClick={() => setMode("error")}
              className={[
                "rounded-xl border px-4 py-2 text-sm font-medium transition",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300",
                mode === "error"
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
              ].join(" ")}
            >
              Force Error
            </button>

            <button
              type="button"
              onClick={() => setMode("random")}
              className={[
                "rounded-xl border px-4 py-2 text-sm font-medium transition",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300",
                mode === "random"
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
              ].join(" ")}
            >
              Random 20% Error
            </button>
          </div>

          <div className="mt-12 flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
            <LifecycleButton
              label="Send message"
              onAction={handleAction}
            />
          </div>

          <section className="mt-10 rounded-2xl bg-slate-50 p-5">
            <h2 className="text-base font-semibold">
              Motion decisions
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Hover, focus, loading, and state changes use short 180–220ms
              ease-out transitions for responsive feedback. Success and error
              feedback stays visible briefly before returning to idle. Motion
              uses transform and opacity where possible to stay compositor
              friendly. Reduced-motion users keep the same state feedback
              while unnecessary movement is removed.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}