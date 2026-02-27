import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center py-40">
      <p className="text-sm font-medium text-accent-400 mb-5">404</p>
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-5">
        <span className="gradient-text">Page not found</span>
      </h1>
      <p className="text-lg text-neutral-400 max-w-md mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center h-14 px-8 text-base font-medium rounded-full bg-accent-500 text-white hover:bg-accent-600 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center h-14 px-8 text-base font-medium rounded-full border border-neutral-700 text-neutral-200 hover:bg-neutral-800/60 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </Container>
  );
}
