import { redirect } from "next/navigation";

// Pricing page temporarily disabled — redirects to homepage
export default function PricingPage() {
  redirect("/");
}

/* === ORIGINAL PRICING PAGE (commented out) ===

import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { PricingCards } from "@/components/sections/pricing-cards";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Container } from "@/components/layout/container";
import { Accordion } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Clear pricing, no guesswork. Project-based, retained team, and advisory engagements.",
};

const plans = [
  {
    name: "Project-Based",
    bestFor: "Defined scope with clear deliverables",
    price: "\u20AC15,000",
    features: [
      "Fixed scope, fixed price, fixed timeline",
      "All four delivery phases (Discover \u2192 Launch)",
      "Weekly demos and async standups",
      "30-day post-launch support",
      "Full code ownership",
    ],
  },
  {
    name: "Retained Team",
    badge: "Most Flexible",
    bestFor: "Ongoing development with evolving scope",
    price: "\u20AC8,000/mo",
    highlighted: true,
    features: [
      "Dedicated senior engineer(s)",
      "Two-week sprint cadence",
      "Flexible scope, reprioritize anytime",
      "CI/CD, monitoring, and infra included",
      "Cancel with 30-day notice",
    ],
  },
  {
    name: "Advisory & Audit",
    bestFor: "Architecture review, performance audit, or second opinion",
    price: "\u20AC3,000",
    features: [
      "Technical audit (code, infra, or performance)",
      "Written report with prioritized recommendations",
      "90-minute walkthrough call",
      "Optional: implementation roadmap",
    ],
  },
];

const alwaysIncluded = [
  "Full code ownership \u2014 you own everything we build",
  "CI/CD pipeline \u2014 automated from day one",
  "Test coverage \u2014 unit, integration, and e2e",
  "Documentation \u2014 architecture, API, and runbooks",
  "Security baseline \u2014 dependency scanning, secret management",
  "Post-launch support \u2014 30 days included",
];

const faqs = [
  { question: "How do you estimate project cost?", answer: "We run a paid Discovery phase (1\u20132 weeks) that produces a detailed scope, architecture plan, and fixed-price estimate. No surprises after that." },
  { question: "Can we start small and scale up?", answer: "Yes. Many clients start with an Advisory & Audit, then move to a project or retained engagement based on findings." },
  { question: "What if the scope changes mid-project?", answer: "For project-based work, we use a change request process \u2014 transparent pricing for additions, no hidden fees. For retained, you simply reprioritize the backlog." },
  { question: "Do you work with early-stage startups?", answer: "Yes, if the project scope aligns with our minimums. We\u2019re candid about whether our pricing fits your stage." },
  { question: "What\u2019s your team structure?", answer: "Senior engineers only. No juniors, no outsourcing. Your project gets the same people from kickoff to launch." },
  { question: "What about AI/LLM work?", answer: "LLM automation is available as an add-on to any engagement. We scope it separately based on your use case." },
];

export default function PricingPage() {
  return (
    <>
      <Hero
        headline="Clear pricing. No guesswork."
        subheadline="Every project is scoped individually, but here\u2019s how our pricing works so you can plan with confidence."
      />

      <section className="py-24 md:py-32">
        <Container>
          <PricingCards plans={plans} />
        </Container>
      </section>

      <section className="py-24 md:py-32 border-t border-neutral-700/30">
        <Container>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-50 tracking-tight leading-[1] text-center mb-14">Included in every engagement</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {alwaysIncluded.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent-400 mt-0.5 shrink-0" />
                <span className="text-sm text-neutral-400">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32 border-t border-neutral-700/30">
        <Container className="max-w-[680px]">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-50 tracking-tight leading-[1] text-center mb-14">Common questions</h2>
          <Accordion items={faqs} />
        </Container>
      </section>

      <CtaBanner
        headline="Let\u2019s scope your project"
        body="Book a 30-minute call. We\u2019ll discuss your goals, estimate effort, and tell you honestly if we\u2019re the right fit."
        primaryCta={{ label: "Book a Call", href: "/contact" }}
        secondaryCta={{ label: "Send a Brief", href: "/contact" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
    </>
  );
}

=== END ORIGINAL PRICING PAGE === */
