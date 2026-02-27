"use client";

import Link from "next/link";


import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Container } from "@/components/layout/container";


import { FadeIn } from "@/components/ui/fade-in";
import { viewportOnce } from "@/lib/animations";

/* ── Data ── */

const services = [
  {
    title: "Web Development",
    description:
      "Applications, platforms, and headless commerce — built for speed and accessibility.",
    href: "/services/web",
    mockup: "browser" as const,
    metric: { value: 40, suffix: "+", label: "web apps shipped" },
    tags: [
      "SaaS Platforms",
      "Headless Commerce",
      "Internal Tools",
      "API Design",
      "Performance",
    ],
  },
  {
    title: "Mobile Development",
    description:
      "Native iOS, Android, and cross-platform apps that feel right on every device.",
    href: "/services/mobile",
    mockup: "phone" as const,
    metric: { value: 12, suffix: "+", label: "apps on stores" },
    tags: [
      "React Native",
      "Swift",
      "Kotlin",
      "Offline-First",
      "App Store Optimization",
    ],
  },
  {
    title: "Cloud & Infrastructure",
    description:
      "Architecture, migration, and DevOps on AWS and GCP. Reliable, observable, cost-aware.",
    href: "/services/cloud",
    mockup: "cloud" as const,
    metric: { value: 99.9, suffix: "%", label: "uptime maintained" },
    tags: ["AWS", "GCP", "Kubernetes", "CI/CD", "Cost Optimization"],
  },
  {
    title: "AI & LLM Solutions",
    description:
      "Workflow automation, LLM integration, and intelligent pipelines — built for production, not demos.",
    href: "/services/ai",
    mockup: "ai" as const,
    metric: { value: 6, suffix: "+", label: "AI systems in production" },
    tags: [
      "n8n Workflows",
      "LLM Integration",
      "RAG Pipelines",
      "Copilot UIs",
      "Eval Frameworks",
    ],
  },
];

/* ── Visual mockups (draw-on-scroll SVG) ── */

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.1, duration: 1.2, ease: [0.4, 0, 0.2, 1] as const },
      opacity: { delay: i * 0.1, duration: 0.2 },
    },
  }),
};

const appear = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.1 + 0.3, duration: 0.6 },
  }),
};

const mStroke = {
  stroke: "url(#mockGrad)",
  strokeWidth: 1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

const mStrokeDim = {
  ...mStroke,
  stroke: "url(#mockGradDim)",
};

function MockGradDefs() {
  return (
    <defs>
      <linearGradient id="mockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-accent-400)" />
        <stop offset="100%" stopColor="var(--color-accent-300)" />
      </linearGradient>
      <linearGradient id="mockGradDim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-accent-400)" stopOpacity="0.3" />
        <stop offset="100%" stopColor="var(--color-accent-300)" stopOpacity="0.3" />
      </linearGradient>
    </defs>
  );
}

function BrowserMockup() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 280 180" fill="none">
      <MockGradDefs />
      {/* Browser frame */}
      <motion.rect x="10" y="10" width="260" height="160" rx="8" {...mStroke} variants={draw} custom={0} />
      {/* Title bar */}
      <motion.line x1="10" y1="36" x2="270" y2="36" {...mStroke} variants={draw} custom={1} />
      {/* Window dots */}
      <motion.circle cx="28" cy="23" r="4" {...mStroke} variants={draw} custom={0.5} />
      <motion.circle cx="42" cy="23" r="4" {...mStroke} variants={draw} custom={0.6} />
      <motion.circle cx="56" cy="23" r="4" {...mStroke} variants={draw} custom={0.7} />
      {/* URL bar */}
      <motion.rect x="72" y="17" width="120" height="12" rx="6" {...mStrokeDim} variants={draw} custom={1} />
      {/* Content blocks */}
      <motion.rect x="24" y="50" width="100" height="10" rx="2" {...mStrokeDim} variants={appear} custom={2} />
      <motion.rect x="24" y="68" width="160" height="6" rx="2" {...mStrokeDim} variants={appear} custom={2.5} />
      <motion.rect x="24" y="80" width="140" height="6" rx="2" {...mStrokeDim} variants={appear} custom={3} />
      {/* Hero image placeholder */}
      <motion.rect x="24" y="98" width="232" height="56" rx="4" {...mStrokeDim} variants={appear} custom={3.5} />
      {/* Navigation items */}
      <motion.rect x="210" y="17" width="44" height="12" rx="6" {...mStroke} variants={appear} custom={1.5} />
    </svg>
  );
}

