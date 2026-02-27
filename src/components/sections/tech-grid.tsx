"use client";

import { motion, useReducedMotion } from "framer-motion";
import { viewportOnce } from "@/lib/animations";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/ui/fade-in";

interface TechItem {
  name: string;
  category: string;
}

const technologies: TechItem[] = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "React Native", category: "Mobile" },
  { name: "Swift", category: "Mobile" },
  { name: "Kotlin", category: "Mobile" },
  { name: "Redis", category: "Database" },
  { name: "GraphQL", category: "API" },
  { name: "Terraform", category: "DevOps" },
  { name: "Python", category: "Language" },
  { name: "GCP", category: "Cloud" },
];

const categoryColors: Record<string, string> = {
  Frontend: "text-cyan-400 border-cyan-500/30",
  Backend: "text-green-400 border-green-500/30",
  Language: "text-yellow-400 border-yellow-500/30",
  Database: "text-orange-400 border-orange-500/30",
  Cloud: "text-blue-400 border-blue-500/30",
  DevOps: "text-purple-400 border-purple-500/30",
  Mobile: "text-pink-400 border-pink-500/30",
  API: "text-emerald-400 border-emerald-500/30",
};

export function TechGrid() {
  const reduced = useReducedMotion();

  return (
    <section className="py-28 md:py-36 lg:py-44 border-t border-neutral-700/30">
      <Container>
        <FadeIn>
          <span className="section-label">Tech stack</span>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-50 tracking-tight leading-[1]">
            Tools we{" "}
            <span className="gradient-text">trust</span>
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-neutral-400 max-w-xl">
            Battle-tested technologies with proven track records. No hype-driven decisions.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              className="group relative overflow-hidden bg-neutral-900 border border-neutral-700/50 rounded-xl p-5 hover:border-accent-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.08)] transition-all duration-400"
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-700/0 to-accent-500/0 group-hover:from-accent-700/5 group-hover:to-accent-500/3 transition-all duration-400 pointer-events-none" />
              <span className="relative block text-lg font-semibold text-neutral-100 mb-1">
                {tech.name}
              </span>
              <span
                className={`relative inline-block text-xs font-medium px-2 py-0.5 rounded-full border ${categoryColors[tech.category] || "text-neutral-400 border-neutral-700/50"}`}
              >
                {tech.category}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
