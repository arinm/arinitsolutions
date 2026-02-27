import type { Metadata } from "next";
import Link from "next/link";
import { Eye, Code, MessageSquare, Shield, Users, DoorOpen, CheckCircle } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Timeline } from "@/components/sections/timeline";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Our Approach",
  description: "A structured, four-phase delivery model that keeps projects on time, on budget, and on speaking terms.",
  alternates: { canonical: "/approach" },
};

const phases = [
  {
    number: "01", label: "Discover", duration: "1\u20132 weeks",
    description: "We map your goals, constraints, users, and existing systems. No assumptions survive first contact.",
    deliverables: ["Stakeholder interviews & requirements document", "Technical audit of existing systems", "User journey mapping", "Risk register", "Scope definition & effort estimate"],
  },
  {
    number: "02", label: "Architect", duration: "1\u20132 weeks",
    description: "We design the system before we write a line of code. Architecture decisions documented, stack justified, trade-offs explicit.",
    deliverables: ["System architecture diagram (C4 model)", "Technology selection rationale", "Data model design", "API contract definitions", "Infrastructure blueprint"],
  },
  {
    number: "03", label: "Build", duration: "4\u201316 weeks",
    description: "Two-week sprints. Async standups. Weekly demos. You see working software every 14 days.",
    deliverables: ["Working software increments every sprint", "CI/CD pipeline from sprint 1", "Automated test suite (unit, integration, e2e)", "Preview/staging environment", "Sprint retrospectives with action items"],
  },
  {
    number: "04", label: "Launch & Scale", duration: "1\u20132 weeks + ongoing",
    description: "We deploy, monitor, and iterate. Then we either hand off cleanly or stay on as your technical team.",
    deliverables: ["Production deployment with rollback plan", "Monitoring & alerting setup", "Performance baseline documentation", "Knowledge transfer sessions", "Optional: retained support agreement"],
  },
];

const principles = [
  { icon: Eye, title: "Transparency over updates", description: "You have access to the repo, the board, and the deploys." },
  { icon: Code, title: "Working software over docs", description: "Documentation matters. Shipping matters more." },
  { icon: Shield, title: "Boring technology wins", description: "We pick tools with 5-year track records, not 5-month hype." },
  { icon: MessageSquare, title: "Measure, then optimize", description: "We don't guess. We instrument, observe, and iterate." },
  { icon: Users, title: "Small teams, high trust", description: "Senior engineers only. No bait-and-switch staffing." },
  { icon: DoorOpen, title: "Clean exits", description: "If we part ways, you own everything. Code, docs, access." },
];

const qualityGates = [
  "Code review (2 approvals)", "Automated tests pass (unit + integration + e2e)", "Lighthouse CI score \u2265 90",
  "Accessibility audit (axe-core, 0 critical violations)", "Security scan (dependency + SAST)",
  "Load test (if applicable)", "Stakeholder demo approval",
];

export default function ApproachPage() {
  return (
    <>
      <Hero
        headline="Delivery without surprises"
        subheadline="A structured, four-phase model that keeps projects on time, on budget, and on speaking terms. Every engagement. Every time."
      />

      <Timeline headline="The four phases" phases={phases} />

      <section className="py-24 md:py-32 border-t border-neutral-700/30">
        <Container>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-50 tracking-tight leading-[1] text-center mb-14">What we believe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p) => (
              <Card key={p.title} variant="default">
                <p.icon className="h-5 w-5 text-accent-400 mb-3" />
                <h3 className="text-lg font-semibold text-neutral-50 mb-1">{p.title}</h3>
                <p className="text-sm text-neutral-400">{p.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32 border-t border-neutral-700/30">
        <Container>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-50 tracking-tight leading-[1] text-center mb-5">Nothing ships without passing</h2>
          <p className="text-lg text-neutral-400 text-center mb-14 max-w-md mx-auto">Our quality gates ensure every release meets the bar.</p>
          <div className="max-w-lg mx-auto space-y-3">
            {qualityGates.map((gate) => (
              <div key={gate} className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-accent-400 shrink-0" />
                <span className="text-sm text-neutral-400">{gate}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        headline="Like how we work?"
        body="Let's talk about your project. We'll walk you through exactly how we'd approach it."
        primaryCta={{ label: "Book a Call", href: "/contact" }}
        secondaryCta={{ label: "See Our Work", href: "/work" }}
      />
    </>
  );
}
