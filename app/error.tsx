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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h2>Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="mt-4 rounded bg-accent px-4 py-2 text-black font-semibold transition-colors hover:bg-white"
      >
        Try again
      </button>
    </div>
  );
}
