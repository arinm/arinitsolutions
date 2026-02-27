"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { Container } from "@/components/layout/container";
import { Magnetic } from "@/components/ui/magnetic";

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
    <section className="relative overflow-hidden bg-neutral-900/50">
      {/* Glow background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{ background: "var(--gradient-mesh)" }}
        aria-hidden="true"
      />

      <Container className="relative py-28 md:py-36 lg:py-44 text-center">
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[0.95]"
          variants={reduced ? undefined : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="gradient-text">{headline}</span>
        </motion.h2>

        {body && (
          <motion.p
            className="mt-6 text-lg text-neutral-400 max-w-md mx-auto"
            variants={reduced ? undefined : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {body}
          </motion.p>
        )}

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          variants={reduced ? undefined : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Magnetic strength={0.15}>
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center h-14 px-8 text-base font-medium rounded-full bg-accent-500 text-white hover:bg-accent-600 hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] animated-gradient-border transition-all"
              style={{ transitionDuration: "var(--duration-slow)" }}
            >
              {primaryCta.label}
            </Link>
          </Magnetic>
          {secondaryCta && (
            <Magnetic strength={0.15}>
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center h-14 px-8 text-base font-medium rounded-full border border-neutral-700 text-neutral-200 hover:bg-neutral-800/60 hover:border-neutral-600 transition-all"
                style={{ transitionDuration: "var(--duration-slow)" }}
              >
                {secondaryCta.label}
              </Link>
            </Magnetic>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
