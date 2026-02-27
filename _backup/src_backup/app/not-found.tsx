import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center py-32">
      <p className="text-sm font-medium text-accent-400 mb-4">404</p>
      <h1 className="text-4xl font-bold text-neutral-50 tracking-tight mb-4">
        Page not found
      </h1>
      <p className="text-neutral-300 max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center h-10 px-5 text-sm font-medium rounded-md bg-accent-500 text-white hover:bg-accent-600 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center h-10 px-5 text-sm font-medium rounded-md border border-neutral-700 text-neutral-100 hover:bg-neutral-800 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </Container>
  );
}
