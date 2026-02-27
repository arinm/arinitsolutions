import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description: "A small team that ships big systems. Senior engineers, direct communication, and zero filler roles.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Ownership over output", description: "We don't throw code over a wall. We own the outcome." },
  { title: "Clarity over cleverness", description: "Simple solutions that anyone on your team can maintain." },
  { title: "Candor over comfort", description: "We'll tell you if your timeline is unrealistic or your stack is wrong." },
];

const howWeWork = [
  {
    icon: "eye",
    title: "Every line peer-reviewed",
    description: "No code ships without a second pair of senior eyes. We catch issues before they reach your users.",
  },
  {
    icon: "shield",
    title: "Production-grade from day one",
    description: "Tests, CI/CD, monitoring, and error tracking — set up before the first feature ships, not after.",
  },
  {
    icon: "message",
    title: "Direct access to your team",
    description: "No project managers relaying messages. You talk directly to the engineers building your product.",
  },
  {
    icon: "lock",
    title: "Your code, your IP",
    description: "Full repo access from day one. No vendor lock-in, no proprietary frameworks, no surprises.",
  },
];

const roles = [
  { role: "Lead Engineer", stack: ["Architecture", "React", "Node.js", "PostgreSQL"] },
  { role: "Frontend Engineer", stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { role: "Backend Engineer", stack: ["Node.js", "GraphQL", "PostgreSQL", "Redis"] },
  { role: "Mobile Engineer", stack: ["React Native", "Expo", "TypeScript"] },
  { role: "Cloud & DevOps", stack: ["AWS", "Docker", "CI/CD", "Terraform"] },
  { role: "Product Designer", stack: ["Figma", "Design Systems", "Prototyping"] },
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

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-neutral-50 tracking-tight leading-[1]">Why we exist</h2>
            </div>
            <div>
              <p className="text-lg text-neutral-400 leading-relaxed mb-5">
                We started Arinit because we were tired of watching good projects fail — not because of bad ideas,
                but because of bad execution. Bloated teams, poor architecture decisions, and vendors who disappear after launch.
              </p>
              <p className="text-lg text-neutral-400 leading-relaxed">
                So we built the kind of studio we&apos;d want to hire: small, senior, transparent, and accountable
                for outcomes — not just outputs.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32 border-t border-neutral-700/30">
        <Container>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-50 tracking-tight leading-[1] text-center mb-14">What drives us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <Card key={v.title} variant="default">
                <h3 className="text-lg font-semibold text-neutral-50 mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-400">{v.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32 border-t border-neutral-700/30">
        <Container>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-50 tracking-tight leading-[1] text-center mb-4">
            How we <span className="gradient-text">work</span>
          </h2>
          <p className="text-center text-neutral-400 max-w-lg mx-auto mb-14">
            No black boxes, no outsourced layers. Here&apos;s what working with us actually looks like.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {howWeWork.map((item) => (
              <Card key={item.title} variant="default">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-accent-500/10 flex items-center justify-center">
                    {item.icon === "eye" && (
                      <svg className="h-5 w-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    )}
                    {item.icon === "shield" && (
                      <svg className="h-5 w-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
                    )}
                    {item.icon === "message" && (
                      <svg className="h-5 w-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>
                    )}
                    {item.icon === "lock" && (
                      <svg className="h-5 w-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-neutral-50 mb-1">{item.title}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Anonymous roles */}
          <div className="mt-16 pt-16 border-t border-neutral-700/30">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 text-center mb-8">The team</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {roles.map((member) => (
                <div key={member.role} className="text-center group">
                  <div className="mx-auto h-14 w-14 rounded-full bg-neutral-800/80 border border-neutral-700/50 flex items-center justify-center mb-3 group-hover:border-accent-500/30 transition-colors">
                    <svg className="h-6 w-6 text-neutral-500 group-hover:text-accent-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                  </div>
                  <p className="text-sm font-medium text-neutral-200 mb-1.5">{member.role}</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {member.stack.map((tech) => (
                      <span key={tech} className="text-[10px] text-neutral-500 bg-neutral-800/50 rounded px-1.5 py-0.5">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
