import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description: "A small team that ships big systems. Senior engineers, direct communication, and zero filler roles.",
};

const values = [
  { title: "Ownership over output", description: "We don't throw code over a wall. We own the outcome." },
  { title: "Clarity over cleverness", description: "Simple solutions that anyone on your team can maintain." },
  { title: "Candor over comfort", description: "We'll tell you if your timeline is unrealistic or your stack is wrong." },
];

const team = [
  { name: "Adrian Ionescu", role: "Founder & Lead Engineer" },
  { name: "Maria Popa", role: "Senior Frontend Engineer" },
  { name: "Andrei Radu", role: "Cloud & DevOps Engineer" },
  { name: "Elena Dinu", role: "Mobile Engineer" },
  { name: "Cristian Barbu", role: "Backend Engineer" },
  { name: "Ana Moldovan", role: "Product Designer" },
];

const stats = [
  { value: "6-10", label: "Engineers" },
  { value: "5+", label: "Years avg seniority" },
  { value: "< 24h", label: "Response time" },
  { value: "85%", label: "Client retention" },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        headline="A small team that ships big systems"
        subheadline="Arinit Solutions is a boutique engineering studio. Senior engineers, direct communication, and zero filler roles."
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-neutral-50 tracking-tight mb-4">Why we exist</h2>
            </div>
            <div>
              <p className="text-neutral-300 leading-relaxed mb-4">
                We started Arinit because we were tired of watching good projects fail — not because of bad ideas,
                but because of bad execution. Bloated teams, poor architecture decisions, and vendors who disappear after launch.
              </p>
              <p className="text-neutral-300 leading-relaxed">
                So we built the kind of studio we&apos;d want to hire: small, senior, transparent, and accountable
                for outcomes — not just outputs.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 border-t border-neutral-700/50">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-50 tracking-tight text-center mb-10">What drives us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <Card key={v.title} variant="default">
                <h3 className="text-lg font-medium text-neutral-50 mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-300">{v.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 border-t border-neutral-700/50">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-50 tracking-tight text-center mb-10">The people behind the code</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto h-20 w-20 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-2xl font-semibold text-accent-400 mb-3">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <p className="text-sm font-medium text-neutral-50">{member.name}</p>
                <p className="text-xs text-neutral-500">{member.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <StatsStrip stats={stats} />

      <CtaBanner
        headline="Want to work with us?"
        body="We take on a limited number of projects at a time to protect quality."
        primaryCta={{ label: "Book a Call", href: "/contact" }}
        secondaryCta={{ label: "See Open Roles", href: "/contact" }}
      />
    </>
  );
}
