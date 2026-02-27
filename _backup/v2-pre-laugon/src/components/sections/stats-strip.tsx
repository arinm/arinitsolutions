"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface Stat {
  value: string;
  label: string;
}

function AnimatedValue({ value, inView, reduced }: { value: string; inView: boolean; reduced: boolean | null }) {
  const numericMatch = value.match(/^([<>]?\s*)(\d+\.?\d*)(.*)/);
  const [displayNum, setDisplayNum] = useState(0);

  useEffect(() => {
    if (!inView || reduced || !numericMatch) return;
    const target = parseFloat(numericMatch[2]);
    const duration = 1000;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayNum(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, reduced, numericMatch]);

  if (!numericMatch || reduced) return <>{value}</>;
  const prefix = numericMatch[1];
  const target = parseFloat(numericMatch[2]);
  const suffix = numericMatch[3];
  const isDecimal = numericMatch[2].includes(".");

  return (
    <>
      {prefix}
      {inView ? (isDecimal ? displayNum.toFixed(1) : Math.round(displayNum)) : 0}
      {suffix}
    </>
  );
}

export function StatsStrip({ stats, className }: { stats: Stat[]; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduced = useReducedMotion();

  return (
    <section ref={ref} className={cn("border-y border-neutral-700 bg-neutral-850", className)}>
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-neutral-700">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center px-4"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-neutral-50 tracking-tight">
                <AnimatedValue value={stat.value} inView={inView} reduced={reduced} />
              </div>
              <div className="mt-1 text-sm text-neutral-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
