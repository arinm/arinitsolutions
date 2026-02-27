"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { Container } from "@/components/layout/container";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

export function Testimonial({ quote, author, role, company }: TestimonialProps) {
  const reduced = useReducedMotion();

  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-[720px]">
        <motion.blockquote
          className="relative text-center"
          variants={reduced ? undefined : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span
            className="absolute -top-8 left-1/2 -translate-x-1/2 text-7xl font-serif text-accent-400/15 select-none leading-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="text-2xl sm:text-3xl font-light text-neutral-200 leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>
          <footer className="mt-8">
            <span className="text-sm text-neutral-500">
              &mdash; <strong className="text-neutral-300 font-semibold">{author}</strong>,{" "}
              {role}
              {company && ` at ${company}`}
            </span>
          </footer>
        </motion.blockquote>
      </Container>
    </section>
  );
}