function PhoneMockup() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 280 180" fill="none">
      <MockGradDefs />
      {/* Phone body */}
      <motion.rect x="95" y="6" width="90" height="168" rx="14" {...mStroke} variants={draw} custom={0} />
      {/* Screen */}
      <motion.rect x="101" y="22" width="78" height="136" rx="4" {...mStrokeDim} variants={draw} custom={1} />
      {/* Notch */}
      <motion.rect x="125" y="10" width="30" height="8" rx="4" {...mStroke} variants={draw} custom={0.5} />
      {/* Status bar content */}
      <motion.rect x="108" y="28" width="30" height="4" rx="2" {...mStrokeDim} variants={appear} custom={1.5} />
      {/* App header */}
      <motion.rect x="108" y="40" width="64" height="8" rx="2" {...mStrokeDim} variants={appear} custom={2} />
      {/* Content cards */}
      <motion.rect x="108" y="56" width="64" height="32" rx="4" {...mStrokeDim} variants={appear} custom={2.5} />
      <motion.rect x="108" y="94" width="64" height="32" rx="4" {...mStrokeDim} variants={appear} custom={3} />
      {/* Tab bar */}
      <motion.line x1="101" y1="140" x2="179" y2="140" {...mStrokeDim} variants={draw} custom={3.5} />
      <motion.circle cx="120" cy="150" r="4" {...mStroke} variants={appear} custom={4} />
      <motion.circle cx="140" cy="150" r="4" {...mStroke} variants={appear} custom={4.2} />
      <motion.circle cx="160" cy="150" r="4" {...mStroke} variants={appear} custom={4.4} />
      {/* Home indicator */}
      <motion.line x1="127" y1="166" x2="153" y2="166" {...mStroke} strokeWidth={2} variants={draw} custom={4.5} />
    </svg>
  );
}

function CloudMockup() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 280 180" fill="none">
      <MockGradDefs />
      {/* Main cloud */}
      <motion.path
        d="M80 100h120a28 28 0 0 0 5-55.5 36 36 0 0 0-68-8 22 22 0 0 0-57 12A24 24 0 0 0 80 100z"
        {...mStroke}
        variants={draw}
        custom={0}
      />
      {/* Server nodes below cloud */}
      <motion.rect x="68" y="116" width="40" height="28" rx="4" {...mStroke} variants={draw} custom={2} />
      <motion.rect x="120" y="116" width="40" height="28" rx="4" {...mStroke} variants={draw} custom={2.3} />
      <motion.rect x="172" y="116" width="40" height="28" rx="4" {...mStroke} variants={draw} custom={2.6} />
      {/* Connection lines from cloud to servers */}
      <motion.line x1="88" y1="100" x2="88" y2="116" {...mStrokeDim} variants={draw} custom={1.5} />
      <motion.line x1="140" y1="100" x2="140" y2="116" {...mStrokeDim} variants={draw} custom={1.7} />
      <motion.line x1="192" y1="100" x2="192" y2="116" {...mStrokeDim} variants={draw} custom={1.9} />
      {/* Server detail lines */}
      <motion.line x1="74" y1="124" x2="82" y2="124" {...mStroke} variants={appear} custom={3} />
      <motion.line x1="74" y1="130" x2="86" y2="130" {...mStroke} variants={appear} custom={3.2} />
      <motion.line x1="126" y1="124" x2="134" y2="124" {...mStroke} variants={appear} custom={3.4} />
      <motion.line x1="126" y1="130" x2="138" y2="130" {...mStroke} variants={appear} custom={3.6} />
      <motion.line x1="178" y1="124" x2="186" y2="124" {...mStroke} variants={appear} custom={3.8} />
      <motion.line x1="178" y1="130" x2="190" y2="130" {...mStroke} variants={appear} custom={4} />
      {/* Status dots on servers */}
      <motion.circle cx="100" cy="125" r="2.5" fill="var(--color-accent-400)" variants={appear} custom={4.5} />
      <motion.circle cx="152" cy="125" r="2.5" fill="var(--color-accent-400)" variants={appear} custom={4.7} />
      <motion.circle cx="204" cy="125" r="2.5" fill="var(--color-accent-400)" variants={appear} custom={4.9} />
      {/* Horizontal connection between servers */}
      <motion.line x1="108" y1="130" x2="120" y2="130" {...mStrokeDim} variants={draw} custom={3.5} />
      <motion.line x1="160" y1="130" x2="172" y2="130" {...mStrokeDim} variants={draw} custom={3.8} />
    </svg>
  );
}

