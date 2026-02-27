"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Globe, Smartphone, Cloud, Sparkles } from "lucide-react";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Smartphone, Cloud, Sparkles,
};

interface BentoItem {
  icon: string;
  title: string;
  description: string;
  href: string;
  span?: "default" | "wide";
}

interface BentoGridProps {
  headline: string;
  body?: string;
  items: BentoItem[];
}

export function BentoGrid({ headline, body, items }: BentoGridProps) {
  const reduced = useReducedMotion();

  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-50 tracking-tight">
            {headline}
          </h2>
          {body && (
            <p className="mt-3 text-neutral-300 max-w-lg mx-auto">{body}</p>
          )}
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={reduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                variants={reduced ? undefined : staggerItem}
                className={item.span === "wide" ? "md:col-span-2 lg:col-span-3" : ""}
              >
                <Link href={item.href} className="block h-full">
                  <Card variant="interactive" className="h-full flex flex-col">
                    {Icon && <Icon className="h-6 w-6 text-accent-400 mb-4" />}
                    <h3 className="text-xl font-medium text-neutral-50 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-300 text-sm leading-relaxed flex-1">
                      {item.description}
                    </p>
                    <span className="mt-4 text-sm font-medium text-accent-400">
                      Learn more &rarr;
                    </span>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
