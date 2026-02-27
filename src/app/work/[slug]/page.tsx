import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getWorkPost, getWorkPosts } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { StatsStrip } from "@/components/sections/stats-strip";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MDXRemote } from "next-mdx-remote/rsc";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getWorkPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getWorkPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} \u2014 Case Study`,
    description: post.excerpt,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/work/${slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const post = getWorkPost(slug);
  if (!post) notFound();

  const allPosts = getWorkPosts();
  const nextPost = allPosts.find((p) => p.slug !== slug);

  return (
    <>
      {/* Header */}
      <section className="py-24 md:py-32">
        <Container className="max-w-[800px]">
          <p className="text-sm text-neutral-500 mb-3">{post.client}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-50 tracking-tight leading-[0.95] mb-5">{post.title}</h1>
          <p className="text-xl text-neutral-400 mb-8">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="accent">{post.discipline}</Badge>
            {post.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
          </div>
        </Container>
      </section>

      {/* Results */}
      {post.metrics.length > 0 && (
        <StatsStrip
          stats={post.metrics.map((m) => ({
            value: m.value,
            label: m.context ? `${m.label} (${m.context})` : m.label,
          }))}
        />
      )}

      {/* Body */}
      <section className="py-24 md:py-32">
        <Container className="max-w-[680px]">
          <article className="prose prose-invert prose-neutral max-w-none [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-neutral-50 [&>h2]:mt-14 [&>h2]:mb-5 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-neutral-50 [&>h3]:mt-10 [&>h3]:mb-3 [&>p]:text-neutral-400 [&>p]:leading-relaxed [&>p]:mb-5 [&>ul]:space-y-2 [&>ul>li]:text-neutral-400 [&>ul>li]:pl-1 [&>blockquote]:border-l-4 [&>blockquote]:border-accent-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-neutral-400">
            <MDXRemote source={post.content} />
          </article>
        </Container>
      </section>

      {/* Stack & Timeline */}
      {(post.stack.length > 0 || post.timeline.length > 0) && (
        <section className="py-24 md:py-32 border-t border-neutral-700/30">
          <Container className="max-w-[800px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {post.stack.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-50 mb-6">Technology stack</h2>
                  <div className="space-y-4">
                    {post.stack.map((s) => (
                      <div key={s.category}>
                        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">{s.category}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {s.technologies.map((t) => <Badge key={t}>{t}</Badge>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {post.timeline.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-50 mb-6">Timeline</h2>
                  <div className="space-y-3">
                    {post.timeline.map((t) => (
                      <div key={t.label} className="flex gap-4">
                        <span className="text-sm text-neutral-500 w-20 shrink-0">{t.duration}</span>
                        <div>
                          <p className="text-sm font-semibold text-neutral-100">{t.label}</p>
                          <p className="text-sm text-neutral-500">{t.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Learnings */}
      {post.learnings.length > 0 && (
        <section className="py-24 md:py-32 border-t border-neutral-700/30">
          <Container className="max-w-[680px]">
            <h2 className="text-2xl font-bold text-neutral-50 mb-8">Key learnings</h2>
            <div className="space-y-5">
              {post.learnings.map((l) => (
                <div key={l.title}>
                  <h3 className="text-base font-semibold text-neutral-100 mb-1">{l.title}</h3>
                  <p className="text-sm text-neutral-400">{l.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Next + CTA */}
      {nextPost && (
        <section className="py-16 border-t border-neutral-700/30">
          <Container className="max-w-[800px]">
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Next case study</p>
            <Link href={`/work/${nextPost.slug}`} className="block">
              <Card variant="interactive">
                <h3 className="text-lg font-semibold text-neutral-50">{nextPost.title}</h3>
                <p className="text-sm text-neutral-400 mt-1">{nextPost.client}</p>
              </Card>
            </Link>
          </Container>
        </section>
      )}

      <CtaBanner headline="Start a conversation about your project." />

      {/* JSON-LD: Case Study */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: post.title,
            description: post.excerpt,
            creator: { "@id": "https://arinitsolutions.com/#organization" },
            keywords: post.tags.join(", "),
          }),
        }}
      />
    </>
  );
}
