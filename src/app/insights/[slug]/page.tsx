import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getInsight, getInsights } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MDXRemote } from "next-mdx-remote/rsc";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getInsights().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/insights/${slug}`,
      publishedTime: post.publishedAt,
    },
  };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  const allInsights = getInsights();
  const related = allInsights.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);

  return (
    <>
      {/* Header */}
      <section className="py-24 md:py-32">
        <Container className="max-w-[720px]">
          <div className="flex items-center gap-3 mb-5">
            <Badge variant="accent">{post.category}</Badge>
            <span className="text-sm text-neutral-500">{post.readingTime} min read</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-50 tracking-tight leading-[0.95] mb-5">
            {post.title}
          </h1>
          <p className="text-xl text-neutral-400 mb-8">{post.excerpt}</p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-bold text-accent-400">
              {post.author.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="text-sm text-neutral-100">{post.author.name}</p>
              <p className="text-xs text-neutral-500">{post.author.role} &middot; {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="pb-24 md:pb-32">
        <Container className="max-w-[680px]">
          <article className="[&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-neutral-50 [&>h2]:mt-14 [&>h2]:mb-5 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-neutral-50 [&>h3]:mt-10 [&>h3]:mb-3 [&>p]:text-neutral-400 [&>p]:leading-[1.8] [&>p]:mb-5 [&>ul]:space-y-2 [&>ul]:mb-5 [&>ul>li]:text-neutral-400 [&>ul>li]:pl-1 [&>ol]:space-y-2 [&>ol]:mb-5 [&>ol>li]:text-neutral-400 [&>blockquote]:border-l-4 [&>blockquote]:border-accent-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-neutral-400 [&>blockquote]:my-6 [&>pre]:bg-neutral-800 [&>pre]:rounded-lg [&>pre]:p-4 [&>pre]:overflow-x-auto [&>pre]:my-6 [&>pre]:text-sm [&>code]:bg-neutral-800 [&>code]:text-accent-300 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&_a]:text-accent-400 [&_a]:underline-offset-4 [&_a:hover]:underline">
            <MDXRemote source={post.content} />
          </article>
        </Container>
      </section>

      {/* Author bio */}
      <section className="py-12 border-t border-neutral-700/30">
        <Container className="max-w-[680px]">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-neutral-800 border-2 border-neutral-700/50 flex items-center justify-center text-lg font-bold text-accent-400">
              {post.author.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="text-base font-semibold text-neutral-100">{post.author.name}</p>
              <p className="text-sm text-neutral-500">{post.author.role} at Arinit Solutions</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-24 md:py-32 border-t border-neutral-700/30">
          <Container>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight mb-10">Keep reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/insights/${r.slug}`} className="block">
                  <Card variant="interactive" className="h-full">
                    <Badge variant="accent" className="mb-3">{r.category}</Badge>
                    <h3 className="text-lg font-semibold text-neutral-50 mb-2">{r.title}</h3>
                    <p className="text-xs text-neutral-500">{r.readingTime} min read</p>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBanner
        headline="Need help implementing this?"
        body="We write about what we build. Let's talk about applying this to your systems."
        primaryCta={{ label: "Book a Call", href: "/contact" }}
        secondaryCta={{ label: "See Services", href: "/services" }}
      />

      {/* JSON-LD: Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            author: {
              "@type": "Person",
              name: post.author.name,
            },
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            publisher: { "@id": "https://arinitsolutions.com/#organization" },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://arinitsolutions.com/insights/${slug}`,
            },
          }),
        }}
      />
    </>
  );
}
