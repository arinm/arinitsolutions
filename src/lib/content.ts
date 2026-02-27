import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { WorkPost, InsightPost } from "./schemas";

const contentDir = path.join(process.cwd(), "content");

function readMdxFiles(dir: string) {
  const fullPath = path.join(contentDir, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(fullPath, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const slug = filename.replace(/\.mdx?$/, "");
      return { slug, frontmatter: data, content };
    });
}

export function getWorkPosts(): (WorkPost & { content: string })[] {
  return readMdxFiles("work").map(({ slug, frontmatter, content }) => ({
    slug,
    content,
    title: frontmatter.title ?? "",
    client: frontmatter.client ?? "",
    excerpt: frontmatter.excerpt ?? "",
    discipline: frontmatter.discipline ?? "web",
    tags: frontmatter.tags ?? [],
    featured: frontmatter.featured ?? false,
    metrics: frontmatter.metrics ?? [],
    thumbnail: frontmatter.thumbnail,
    challenge: frontmatter.challenge ?? "",
    approach: frontmatter.approach ?? "",
    solution: frontmatter.solution ?? "",
    stack: frontmatter.stack ?? [],
    timeline: frontmatter.timeline ?? [],
    testimonial: frontmatter.testimonial,
    learnings: frontmatter.learnings ?? [],
  }));
}

export function getWorkPost(slug: string) {
  const posts = getWorkPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getInsights(): (InsightPost & { content: string })[] {
  return readMdxFiles("insights")
    .map(({ slug, frontmatter, content }) => ({
      slug,
      content,
      title: frontmatter.title ?? "",
      excerpt: frontmatter.excerpt ?? "",
      category: frontmatter.category ?? "engineering",
      author: frontmatter.author ?? { name: "Arinit Team", role: "Engineering" },
      publishedAt: frontmatter.publishedAt ?? "",
      readingTime: frontmatter.readingTime ?? 5,
      featured: frontmatter.featured ?? false,
    }))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getInsight(slug: string) {
  const posts = getInsights();
  return posts.find((p) => p.slug === slug) ?? null;
}
