"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dotRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const mouse = useRef({ x: -100, y: -100 });
  const raf = useRef(0);
  const [dot, setDot] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    // Detect hoverable elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable =
        target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]");
      setHovering(!!isHoverable);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const tick = () => {
      // Dot follows closely
      dotRef.current.x += (mouse.current.x - dotRef.current.x) * 0.35;
      dotRef.current.y += (mouse.current.y - dotRef.current.y) * 0.35;
      // Ring follows with lag
      ringRef.current.x += (mouse.current.x - ringRef.current.x) * 0.12;
      ringRef.current.y += (mouse.current.y - ringRef.current.y) * 0.12;

      setDot({ x: dotRef.current.x, y: dotRef.current.y });
      setRing({ x: ringRef.current.x, y: ringRef.current.y });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, [reduced, visible]);

  if (reduced) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden lg:block mix-blend-difference"
        style={{ left: dot.x - 4, top: dot.y - 4 }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
        aria-hidden="true"
      >
        <div className="h-2 w-2 rounded-full bg-white" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden lg:block mix-blend-difference"
        style={{ left: ring.x - 20, top: ring.y - 20 }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.8 : 1,
        }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        aria-hidden="true"
      >
        <div className="h-10 w-10 rounded-full border border-white/60" />
      </motion.div>
    </>
  );
}
