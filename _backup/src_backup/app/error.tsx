"use client";

import { Container } from "@/components/layout/container";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center py-32">
      <p className="text-sm font-medium text-error mb-4">500</p>
      <h1 className="text-4xl font-bold text-neutral-50 tracking-tight mb-4">
        Something went wrong
      </h1>
      <p className="text-neutral-300 max-w-md mb-8">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center h-10 px-5 text-sm font-medium rounded-md bg-accent-500 text-white hover:bg-accent-600 transition-colors"
      >
        Try Again
      </button>
    </Container>
  );
}
