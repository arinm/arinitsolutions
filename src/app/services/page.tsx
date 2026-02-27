import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Smartphone, Cloud, BrainCircuit } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Timeline } from "@/components/sections/timeline";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Services",
  description: "Web, mobile, cloud, and AI automation — built for performance, scale, and long-term maintainability.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    icon: Globe,
    title: "Web Development",
    href: "/services/web",
    description: "Production-grade apps, platforms, and headless commerce. React, Next.js, Node, Postgres — chosen for the problem, not the trend.",
    deliverables: ["SaaS platforms", "Headless e-commerce", "Internal tools & dashboards", "API design & integration"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    href: "/services/mobile",
    description: "Native iOS, Android, and cross-platform — built for offline resilience, smooth animations, and real user retention.",
    deliverables: ["Cross-platform (React Native)", "Native iOS (Swift)", "Native Android (Kotlin)", "Offline-first architecture"],
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    href: "/services/cloud",
    description: "Architecture, migration, and DevOps on AWS and GCP. Observable, cost-aware, and built so your on-call engineers can sleep.",
    deliverables: ["Cloud architecture", "Migration", "DevOps & CI/CD", "Cost optimization"],
  },
  {
    icon: BrainCircuit,
    title: "AI & LLM Solutions",
    href: "/services/ai",
    description: "Workflow automation, LLM integration, RAG pipelines, and copilot UIs — practical AI that delivers measurable efficiency, not hype.",
    deliverables: ["Workflow automation (n8n)", "LLM integration & RAG", "Copilot & assistant UIs", "AI evaluation & monitoring"],
  },
];

const techStack = [
  { category: "Frontend", techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Mobile", techs: ["React Native", "Swift", "Kotlin"] },
  { category: "Backend", techs: ["Node.js", "Python", "Go"] },
  { category: "Data", techs: ["PostgreSQL", "Redis", "Elasticsearch"] },
  { category: "Cloud", techs: ["AWS", "GCP", "Terraform", "Docker", "Kubernetes"] },
  { category: "AI/ML", techs: ["OpenAI", "Anthropic", "LangChain", "Pinecone"] },
];

const phases = [
  { number: "01", label: "Discover", description: "We map your goals, constraints, and stack." },
  { number: "02", label: "Architect", description: "System design, tech choices, risk assessment." },
  { number: "03", label: "Build", description: "Two-week sprints with async standups and live demos." },
  { number: "04", label: "Launch & Scale", description: "Deploy, monitor, iterate, hand off or retain." },
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        headline="Systems built for what comes next"
        subheadline="Web, mobile, cloud, and AI — engineered by a team that ships production code, not slide decks."
        align="center"
        gradient
      />

      {/* Service Cards */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((s) => (
              <Link key={s.title} href={s.href} className="block group">
                <Card variant="interactive" className="h-full flex flex-col">
                  <s.icon className="h-8 w-8 text-accent-400 mb-4" />
                  <h2 className="text-2xl font-bold text-neutral-50 mb-3">{s.title}</h2>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4">{s.description}</p>
                  <div className="border-t border-neutral-700/50 pt-4 mt-auto">
                    <p className="text-xs text-neutral-500 mb-2">Key deliverables:</p>
                    <ul className="space-y-1">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-sm text-neutral-400">
                          <span className="h-1 w-1 rounded-full bg-accent-400 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="mt-4 text-sm font-medium text-accent-400">
                    Explore {s.title.toLowerCase()} &rarr;
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Tech Stack */}
      <section className="py-24 md:py-32 border-t border-neutral-700/30">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-50 tracking-tight leading-[1]">Our stack</h2>
            <p className="mt-5 text-lg text-neutral-400">We pick tools that last. No r&eacute;sum&eacute;-driven development.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((group) => (
              <div key={group.category}>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">{group.category}</p>
                <div className="flex flex-wrap gap-2">
                  {group.techs.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <Timeline
        headline="From brief to production in weeks, not quarters"
        body="Every engagement follows our four-phase delivery model. Predictable timelines. Weekly demos. No scope fog."
        phases={phases}
        compact
      />

      <div className="text-center pb-20">
        <Link href="/approach" className="text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors">
          View full approach &rarr;
        </Link>
      </div>

      <CtaBanner
        headline="Have a project in mind?"
        body="Tell us what you're building. We'll tell you how we'd approach it."
        primaryCta={{ label: "Book a Call", href: "/contact" }}
        secondaryCta={{ label: "Send a Brief", href: "/contact" }}
      />
    </>
  );
}
