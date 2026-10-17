"use client";

import { useEffect } from "react";

export default function CategoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Category page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="w-full max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-10">
        <h2 className="mb-4 text-2xl font-bold text-red-700 sm:text-3xl">
          Something went wrong loading the categories!
        </h2>
        
        <div className="mb-6 rounded-lg bg-white p-4 text-left shadow-inner overflow-auto">
          <p className="font-mono text-sm font-semibold text-red-600">
            Error Message: {error.message || "Unknown error"}
          </p>
          {error.digest && (
            <p className="mt-2 font-mono text-xs text-slate-500">
              Digest: {error.digest}
            </p>
          )}
          {error.stack && (
            <pre className="mt-4 font-mono text-[10px] text-slate-600 sm:text-xs">
              {error.stack}
            </pre>
          )}
        </div>

        <p className="mb-6 text-sm text-red-800">
          Please take a screenshot of this error and show it to your developer.
        </p>

        <button
          onClick={() => reset()}
          className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
