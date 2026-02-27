"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { wordStagger, wordItem, fadeInUp, viewportOnce } from "@/lib/animations";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface HeroCTA {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface HeroProps {
  headline: string;
  subheadline: string;
  primaryCta?: HeroCTA;
  secondaryCta?: HeroCTA;
  gradient?: boolean;
  align?: "center" | "left";
}

export function Hero({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  gradient = true,
  align = "center",
}: HeroProps) {
  const reducedMotion = useReducedMotion();
  const words = headline.split(" ");

  return (
    <section className="relative overflow-hidden">
      {/* Gradient Mesh Background */}
      {gradient && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-mesh)" }}
          aria-hidden="true"
        />
      )}

      {/* Grid dot pattern */}
      {gradient && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.15]" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="currentColor" className="text-neutral-500" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-dots)" />
          </svg>
        </div>
      )}

      <Container
        className={cn(
          "relative py-24 md:py-32 lg:py-40",
          align === "center" && "text-center flex flex-col items-center"
        )}
      >
        {/* Headline with word stagger */}
        <motion.h1
          className={cn(
            "text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-50 tracking-tight leading-[1.1]",
            align === "center" ? "max-w-[720px]" : "max-w-[640px]"
          )}
          variants={reducedMotion ? undefined : wordStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              variants={reducedMotion ? undefined : wordItem}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className={cn(
            "mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed",
            align === "center" ? "max-w-[560px]" : "max-w-[520px]"
          )}
          variants={reducedMotion ? undefined : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {subheadline}
        </motion.p>

        {/* CTAs */}
        {(primaryCta || secondaryCta) && (
          <motion.div
            className={cn(
              "mt-10 flex flex-col sm:flex-row gap-4",
              align === "center" && "justify-center"
            )}
            variants={reducedMotion ? undefined : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center h-12 px-6 text-base font-medium rounded-md bg-accent-500 text-white hover:bg-accent-600 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
                style={{ transitionDuration: "var(--duration-normal)" }}
              >
                {primaryCta.label}
              </Link>
            )}
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
        )}
      </Container>
    </section>
  );
}
