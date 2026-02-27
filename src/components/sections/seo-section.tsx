"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Search,
  BarChart3,
  Globe,
  Zap,
  FileCode,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const seoCapabilities = [
  {
    icon: "Search",
    title: "Technical SEO Audit",
    description:
      "Crawl analysis, indexation issues, canonical chains, redirect maps, and structured data validation. We fix what Screaming Frog finds.",
    tags: ["Site Audit", "Crawlability", "Index Coverage"],
  },
  {
    icon: "FileCode",
    title: "On-Page Optimization",
    description:
      "Semantic HTML, heading hierarchy, meta tags, Open Graph, JSON-LD schemas, and internal linking architecture built into every page.",
    tags: ["Schema Markup", "Meta Tags", "Semantic HTML"],
  },
  {
    icon: "Zap",
    title: "Core Web Vitals",
    description:
      "LCP, FID, CLS — we engineer for green scores. Image optimization, code splitting, font loading strategies, and critical CSS extraction.",
    tags: ["LCP < 1.2s", "CLS < 0.05", "Performance"],
  },
  {
    icon: "Globe",
    title: "International SEO",
    description:
      "Hreflang implementation, locale routing, translated sitemaps, and region-specific content strategies for multi-market reach.",
    tags: ["Hreflang", "i18n", "Multi-Market"],
  },
  {
    icon: "BarChart3",
    title: "Analytics & Tracking",
    description:
      "GA4 setup, Search Console integration, conversion tracking, and custom dashboards so you see exactly what's working.",
    tags: ["GA4", "Search Console", "Conversion"],
  },
  {
    icon: "TrendingUp",
    title: "Growth Engineering",
    description:
      "Programmatic SEO, dynamic sitemap generation, automated meta from CMS content, and A/B tested landing pages at scale.",
    tags: ["Programmatic SEO", "Dynamic Pages", "A/B Testing"],
  },
];

const iconMap: Record<string, React.ElementType> = {
  Search,
  FileCode,
  Zap,
  Globe,
  BarChart3,
  TrendingUp,
};

const seoStats = [
  { value: "3x", label: "Avg. organic traffic increase" },
  { value: "< 1.2s", label: "Target LCP on every build" },
  { value: "100%", label: "Core Web Vitals pass rate" },
  { value: "#1", label: "Position for 68% of target keywords" },
];

function StatCounter({
  stat,
  index,
}: {
  stat: { value: string; label: string };
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="text-center px-4"
      initial={reduced ? undefined : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="text-3xl md:text-4xl font-bold text-neutral-50 tracking-tight gradient-text">
        {stat.value}
      </div>
      <div className="mt-2 text-xs text-neutral-500">{stat.label}</div>
    </motion.div>
  );
}

export function SeoSection() {
  return (
    <section className="py-28 md:py-36 lg:py-44 border-t border-neutral-700/30">
      <Container>
        <FadeIn>
          <span className="section-label">SEO expertise</span>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-50 tracking-tight leading-[1]">
            Built to{" "}
            <span className="gradient-text">rank</span>
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-neutral-400 max-w-2xl">
            SEO isn&apos;t an afterthought — it&apos;s engineered into every line of code.
            Technical excellence meets search visibility.
          </p>
        </FadeIn>

        {/* SEO Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-neutral-700/50 py-10 border-y border-neutral-700/30 bg-neutral-900/30 rounded-2xl">
          {seoStats.map((stat, i) => (
            <StatCounter key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Capability cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {seoCapabilities.map((cap, i) => {
            const Icon = iconMap[cap.icon];
            return (
              <FadeIn key={cap.title} delay={i * 0.06}>
                <SpotlightCard className="h-full">
                  <div className="p-8">
                    <Icon className="h-5 w-5 text-accent-400 mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-50 mb-2">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                      {cap.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cap.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border border-neutral-700/50 text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
