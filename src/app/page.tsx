import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { LogoStrip } from "@/components/sections/logo-strip";
import { CtaBanner } from "@/components/sections/cta-banner";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { TechGrid } from "@/components/sections/tech-grid";
import { StackingCards } from "@/components/sections/stacking-cards";
import { PerformanceMetrics } from "@/components/sections/performance-metrics";
import { SeoSection } from "@/components/sections/seo-section";
import { ServicesSection } from "@/components/sections/services-section";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { MarqueeBand } from "@/components/ui/marquee-band";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";
import { getWorkPosts } from "@/lib/content";

const principles = [
  {
    number: "01",
    title: "Clarity over complexity",
    description:
      "Strip away the unnecessary until only what matters remains. Every system earns its place through purpose, not decoration.",
  },
  {
    number: "02",
    title: "Ship, then iterate",
    description:
      "Working software over perfect plans. We deploy early, measure often, and improve based on real data — not assumptions.",
  },
  {
    number: "03",
    title: "Boring tech wins",
    description:
      "We pick tools with five-year track records, not five-month hype cycles. Reliability beats novelty every time.",
  },
  {
    number: "04",
    title: "Radical transparency",
    description:
      "No black boxes, no surprises. You see every sprint, every decision, every line of code. That's how trust is built.",
  },
];

export default function Home() {
  const featuredWork = getWorkPosts()
    .filter((p) => p.featured)
    .slice(0, 2);

  return (
    <>
      {/* ── Hero ── */}
      <Hero
        headline={
          <>
            Build sharp.
            <br />
            <span className="gradient-text">Scale calm.</span>
          </>
        }
        subheadline="Web, mobile, cloud, and AI systems engineered for performance, clarity, and long-term ROI. From first deploy to 10x scale."
        primaryCta={{ label: "Book a Call", href: "/contact" }}
        secondaryCta={{ label: "See Our Work", href: "/work" }}
        size="large"
        align="left"
      />

      <LogoStrip />

      {/* ── What we build ── */}
      <ServicesSection />

      {/* ── Marquee Band ── */}
      <MarqueeBand />

      {/* ── Selected work ── */}
      {featuredWork.length > 0 && (
        <section className="py-28 md:py-36 lg:py-44">
          <Container>
            <FadeIn>
              <span className="section-label">Selected work</span>
              <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-50 tracking-tight leading-[1]">
                Work that{" "}
                <span className="gradient-text">speaks for itself</span>
              </h2>
              <p className="mt-5 text-lg sm:text-xl text-neutral-400">
                Real projects. Measured outcomes. No fluff.
              </p>
            </FadeIn>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredWork.map((post, i) => (
                <FadeIn key={post.slug} delay={i * 0.1}>
                  <Link
                    href={`/work/${post.slug}`}
                    className="block group h-full"
                  >
                    <Card variant="interactive" className="h-full">
                      <p className="text-sm text-neutral-500 mb-1">
                        {post.client}
                      </p>
                      <h3 className="text-xl font-semibold text-neutral-50 mb-2">
                        {post.title}
                      </h3>
                      {post.metrics[0] && (
                        <p className="text-accent-300 text-sm mb-3">
                          {post.metrics[0].context &&
                            `${post.metrics[0].context} \u2192 `}
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
                </FadeIn>
              ))}
            </div>

            <FadeIn>
              <div className="mt-12">
                <Link
                  href="/work"
                  className="text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors"
                >
                  See all work &rarr;
                </Link>
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

      {/* ── Scroll Text Statement ── */}
      <section className="py-28 md:py-36 lg:py-44 border-t border-neutral-700/30">
        <Container>
          <ScrollTextReveal
            text="We don't just write code. We engineer systems that grow with your business, perform under pressure, and stand the test of time."
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight max-w-4xl"
          />
          <FadeIn>
            <div className="mt-12">
              <Link
                href="/approach"
                className="text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors"
              >
                View our full approach &rarr;
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── Stacking Cards — How it works ── */}
      <StackingCards />

      {/* ── Principles & Values ── */}
      <section className="py-28 md:py-36 lg:py-44">
        <Container>
          <FadeIn>
            <span className="section-label">Principles &amp; values</span>
            <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-50 tracking-tight leading-[1]">
              What we{" "}
              <span className="gradient-text">believe in</span>
            </h2>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
            {principles.map((p, i) => (
              <FadeIn key={p.number} delay={i * 0.08}>
                <div className="group relative overflow-hidden bg-neutral-900 border border-neutral-700/50 rounded-2xl p-8 md:p-10 h-full hover:border-accent-500/40 hover:shadow-[0_0_40px_rgba(139,92,246,0.12)] transition-all duration-500">
                  {/* Hover glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-700/0 via-transparent to-accent-500/0 group-hover:from-accent-700/8 group-hover:to-accent-500/5 transition-all duration-500 pointer-events-none" />

                  {/* Watermark number — bottom left */}
                  <span
                    className="absolute -bottom-6 -left-2 text-[8rem] md:text-[10rem] font-bold leading-none text-neutral-800/20 group-hover:text-accent-700/10 select-none pointer-events-none transition-colors duration-500"
                    aria-hidden="true"
                  >
                    {p.number}
                  </span>

                  <span className="relative text-sm text-accent-400 font-medium">
                    {p.number}
                  </span>

                  <h3 className="relative mt-6 text-xl sm:text-2xl md:text-3xl font-bold text-neutral-50 tracking-tight leading-tight">
                    {p.title}
                  </h3>

                  <p className="relative mt-6 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-md">
                    {p.description}
                  </p>

                  {/* Accent line — grows on hover */}
                  <div className="relative mt-8 w-10 group-hover:w-16 h-0.5 bg-accent-400 transition-all duration-500" />
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Testimonials ── */}
      <TestimonialCarousel />

      {/* ── Tech Stack ── */}
      <TechGrid />

      {/* ── Performance ── */}
      <PerformanceMetrics />

      {/* ── SEO Expertise ── */}
      <SeoSection />

      {/* ── CTA ── */}
      <CtaBanner
        headline="Ready to build something that lasts?"
        body="Tell us about your project. We respond within 24 hours."
        primaryCta={{ label: "Book a Call", href: "/contact" }}
        secondaryCta={{ label: "Send a Brief", href: "/contact" }}
      />
    </>
  );
}
