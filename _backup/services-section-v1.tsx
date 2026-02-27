"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { viewportOnce } from "@/lib/animations";

/* ── Data ── */

const services = [
  {
    title: "Web Development",
    description:
      "Applications, platforms, and headless commerce — built for speed and accessibility.",
    href: "/services/web",
    icon: "web" as const,
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
    icon: "mobile" as const,
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
    icon: "cloud" as const,
    metric: { value: 99.9, suffix: "%", label: "uptime maintained" },
    tags: ["AWS", "GCP", "Kubernetes", "CI/CD", "Cost Optimization"],
  },
];

/* ── Animated SVG icons (draw on scroll) ── */

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.12, duration: 1, ease: [0.4, 0, 0.2, 1] as const },
      opacity: { delay: i * 0.12, duration: 0.2 },
    },
  }),
};

const svgSize = { width: 40, height: 40, viewBox: "0 0 48 48", fill: "none" };
const stroke = {
  stroke: "url(#svcGrad)",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function GradDef() {
  return (
    <defs>
      <linearGradient id="svcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-accent-400)" />
        <stop offset="100%" stopColor="var(--color-accent-300)" />
      </linearGradient>
    </defs>
  );
}

function WebSvg() {
  return (
    <svg {...svgSize}>
      <GradDef />
      <motion.rect x="6" y="8" width="36" height="28" rx="3" {...stroke} variants={draw} custom={0} />
      <motion.line x1="6" y1="16" x2="42" y2="16" {...stroke} variants={draw} custom={1} />
      <motion.circle cx="11" cy="12" r="1.2" {...stroke} variants={draw} custom={0.5} />
      <motion.circle cx="16" cy="12" r="1.2" {...stroke} variants={draw} custom={0.6} />
      <motion.circle cx="21" cy="12" r="1.2" {...stroke} variants={draw} custom={0.7} />
      <motion.line x1="12" y1="22" x2="28" y2="22" {...stroke} variants={draw} custom={2} />
      <motion.line x1="12" y1="27" x2="22" y2="27" {...stroke} variants={draw} custom={2.5} />
      <motion.line x1="12" y1="32" x2="30" y2="32" {...stroke} variants={draw} custom={3} />
    </svg>
  );
}

function MobileSvg() {
  return (
    <svg {...svgSize}>
      <GradDef />
      <motion.rect x="13" y="4" width="22" height="40" rx="4" {...stroke} variants={draw} custom={0} />
      <motion.rect x="16" y="10" width="16" height="24" rx="1" {...stroke} variants={draw} custom={1} />
      <motion.line x1="21" y1="7" x2="27" y2="7" {...stroke} variants={draw} custom={0.5} />
      <motion.line x1="20" y1="40" x2="28" y2="40" {...stroke} strokeWidth={2} variants={draw} custom={2} />
      <motion.circle cx="21" cy="17" r="1.5" {...stroke} variants={draw} custom={2} />
      <motion.circle cx="27" cy="17" r="1.5" {...stroke} variants={draw} custom={2.2} />
      <motion.circle cx="21" cy="23" r="1.5" {...stroke} variants={draw} custom={2.4} />
      <motion.circle cx="27" cy="23" r="1.5" {...stroke} variants={draw} custom={2.6} />
    </svg>
  );
}

function CloudSvg() {
  return (
    <svg {...svgSize}>
      <GradDef />
      <motion.path
        d="M14 32h20a8 8 0 0 0 1.5-15.87A10 10 0 0 0 16 18a10 10 0 0 0-.5 2A6 6 0 0 0 14 32z"
        {...stroke}
        variants={draw}
        custom={0}
      />
      <motion.line x1="19" y1="37" x2="19" y2="42" {...stroke} variants={draw} custom={1.5} />
      <motion.line x1="24" y1="35" x2="24" y2="42" {...stroke} variants={draw} custom={1.8} />
      <motion.line x1="29" y1="37" x2="29" y2="42" {...stroke} variants={draw} custom={2.1} />
      <motion.circle cx="20" cy="24" r="1.5" {...stroke} variants={draw} custom={2.5} />
      <motion.circle cx="28" cy="24" r="1.5" {...stroke} variants={draw} custom={2.7} />
      <motion.line x1="21.5" y1="24" x2="26.5" y2="24" {...stroke} variants={draw} custom={3} />
    </svg>
  );
}

const iconMap = { web: WebSvg, mobile: MobileSvg, cloud: CloudSvg };

function ServiceIcon({ type }: { type: "web" | "mobile" | "cloud" }) {
  const reduced = useReducedMotion();
  const Icon = iconMap[type];

  return (
    <motion.div
      className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent-500/10 border border-accent-500/20"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {reduced ? (
        <div className="w-10 h-10 text-accent-400">
          <Icon />
        </div>
      ) : (
        <Icon />
      )}
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
      // ease out cubic
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setDisplayed(Number((eased * value).toFixed(value % 1 !== 0 ? 1 : 0)));
      if (elapsed < 1) raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, reduced]);

  return (
    <div ref={ref} className="flex items-baseline gap-1.5 mt-5">
      <span className="text-2xl sm:text-3xl font-bold text-accent-400 tabular-nums">
        {displayed}
        {suffix}
      </span>
      <span className="text-sm text-neutral-500">{label}</span>
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
            Three disciplines. One team. Every system designed to ship fast and
            hold up under pressure.
          </p>
        </FadeIn>

        <div className="mt-20 grid grid-cols-1 gap-6">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.1}>
              <SpotlightCard className="p-8 md:p-10 lg:p-12">
                <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
                  {/* Left: icon + title + description */}
                  <div className="lg:w-1/2 shrink-0">
                    <ServiceIcon type={service.icon} />
                    <h3 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-50 tracking-tight leading-[1]">
                      {service.title}
                    </h3>
                    <p className="mt-5 text-lg text-neutral-400 leading-relaxed max-w-md">
                      {service.description}
                    </p>
                  </div>

                  {/* Right: tags + metric */}
                  <div className="mt-8 lg:mt-0 lg:flex-1 flex flex-col justify-between">
                    <div className="flex flex-wrap gap-2.5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-4 py-2 rounded-full border border-neutral-700/50 text-sm text-neutral-300 hover:border-accent-500/40 hover:text-neutral-100 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex items-end justify-between gap-6">
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
                </div>
              </SpotlightCard>
            </FadeIn>
          ))}

          {/* AI & LLM add-on */}
          <FadeIn delay={0.3}>
            <SpotlightCard className="p-8 md:p-10 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
                <div className="lg:w-1/2 shrink-0">
                  <div className="flex items-center gap-3 mb-5">
                    <Sparkles className="h-6 w-6 text-accent-400" />
                    <Badge variant="accent">By Request</Badge>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-50 tracking-tight leading-[1.05]">
                    AI &amp; LLM Automation
                  </h3>
                  <p className="mt-5 text-lg text-neutral-400 leading-relaxed max-w-md">
                    RAG pipelines, prompt engineering, evaluation frameworks,
                    and copilot interfaces — integrated into your existing
                    workflows.
                  </p>
                </div>
                <div className="mt-8 lg:mt-0 lg:flex-1">
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      "RAG Pipelines",
                      "Prompt Engineering",
                      "Copilot Interfaces",
                      "Evaluation Frameworks",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-4 py-2 rounded-full border border-neutral-700/50 text-sm text-neutral-300 hover:border-accent-500/40 hover:text-neutral-100 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
