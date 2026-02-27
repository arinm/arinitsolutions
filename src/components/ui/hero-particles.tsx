"use client";

import { motion, useReducedMotion } from "framer-motion";

const orbs = [
  { size: 400, x: "8%", y: "5%", duration: 25, delay: 0, opacity: 0.06 },
  { size: 300, x: "65%", y: "50%", duration: 20, delay: 3, opacity: 0.05 },
  { size: 220, x: "82%", y: "8%", duration: 28, delay: 1, opacity: 0.04 },
  { size: 350, x: "30%", y: "60%", duration: 22, delay: 2, opacity: 0.05 },
  { size: 120, x: "55%", y: "25%", duration: 16, delay: 0, opacity: 0.08 },
  { size: 80, x: "18%", y: "75%", duration: 18, delay: 4, opacity: 0.07 },
  { size: 60, x: "72%", y: "78%", duration: 14, delay: 2, opacity: 0.1 },
  { size: 24, x: "45%", y: "18%", duration: 10, delay: 1, opacity: 0.15 },
  { size: 16, x: "88%", y: "42%", duration: 12, delay: 3, opacity: 0.12 },
  { size: 20, x: "28%", y: "38%", duration: 14, delay: 0, opacity: 0.1 },
];

export function HeroParticles() {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background:
              orb.size > 100
                ? `radial-gradient(circle, rgba(139,92,246,${orb.opacity}) 0%, rgba(59,130,246,${orb.opacity * 0.4}) 40%, transparent 70%)`
                : `radial-gradient(circle, rgba(139,92,246,${orb.opacity}) 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 15, 0, -15, 0],
            scale: [1, 1.08, 1, 0.92, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
