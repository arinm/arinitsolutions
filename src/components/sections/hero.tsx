"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { Container } from "@/components/layout/container";
import { HeroParticles } from "@/components/ui/hero-particles";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

interface HeroCTA {
  label: string;
  href: string;
}

interface HeroProps {
  headline: React.ReactNode;
  subheadline?: string;
  primaryCta?: HeroCTA;
  secondaryCta?: HeroCTA;
  gradient?: boolean;
  align?: "center" | "left";
  size?: "default" | "large";
  label?: string;
}

export function Hero({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  gradient = true,
  align = "center",
  size = "default",
  label,
}: HeroProps) {
  const reducedMotion = useReducedMotion();

  const isLarge = size === "large";

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

      {/* Floating particle orbs */}
      {gradient && <HeroParticles />}

      <Container
        className={cn(
          "relative",
          isLarge ? "py-32 md:py-44 lg:py-56" : "py-24 md:py-32 lg:py-40",
          align === "center" && "text-center flex flex-col items-center"
        )}
      >
        {/* Section label */}
        {label && (
          <motion.span
            className="section-label mb-6 block"
            variants={reducedMotion ? undefined : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {label}
          </motion.span>
        )}

        {/* Headline — oversized, bold */}
        <motion.h1
          className={cn(
            "font-bold tracking-tight leading-[0.95]",
            isLarge
              ? "text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem]"
              : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
            align === "center" ? "max-w-[1000px]" : "max-w-[900px]"
          )}
          variants={reducedMotion ? undefined : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {typeof headline === "string" ? (
            <span className="gradient-text">{headline}</span>
          ) : (
            headline
          )}
        </motion.h1>

        {/* Subheadline */}
        {subheadline && (
          <motion.p
            className={cn(
              "mt-8 text-lg sm:text-xl text-neutral-400 leading-relaxed font-light",
              align === "center" ? "max-w-[600px]" : "max-w-[540px]"
            )}
            variants={reducedMotion ? undefined : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {subheadline}
          </motion.p>
        )}

        {/* CTAs */}
        {(primaryCta || secondaryCta) && (
          <motion.div
            className={cn(
              "mt-12 flex flex-col sm:flex-row gap-4",
              align === "center" && "justify-center"
            )}
            variants={reducedMotion ? undefined : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {primaryCta && (
              <Magnetic strength={0.15}>
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center h-14 px-8 text-base font-medium rounded-full bg-accent-500 text-white hover:bg-accent-600 hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] animated-gradient-border transition-all"
                  style={{ transitionDuration: "var(--duration-slow)" }}
                >
                  {primaryCta.label}
                </Link>
              </Magnetic>
            )}
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
        )}
      </Container>
    </section>
  );
}
