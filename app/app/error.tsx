"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <div
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-700"
          aria-hidden="true"
        >
          !
        </div>

        <h1 className="mt-4 text-xl font-semibold text-slate-900">
          Something went wrong
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          LaunchPad AI ran into an unexpected problem.
          Your information has not been lost. Please try
          loading this page again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Try again
        </button>
      </div>
    </main>
  );
}