function AiMockup() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 280 180" fill="none">
      <MockGradDefs />
      {/* Central brain node */}
      <motion.circle cx="140" cy="70" r="22" {...mStroke} variants={draw} custom={0} />
      <motion.circle cx="140" cy="70" r="9" {...mStrokeDim} variants={draw} custom={0.5} />
      {/* Input nodes (left) */}
      <motion.rect x="28" y="32" width="38" height="22" rx="4" {...mStroke} variants={draw} custom={1} />
      <motion.rect x="28" y="72" width="38" height="22" rx="4" {...mStroke} variants={draw} custom={1.3} />
      <motion.rect x="28" y="112" width="38" height="22" rx="4" {...mStroke} variants={draw} custom={1.6} />
      {/* Output nodes (right) */}
      <motion.rect x="214" y="32" width="38" height="22" rx="4" {...mStroke} variants={draw} custom={1.2} />
      <motion.rect x="214" y="72" width="38" height="22" rx="4" {...mStroke} variants={draw} custom={1.5} />
      {/* Connections: inputs → center */}
      <motion.line x1="66" y1="43" x2="118" y2="65" {...mStrokeDim} variants={draw} custom={2} />
      <motion.line x1="66" y1="83" x2="118" y2="72" {...mStrokeDim} variants={draw} custom={2.2} />
      <motion.line x1="66" y1="123" x2="118" y2="78" {...mStrokeDim} variants={draw} custom={2.4} />
      {/* Connections: center → outputs */}
      <motion.line x1="162" y1="65" x2="214" y2="43" {...mStrokeDim} variants={draw} custom={2.6} />
      <motion.line x1="162" y1="75" x2="214" y2="83" {...mStrokeDim} variants={draw} custom={2.8} />
      {/* Detail lines in input nodes */}
      <motion.line x1="34" y1="41" x2="54" y2="41" {...mStrokeDim} variants={appear} custom={3.5} />
      <motion.line x1="34" y1="81" x2="50" y2="81" {...mStrokeDim} variants={appear} custom={3.7} />
      <motion.line x1="34" y1="121" x2="52" y2="121" {...mStrokeDim} variants={appear} custom={3.9} />
      {/* Detail lines in output nodes */}
      <motion.line x1="220" y1="41" x2="240" y2="41" {...mStrokeDim} variants={appear} custom={4.1} />
      <motion.line x1="220" y1="81" x2="236" y2="81" {...mStrokeDim} variants={appear} custom={4.3} />
      {/* Sparkle dots on connections */}
      <motion.circle cx="92" cy="54" r="2" fill="var(--color-accent-400)" variants={appear} custom={4.5} />
      <motion.circle cx="188" cy="54" r="2" fill="var(--color-accent-400)" variants={appear} custom={4.7} />
      <motion.circle cx="188" cy="79" r="2" fill="var(--color-accent-400)" variants={appear} custom={4.9} />
      {/* Bottom workflow bar */}
      <motion.rect x="80" y="148" width="120" height="16" rx="8" {...mStroke} variants={draw} custom={3.2} />
      <motion.line x1="140" y1="92" x2="140" y2="148" {...mStrokeDim} variants={draw} custom={3} />
      {/* Progress fill in workflow bar */}
      <motion.rect x="86" y="153" width="48" height="6" rx="3" fill="var(--color-accent-400)" fillOpacity="0.4" variants={appear} custom={5} />
    </svg>
  );
}

const mockupMap = {
  browser: BrowserMockup,
  phone: PhoneMockup,
  cloud: CloudMockup,
  ai: AiMockup,
};

function ServiceMockup({ type }: { type: "browser" | "phone" | "cloud" | "ai" }) {
  const reduced = useReducedMotion();
  const Mockup = mockupMap[type];

  return (
    <motion.div
      className="w-full aspect-[280/180]"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <Mockup />
    </motion.div>
  );
}

