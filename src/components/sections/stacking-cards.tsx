"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/ui/fade-in";

interface StackCard {
  title: string;
  description: string;
  accent: string;
}

const cards: StackCard[] = [
  {
    title: "Discovery & Strategy",
    description:
      "Deep dive into your business goals, user needs, and technical landscape. We don't start coding — we start understanding.",
    accent: "from-violet-500/20 to-purple-500/10",
  },
  {
    title: "Design & Architecture",
    description:
      "System design, data models, API contracts, and UI flows — all documented before a single line of production code is written.",
    accent: "from-blue-500/20 to-cyan-500/10",
  },
  {
    title: "Build & Iterate",
    description:
      "Two-week sprints with working software at the end of each one. You see progress, not PowerPoints.",
    accent: "from-cyan-500/20 to-emerald-500/10",
  },
  {
    title: "Launch & Grow",
    description:
      "Production deployment, monitoring, performance baselines. Then we iterate, optimize, and scale together.",
    accent: "from-emerald-500/20 to-green-500/10",
  },
];

function StackingCard({
  card,
  index,
  total,
}: {
  card: StackCard;
  index: number;
  total: number;
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [0.9, 1]
  );

  const topOffset = index * 24;

  if (reduced) {
    return (
      <div className="mb-6">
        <div
          className={`relative overflow-hidden bg-neutral-900 border border-neutral-700/50 rounded-2xl p-8 md:p-12`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${card.accent} pointer-events-none`}
          />
          <span className="relative text-sm text-accent-400 font-medium">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="relative mt-4 text-2xl sm:text-3xl font-bold text-neutral-50 tracking-tight">
            {card.title}
          </h3>
          <p className="relative mt-4 text-neutral-400 leading-relaxed max-w-lg">
            {card.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="h-[40vh] sticky" style={{ top: `calc(120px + ${topOffset}px)` }}>
      <motion.div
        className={`relative overflow-hidden bg-neutral-900 border border-neutral-700/50 rounded-2xl p-8 md:p-12 shadow-2xl`}
        style={{ scale }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${card.accent} pointer-events-none`}
        />
        <span className="relative text-sm text-accent-400 font-medium">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="relative mt-4 text-2xl sm:text-3xl font-bold text-neutral-50 tracking-tight">
          {card.title}
        </h3>
        <p className="relative mt-4 text-neutral-400 leading-relaxed max-w-lg">
          {card.description}
        </p>
      </motion.div>
    </div>
  );
}

export function StackingCards() {
  return (
    <section className="py-28 md:py-36 lg:py-44 border-t border-neutral-700/30">
      <Container>
        <FadeIn>
          <span className="section-label">How it works</span>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-50 tracking-tight leading-[1]">
            From idea to{" "}
            <span className="gradient-text">production</span>
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-neutral-400 max-w-xl">
            Four stages, each one bringing you closer to a system that works.
          </p>
        </FadeIn>

        <div className="relative mt-16">
          {cards.map((card, i) => (
            <StackingCard
              key={card.title}
              card={card}
              index={i}
              total={cards.length}
            />
          ))}
          {/* Spacer for last sticky card to unstick */}
          <div className="h-[20vh]" />
        </div>
      </Container>
    </section>
  );
}
