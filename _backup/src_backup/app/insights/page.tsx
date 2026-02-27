import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getInsights } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights",
  description: "Technical thinking from the team. Performance, architecture, cloud economics, and the occasional opinion.",
};

const categoryColors: Record<string, "default" | "accent" | "success" | "warning"> = {
  performance: "accent",
  architecture: "default",
  cloud: "success",
  "ai-llm": "warning",
  engineering: "default",
};

export default function InsightsPage() {
  const insights = getInsights();
  const featured = insights.find((i) => i.featured);
  const rest = insights.filter((i) => i !== featured);

  return (
    <>
      <Hero
        headline="Insights"
        subheadline="Technical thinking from the team. Performance, architecture, cloud economics, and the occasional opinion."
      />

      {/* Featured */}
      {featured && (
        <section className="pb-12">
          <Container>
            <Link href={`/insights/${featured.slug}`} className="block">
              <Card variant="interactive" className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={categoryColors[featured.category] ?? "default"}>
                      {featured.category}
                    </Badge>
                    <span className="text-xs text-neutral-500">{featured.readingTime} min read</span>
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-50 mb-2">{featured.title}</h2>
                  <p className="text-neutral-300 leading-relaxed">{featured.excerpt}</p>
                  <span className="mt-4 inline-block text-sm font-medium text-accent-400">
                    Read article &rarr;
                  </span>
                </div>
              </Card>
            </Link>
          </Container>
        </section>
      )}

      {/* Grid */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post.slug} href={`/insights/${post.slug}`} className="block">
                <Card variant="interactive" className="h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={categoryColors[post.category] ?? "default"}>
                      {post.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-medium text-neutral-50 mb-2 flex-1">{post.title}</h3>
                  <p className="text-sm text-neutral-300 mb-3 line-clamp-2">{post.excerpt}</p>
                  <p className="text-xs text-neutral-500">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })} &middot; {post.readingTime} min read
                  </p>
                </Card>
              </Link>
            ))}
          </div>

          {insights.length === 0 && (
            <p className="text-center text-neutral-500 py-12">Articles coming soon.</p>
          )}
        </Container>
      </section>

      <CtaBanner
        headline="Want to work with the team behind these insights?"
        primaryCta={{ label: "Book a Call", href: "/contact" }}
        secondaryCta={{ label: "See Our Work", href: "/work" }}
      />
    </>
  );
}
