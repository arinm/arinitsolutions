import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { LogoStrip } from "@/components/sections/logo-strip";
import { BentoGrid } from "@/components/sections/bento-grid";
import { StatsStrip } from "@/components/sections/stats-strip";
import { Timeline } from "@/components/sections/timeline";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getWorkPosts } from "@/lib/content";

const services = [
  {
    icon: "Globe",
    title: "Web Development",
    description: "Applications, platforms, and headless commerce — built for speed and accessibility.",
    href: "/services/web",
  },
  {
    icon: "Smartphone",
    title: "Mobile Development",
    description: "Native iOS, Android, and cross-platform apps that feel right on every device.",
    href: "/services/mobile",
  },
  {
    icon: "Cloud",
    title: "Cloud & Infrastructure",
    description: "Architecture, migration, and DevOps on AWS and GCP. Reliable, observable, cost-aware.",
    href: "/services/cloud",
  },
];

const stats = [
  { value: "40+", label: "Systems delivered" },
  { value: "99.9%", label: "Uptime SLA maintained" },
  { value: "< 1.2s", label: "Average LCP achieved" },
  { value: "8", label: "Years shipping production" },
];

const phases = [
  { number: "01", label: "Discover", description: "We map your goals, constraints, and stack." },
  { number: "02", label: "Architect", description: "System design, tech choices, risk assessment." },
  { number: "03", label: "Build", description: "Two-week sprints with async standups and live demos." },
  { number: "04", label: "Launch & Scale", description: "Deploy, monitor, iterate, hand off or retain." },
];

export default function Home() {
  const featuredWork = getWorkPosts().filter((p) => p.featured).slice(0, 2);

  return (
    <>
      <Hero
        headline="Build sharp. Scale calm."
        subheadline="Web, mobile, and cloud systems engineered for performance, clarity, and long-term ROI. From first deploy to 10× scale."
        primaryCta={{ label: "Book a Call", href: "/contact" }}
        secondaryCta={{ label: "See Our Work", href: "/work" }}
      />

      <LogoStrip />

      <BentoGrid
        headline="What we build"
        body="Three disciplines. One team. Every system designed to ship fast and hold up under pressure."
        items={services}
      />

      <Container className="pb-16 -mt-8">
        <Card variant="default" className="relative overflow-hidden border-l-4 border-l-accent-500">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Sparkles className="h-6 w-6 text-accent-400 shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-medium text-neutral-50">AI & LLM Automation</h3>
                <Badge variant="accent">By Request</Badge>
              </div>
              <p className="text-sm text-neutral-300">
                RAG pipelines, prompt engineering, evaluation frameworks, and copilot interfaces — integrated into your existing workflows.
              </p>
            </div>
          </div>
        </Card>
      </Container>

      <StatsStrip stats={stats} />

      {featuredWork.length > 0 && (
        <section className="py-16 md:py-20">
          <Container>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-50 tracking-tight">Selected work</h2>
              <p className="mt-3 text-neutral-300">Real projects. Measured outcomes. No fluff.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredWork.map((post) => (
                <Link key={post.slug} href={`/work/${post.slug}`} className="block group">
                  <Card variant="interactive" className="h-full">
                    <p className="text-sm text-neutral-500 mb-1">{post.client}</p>
                    <h3 className="text-xl font-medium text-neutral-50 mb-2">{post.title}</h3>
                    {post.metrics[0] && (
                      <p className="text-accent-300 text-sm mb-3">
                        {post.metrics[0].context && `${post.metrics[0].context} → `}
                        {post.metrics[0].value} {post.metrics[0].label}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                    <span className="mt-4 block text-sm font-medium text-accent-400">
                      Read case study &rarr;
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/work" className="text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors">
                See all work &rarr;
              </Link>
            </div>
          </Container>
        </section>
      )}

      <Timeline
        headline="How we work"
        body="A four-phase delivery model built around transparency, speed, and zero surprises."
        phases={phases}
        compact
      />

      <div className="text-center pb-16">
        <Link href="/approach" className="text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors">
          View our full approach &rarr;
        </Link>
      </div>

      <CtaBanner
        headline="Ready to build something that lasts?"
        body="Tell us about your project. We respond within 24 hours."
        primaryCta={{ label: "Book a Call", href: "/contact" }}
        secondaryCta={{ label: "Send a Brief", href: "/contact" }}
      />
    </>
  );
}
