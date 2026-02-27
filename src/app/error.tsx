"use client";

import { Container } from "@/components/layout/container";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center py-40">
      <p className="text-sm font-medium text-error mb-5">500</p>
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-5">
        <span className="gradient-text">Something went wrong</span>
      </h1>
      <p className="text-lg text-neutral-400 max-w-md mb-10">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center h-14 px-8 text-base font-medium rounded-full bg-accent-500 text-white hover:bg-accent-600 transition-colors"
      >
        Try Again
      </button>
    </Container>
  );
}
