"use client";

import { useReducedMotion } from "framer-motion";

interface MarqueeBandProps {
  words?: string[];
  speed?: number;
  className?: string;
}

const defaultWords = [
  "BUILD",
  "SHIP",
  "SCALE",
  "REPEAT",
  "DESIGN",
  "DEPLOY",
  "ITERATE",
  "DELIVER",
];

export function MarqueeBand({
  words = defaultWords,
  speed = 40,
  className = "",
}: MarqueeBandProps) {
  const reduced = useReducedMotion();

  const content = words.map((w) => `${w} \u00B7`).join(" ");
  // Duplicate for seamless loop
  const strip = `${content} ${content} ${content} ${content}`;

  return (
    <div
      className={`relative overflow-hidden border-y border-neutral-700/30 py-6 md:py-8 select-none ${className}`}
      aria-hidden="true"
    >
      <div
        className={reduced ? "" : "animate-marquee-band"}
        style={
          reduced
            ? undefined
            : ({ "--marquee-speed": `${speed}s` } as React.CSSProperties)
        }
      >
        <span className="whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-800/40">
          {strip}
        </span>
      </div>
    </div>
  );
}
