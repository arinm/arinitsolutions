import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { Testimonial } from "@/components/sections/testimonial";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getWorkPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects across web, mobile, and cloud. Real clients, measured outcomes.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const posts = getWorkPosts();

  return (
    <>
      <Hero
        headline="Work that speaks for itself"
        subheadline="Selected projects across web, mobile, and cloud. Real clients. Measured outcomes."
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/work/${post.slug}`} className="block group">
                <Card variant="interactive" className="h-full">
                  <p className="text-sm text-neutral-500 mb-1">{post.client}</p>
                  <h3 className="text-xl font-semibold text-neutral-50 mb-2">{post.title}</h3>
                  <p className="text-sm text-neutral-400 mb-3">{post.excerpt}</p>
                  {post.metrics[0] && (
                    <p className="text-accent-300 text-sm font-medium mb-3">
                      {post.metrics[0].value} {post.metrics[0].label}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <Badge variant="accent">{post.discipline}</Badge>
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-accent-400">
                    Read case study &rarr;
                  </span>
                </Card>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <p className="text-center text-neutral-500 py-12">Case studies coming soon.</p>
          )}
        </Container>
      </section>

      <Testimonial
        quote="Arinit replaced our entire frontend in 8 weeks. LCP dropped from 4.2s to 0.9s. Our conversion rate climbed 23% the next month."
        author="Alex Mercer"
        role="CTO"
        company="FinTrack"
      />

      <CtaBanner
        headline="See something relevant?"
        body="We'd love to hear about your project."
        primaryCta={{ label: "Book a Call", href: "/contact" }}
        secondaryCta={{ label: "Send a Brief", href: "/contact" }}
      />
    </>
  );
}