/* ── Animated counter ── */

function AnimatedMetric({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduced = useReducedMotion();
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      setDisplayed(value);
      return;
    }

    const duration = 1500;
    const start = performance.now();
    let raf: number;

    function step(now: number) {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setDisplayed(Number((eased * value).toFixed(value % 1 !== 0 ? 1 : 0)));
      if (elapsed < 1) raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, reduced]);

  return (
    <div ref={ref} className="flex items-baseline gap-1.5">
      <span className="text-2xl sm:text-3xl font-bold text-accent-400 tabular-nums">
        {displayed}
        {suffix}
      </span>
      <span className="text-sm text-neutral-500">{label}</span>
    </div>
  );
}

/* ── Timeline progress line ── */

function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="absolute left-6 lg:left-8 top-0 bottom-0 w-px">
      {/* Background track */}
      <div className="absolute inset-0 bg-neutral-800" />
      {/* Animated fill */}
      {!reduced && (
        <motion.div
          className="absolute top-0 left-0 right-0 origin-top"
          style={{
            scaleY,
            background: "linear-gradient(to bottom, var(--color-accent-500), var(--color-accent-300))",
            height: "100%",
          }}
        />
      )}
    </div>
  );
}

/* ── Main section ── */

export function ServicesSection() {
  return (
    <section className="py-28 md:py-36 lg:py-44">
      <Container>
        <FadeIn>
          <span className="section-label">What we build</span>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-50 tracking-tight leading-[1]">
            Here&apos;s{" "}
            <span className="gradient-text">what we actually build</span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-neutral-400 max-w-xl">
            Four disciplines. One team. Every system designed to ship fast and
            hold up under pressure.
          </p>
        </FadeIn>

        {/* Timeline layout */}
        <div className="mt-20 relative">
          {/* Gradient timeline line (desktop only) */}
          <div className="hidden lg:block">
            <TimelineLine />
          </div>

          <div className="flex flex-col gap-20 lg:gap-28">
            {services.map((service, i) => {
              const isReversed = i % 2 === 1;
              return (
                <div key={service.title} className="relative">
                  {/* Timeline node */}
                  <FadeIn>
                    <div className="hidden lg:flex absolute left-4 lg:left-5.5 top-1 w-5 h-5 items-center justify-center z-10">
                      <div className="w-3 h-3 rounded-full bg-accent-500 ring-4 ring-neutral-950" />
                    </div>
                  </FadeIn>

                  {/* Content */}
                  <div className="lg:pl-20">
                    <FadeIn direction={isReversed ? "right" : "left"} delay={i * 0.1}>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        {/* Text side */}
                        <div className={isReversed ? "lg:order-2" : ""}>
                          <div className="flex items-center gap-3 mb-6">
                            <span className="text-xs font-mono text-accent-400/60 tracking-wider">
                              0{i + 1}
                            </span>
                            <div className="h-px flex-1 max-w-12 bg-accent-500/30" />
                          </div>
                          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-50 tracking-tight leading-[1]">
                            {service.title}
                          </h3>
                          <p className="mt-5 text-lg text-neutral-400 leading-relaxed max-w-md">
                            {service.description}
                          </p>

                          <div className="mt-6 flex flex-wrap gap-2">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-neutral-700/50 text-xs text-neutral-400 hover:border-accent-500/40 hover:text-neutral-200 transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="mt-8 flex items-center justify-between gap-6">
                            <AnimatedMetric
                              value={service.metric.value}
                              suffix={service.metric.suffix}
                              label={service.metric.label}
                            />
                            <Link
                              href={service.href}
                              className="text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors whitespace-nowrap"
                            >
                              Learn more &rarr;
                            </Link>
                          </div>
                        </div>

                        {/* Mockup side */}
                        <div className={`${isReversed ? "lg:order-1" : ""} relative`}>
                          <div className="relative rounded-2xl border border-neutral-700/30 bg-neutral-900/50 p-6 overflow-hidden">
                            {/* Subtle glow behind mockup */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 via-transparent to-accent-400/5 pointer-events-none" />
                            <ServiceMockup type={service.mockup} />
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </Container>
    </section>
  );
}
