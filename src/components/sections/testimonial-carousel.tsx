"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/ui/fade-in";

interface TestimonialItem {
  quote: string;
  role: string;
  industry: string;
}

const testimonials: TestimonialItem[] = [
  {
    quote:
      "They took our vague brief and turned it into a system that handles 50k+ transactions a month without breaking a sweat. Best engineering team we've worked with.",
    role: "CTO",
    industry: "FinTech",
  },
  {
    quote:
      "They didn't just build what we asked for — they challenged our assumptions, simplified the architecture, and delivered ahead of schedule.",
    role: "Product Lead",
    industry: "Energy & IoT",
  },
  {
    quote:
      "Transparent, fast, and obsessively detail-oriented. We've worked with agencies three times their size that couldn't match the quality.",
    role: "Founder",
    industry: "SaaS",
  },
  {
    quote:
      "Our old platform felt like a chore. Students now actually finish courses — completion rates jumped 40%. The performance improvement alone was worth the investment.",
    role: "CEO",
    industry: "EdTech",
  },
  {
    quote:
      "Our site was losing €180k/month from slow page loads and crashes. They found and fixed issues in 3 weeks that our team couldn't diagnose in 6 months.",
    role: "Head of Engineering",
    industry: "E-Commerce",
  },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export function TestimonialCarousel() {
  const reduced = useReducedMotion();
  const [[current, direction], setCurrent] = useState([0, 0]);

  const paginate = useCallback(
    (dir: number) => {
      setCurrent(([prev]) => {
        const next = (prev + dir + testimonials.length) % testimonials.length;
        return [next, dir];
      });
    },
    []
  );

  // Auto-advance every 6s
  useEffect(() => {
    const id = setInterval(() => paginate(1), 6000);
    return () => clearInterval(id);
  }, [paginate]);

  const t = testimonials[current];

  return (
    <section className="py-28 md:py-36 lg:py-44 border-t border-neutral-700/30">
      <Container className="max-w-[900px]">
        <FadeIn>
          <span className="section-label">What people say</span>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-50 tracking-tight leading-[1]">
            Client{" "}
            <span className="gradient-text">stories</span>
          </h2>
        </FadeIn>

        <div className="mt-16 relative min-h-[260px] sm:min-h-[220px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={current}
              custom={direction}
              variants={reduced ? undefined : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="text-center"
            >
              <span
                className="block text-7xl font-serif text-accent-400/15 select-none leading-none mb-4"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="text-xl sm:text-2xl lg:text-3xl font-light text-neutral-200 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-8">
                <span className="text-sm text-neutral-500">
                  &mdash;{" "}
                  <strong className="text-neutral-300 font-semibold">
                    {t.role}
                  </strong>
                  , {t.industry}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => paginate(-1)}
            className="flex items-center justify-center h-10 w-10 rounded-full border border-neutral-700/50 text-neutral-400 hover:text-neutral-100 hover:border-accent-500/40 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent([i, i > current ? 1 : -1])}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-accent-500"
                    : "w-2 bg-neutral-700 hover:bg-neutral-500"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="flex items-center justify-center h-10 w-10 rounded-full border border-neutral-700/50 text-neutral-400 hover:text-neutral-100 hover:border-accent-500/40 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </Container>
    </section>
  );
}
