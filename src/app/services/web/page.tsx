import type { Metadata } from "next";
import { Globe, Layout, ShoppingCart, Wrench, Gauge, Accessibility, GitPullRequest, Shield, Monitor } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Web Development",
  description: "Production-grade web applications, SaaS platforms, and headless commerce — engineered for sub-second loads and long-term maintainability.",
  alternates: { canonical: "/services/web" },
};

const capabilities = [
  { icon: Layout, title: "SaaS Platforms", description: "Multi-tenant architectures with auth, billing, and admin baked in." },
  { icon: ShoppingCart, title: "Headless Commerce", description: "Shopify, Medusa, or custom — decoupled frontends that convert." },
  { icon: Wrench, title: "Internal Tools", description: "Dashboards, CRMs, and ops tools that your team actually uses." },
  { icon: Globe, title: "API Design", description: "RESTful and GraphQL APIs. Typed, documented, versioned." },
  { icon: Gauge, title: "Performance Engineering", description: "Core Web Vitals optimization. LCP under 1.2s, CLS under 0.1." },
  { icon: Accessibility, title: "Accessibility", description: "WCAG 2.2 AA compliance from day one, not as an afterthought." },
];

const quality = [
  { icon: GitPullRequest, title: "CI/CD from day one", description: "Automated testing, preview deploys, zero-downtime releases." },
  { icon: Shield, title: "Code review rigor", description: "Every PR reviewed by a senior engineer. No solo merges." },
  { icon: Monitor, title: "Performance budget", description: "Lighthouse CI gates on every build. Regressions fail the pipeline." },
];

const stack = [
  { category: "Frontend", techs: ["React", "Next.js", "Astro", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", techs: ["Node.js", "Python", "Go"] },
  { category: "Data", techs: ["PostgreSQL", "Redis", "Elasticsearch"] },
];

export default function WebPage() {
  return (
    <>
      <Hero
        headline="Web systems that perform under pressure"
        subheadline="Applications, platforms, and headless commerce — engineered for sub-second loads, accessibility compliance, and clean long-term maintenance."
        primaryCta={{ label: "Book a Call", href: "/contact" }}
        secondaryCta={{ label: "See Web Work", href: "/work" }}
      />

      <section className="py-24 md:py-32">
        <Container>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-50 tracking-tight leading-[1] text-center mb-14">What we deliver</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c) => (
              <Card key={c.title} variant="default">
                <c.icon className="h-5 w-5 text-accent-400 mb-3" />
                <h3 className="text-lg font-semibold text-neutral-50 mb-1">{c.title}</h3>
                <p className="text-sm text-neutral-400">{c.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32 border-t border-neutral-700/30">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight leading-[1.1] mb-5">Tools we reach for</h2>
              <p className="text-lg text-neutral-400 leading-relaxed">
                We choose frameworks based on your constraints — team size, timeline, existing infrastructure — not on what&apos;s trending. Every choice is justified in our architecture document.
              </p>
            </div>
            <div className="space-y-6">
              {stack.map((group) => (
                <div key={group.category}>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.techs.map((t) => <Badge key={t}>{t}</Badge>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32 border-t border-neutral-700/30">
        <Container>
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-50 tracking-tight leading-[1] text-center mb-14">How we keep quality high</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quality.map((q) => (
              <Card key={q.title} variant="default">
                <q.icon className="h-5 w-5 text-accent-400 mb-3" />
                <h3 className="text-lg font-semibold text-neutral-50 mb-1">{q.title}</h3>
                <p className="text-sm text-neutral-400">{q.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner headline="Let's build your next web platform." />
    </>
  );
}
