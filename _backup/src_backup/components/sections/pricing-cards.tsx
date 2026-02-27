"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Container } from "@/components/layout/container";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingPlan {
  name: string;
  badge?: string;
  bestFor: string;
  price: string;
  priceLabel?: string;
  features: string[];
  highlighted?: boolean;
}

interface PricingCardsProps {
  plans: PricingPlan[];
}

export function PricingCards({ plans }: PricingCardsProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={reduced ? undefined : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {plans.map((plan) => (
        <motion.div key={plan.name} variants={reduced ? undefined : staggerItem} className="relative">
          {plan.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-accent-300 bg-accent-700/20 rounded-full border border-accent-500/20">
                {plan.badge}
              </span>
            </div>
          )}
          <div
            className={cn(
              "flex flex-col h-full rounded-2xl border p-8",
              plan.highlighted
                ? "bg-neutral-900/80 border-accent-500/30 shadow-[0_0_40px_rgba(139,92,246,0.1)]"
                : "bg-neutral-900 border-neutral-700"
            )}
          >
            <h3 className="text-xl font-semibold text-neutral-50">{plan.name}</h3>
            <p className="mt-1 text-sm text-neutral-500">{plan.bestFor}</p>
            <div className="mt-6 mb-6">
              <span className="text-xs text-neutral-500">{plan.priceLabel || "Starting from"}</span>
              <div className="text-3xl font-bold text-neutral-50 tracking-tight mt-1">{plan.price}</div>
            </div>
            <ul className="space-y-3 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-accent-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-neutral-300">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className={cn(
                "mt-8 flex items-center justify-center h-12 rounded-md font-medium transition-all",
                plan.highlighted
                  ? "bg-accent-500 text-white hover:bg-accent-600 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                  : "border border-neutral-700 text-neutral-100 hover:bg-neutral-800"
              )}
              style={{ transitionDuration: "var(--duration-normal)" }}
            >
              Book a Call
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
