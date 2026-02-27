"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { Container } from "@/components/layout/container";

interface CtaBannerProps {
  headline: string;
  body?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function CtaBanner({
  headline,
  body,
  primaryCta = { label: "Book a Call", href: "/contact" },
  secondaryCta,
}: CtaBannerProps) {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-neutral-900">
      {/* Glow background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{ background: "var(--gradient-mesh)" }}
        aria-hidden="true"
      />

      <Container className="relative py-20 md:py-28 lg:py-32 text-center">
        <motion.h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-50 tracking-tight"
          variants={reduced ? undefined : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {headline}
        </motion.h2>

        {body && (
          <motion.p
            className="mt-4 text-neutral-300 max-w-md mx-auto"
            variants={reduced ? undefined : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {body}
          </motion.p>
        )}

        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          variants={reduced ? undefined : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center h-12 px-6 text-base font-medium rounded-md bg-accent-500 text-white hover:bg-accent-600 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
            style={{ transitionDuration: "var(--duration-normal)" }}
          >
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center h-12 px-6 text-base font-medium rounded-md border border-neutral-700 text-neutral-100 hover:bg-neutral-800 transition-all"
              style={{ transitionDuration: "var(--duration-normal)" }}
            >
              {secondaryCta.label}
            </Link>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
