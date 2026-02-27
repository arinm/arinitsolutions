"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/ui/fade-in";

interface Metric {
  label: string;
  before: { value: string; label: string };
  after: { value: string; label: string };
  improvement: string;
  barBefore: number;
  barAfter: number;
}

const metrics: Metric[] = [
  {
    label: "Largest Contentful Paint",
    before: { value: "3.2s", label: "Before" },
    after: { value: "0.8s", label: "After" },
    improvement: "75% faster",
    barBefore: 80,
    barAfter: 20,
  },
  {
    label: "Time to Interactive",
    before: { value: "5.1s", label: "Before" },
    after: { value: "1.2s", label: "After" },
    improvement: "76% faster",
    barBefore: 85,
    barAfter: 20,
  },
  {
    label: "Core Web Vitals Pass Rate",
    before: { value: "45%", label: "Before" },
    after: { value: "100%", label: "After" },
    improvement: "+55 points",
    barBefore: 45,
    barAfter: 100,
  },
  {
    label: "Lighthouse Performance",
    before: { value: "52", label: "Before" },
    after: { value: "98", label: "After" },
    improvement: "+46 points",
    barBefore: 52,
    barAfter: 98,
  },
];

function MetricRow({ metric, index }: { metric: Metric; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="py-8 border-b border-neutral-700/40 last:border-b-0"
      initial={reduced ? undefined : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold text-neutral-200">{metric.label}</h3>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-500/10 text-accent-400 border border-accent-500/20">
          {metric.improvement}
        </span>
      </div>

      {/* Before bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-neutral-500 mb-1.5">
          <span>{metric.before.label}</span>
          <span className="text-red-400/80">{metric.before.value}</span>
        </div>
        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-red-500/40"
            initial={{ width: 0 }}
            animate={inView ? { width: `${metric.barBefore}%` } : {}}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>

      {/* After bar */}
      <div>
        <div className="flex justify-between text-xs text-neutral-500 mb-1.5">
          <span>{metric.after.label}</span>
          <span className="text-accent-400">{metric.after.value}</span>
        </div>
        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "var(--gradient-hero)" }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${metric.barAfter}%` } : {}}
            transition={{ delay: index * 0.1 + 0.4, duration: 1, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function PerformanceMetrics() {
  return (
    <section className="py-28 md:py-36 lg:py-44 border-t border-neutral-700/30">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <FadeIn>
            <span className="section-label">Performance</span>
            <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-50 tracking-tight leading-[1]">
              Measurably{" "}
              <span className="gradient-text">faster</span>
            </h2>
            <p className="mt-6 text-lg text-neutral-400 leading-relaxed">
              Real numbers from a real client migration. We don&apos;t guess — we measure,
              optimize, and prove the difference.
            </p>
            <p className="mt-4 text-sm text-neutral-500">
              Data from FinTrack platform rebuild. Before: legacy monolith. After: Next.js + edge infrastructure.
            </p>
          </FadeIn>

          <div>
            {metrics.map((metric, i) => (
              <MetricRow key={metric.label} metric={metric} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
