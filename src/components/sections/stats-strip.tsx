"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface Stat {
  value: string;
  label: string;
}

function parseValue(value: string) {
  const m = value.match(/^([<>]?\s*)(\d+\.?\d*)(.*)/);
  if (!m) return null;
  return { prefix: m[1], target: parseFloat(m[2]), suffix: m[3], isDecimal: m[2].includes(".") };
}

function AnimatedValue({ value, inView, reduced }: { value: string; inView: boolean; reduced: boolean | null }) {
  const parsed = useRef(parseValue(value));
  const [displayNum, setDisplayNum] = useState(0);

  useEffect(() => {
    const p = parsed.current;
    if (!inView || reduced || !p) return;
    const duration = 1200;
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayNum(eased * p!.target);
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const p = parsed.current;
  if (!p || reduced) return <>{value}</>;

  return (
    <>
      {p.prefix}
      {inView ? (p.isDecimal ? displayNum.toFixed(1) : Math.round(displayNum)) : 0}
      {p.suffix}
    </>
  );
}

export function StatsStrip({ stats, className }: { stats: Stat[]; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduced = useReducedMotion();

  return (
    <section ref={ref} className={cn("border-y border-neutral-700/50 bg-neutral-900/50", className)}>
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-neutral-700/50">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center px-4"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-neutral-50 tracking-tight">
                <AnimatedValue value={stat.value} inView={inView} reduced={reduced} />
              </div>
              <div className="mt-2 text-sm text-neutral-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
