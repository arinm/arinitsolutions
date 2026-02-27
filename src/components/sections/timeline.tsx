"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Container } from "@/components/layout/container";

interface Phase {
  number: string;
  label: string;
  description: string;
  duration?: string;
  deliverables?: string[];
}

interface TimelineProps {
  headline: string;
  body?: string;
  phases: Phase[];
  compact?: boolean;
}

export function Timeline({ headline, body, phases, compact = false }: TimelineProps) {
  const reduced = useReducedMotion();

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="text-center mb-14 md:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-50 tracking-tight leading-[1]">
            {headline}
          </h2>
          {body && (
            <p className="mt-5 text-lg text-neutral-400 max-w-lg mx-auto">{body}</p>
          )}
        </div>

        <motion.div
          className={compact ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-8"}
          variants={reduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {phases.map((phase, i) => (
            <motion.div
              key={phase.number}
              variants={reduced ? undefined : staggerItem}
              className={compact ? "relative" : "relative pl-12 md:pl-16"}
            >
              {compact ? (
                <div className="bg-neutral-900 border border-neutral-700/50 rounded-xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-accent-500/10 text-accent-400 text-sm font-semibold border border-accent-500/20">
                      {phase.number}
                    </span>
                    <h3 className="text-lg font-semibold text-neutral-50">{phase.label}</h3>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">{phase.description}</p>
                </div>
              ) : (
                <>
                  {i < phases.length - 1 && (
                    <div className="absolute left-[18px] md:left-[26px] top-10 bottom-0 w-px bg-neutral-700/50" aria-hidden="true" />
                  )}
                  <span className="absolute left-0 md:left-1 flex items-center justify-center h-9 w-9 md:h-11 md:w-11 rounded-full bg-accent-500/10 text-accent-400 text-sm font-semibold border border-accent-500/20">
                    {phase.number}
                  </span>
                  <div className="pb-8">
                    <div className="flex items-baseline gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-neutral-50">{phase.label}</h3>
                      {phase.duration && (
                        <span className="text-xs text-neutral-500">{phase.duration}</span>
                      )}
                    </div>
                    <p className="text-neutral-400 leading-relaxed mb-3">{phase.description}</p>
                    {phase.deliverables && (
                      <ul className="space-y-1.5">
                        {phase.deliverables.map((d, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-neutral-500">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-400 shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
