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
    price: "€15,000",
    features: [
      "Fixed scope, fixed price, fixed timeline",
      "All four delivery phases (Discover → Launch)",
      "Weekly demos and async standups",
      "30-day post-launch support",
      "Full code ownership",
    ],
  },
  {
    name: "Retained Team",
    badge: "Most Flexible",
    bestFor: "Ongoing development with evolving scope",
    price: "€8,000/mo",
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
    price: "€3,000",
    features: [
      "Technical audit (code, infra, or performance)",
      "Written report with prioritized recommendations",
      "90-minute walkthrough call",
      "Optional: implementation roadmap",
    ],
  },
];

const alwaysIncluded = [
  "Full code ownership — you own everything we build",
  "CI/CD pipeline — automated from day one",
  "Test coverage — unit, integration, and e2e",
  "Documentation — architecture, API, and runbooks",
  "Security baseline — dependency scanning, secret management",
  "Post-launch support — 30 days included",
];

const faqs = [
  { question: "How do you estimate project cost?", answer: "We run a paid Discovery phase (1–2 weeks) that produces a detailed scope, architecture plan, and fixed-price estimate. No surprises after that." },
  { question: "Can we start small and scale up?", answer: "Yes. Many clients start with an Advisory & Audit, then move to a project or retained engagement based on findings." },
  { question: "What if the scope changes mid-project?", answer: "For project-based work, we use a change request process — transparent pricing for additions, no hidden fees. For retained, you simply reprioritize the backlog." },
  { question: "Do you work with early-stage startups?", answer: "Yes, if the project scope aligns with our minimums. We're candid about whether our pricing fits your stage." },
  { question: "What's your team structure?", answer: "Senior engineers only. No juniors, no outsourcing. Your project gets the same people from kickoff to launch." },
  { question: "What about AI/LLM work?", answer: "LLM automation is available as an add-on to any engagement. We scope it separately based on your use case." },
];

export default function PricingPage() {
  return (
    <>
      <Hero
        headline="Clear pricing. No guesswork."
        subheadline="Every project is scoped individually, but here's how our pricing works so you can plan with confidence."
      />

      <section className="py-16 md:py-20">
        <Container>
          <PricingCards plans={plans} />
        </Container>
      </section>

      <section className="py-16 md:py-20 border-t border-neutral-700/50">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-50 tracking-tight text-center mb-10">Included in every engagement</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {alwaysIncluded.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent-400 mt-0.5 shrink-0" />
                <span className="text-sm text-neutral-300">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 border-t border-neutral-700/50">
        <Container className="max-w-[680px]">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-50 tracking-tight text-center mb-10">Common questions</h2>
          <Accordion items={faqs} />
        </Container>
      </section>

      <CtaBanner
        headline="Let's scope your project"
        body="Book a 30-minute call. We'll discuss your goals, estimate effort, and tell you honestly if we're the right fit."
        primaryCta={{ label: "Book a Call", href: "/contact" }}
        secondaryCta={{ label: "Send a Brief", href: "/contact" }}
      />

      {/* JSON-LD FAQPage */}
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
