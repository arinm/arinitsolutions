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
    <section className="py-16 md:py-20">
      <Container className="max-w-[640px]">
        <motion.blockquote
          className="relative text-center"
          variants={reduced ? undefined : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl font-serif text-accent-400/20 select-none leading-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="text-xl text-neutral-100 italic leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>
          <footer className="mt-6">
            <span className="text-sm text-neutral-500">
              &mdash; <strong className="text-neutral-300 font-medium">{author}</strong>,{" "}
              {role}
              {company && ` at ${company}`}
            </span>
          </footer>
        </motion.blockquote>
      </Container>
    </section>
  );
}
