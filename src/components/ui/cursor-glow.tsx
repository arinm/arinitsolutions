"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function CursorGlow() {
  const reduced = useReducedMotion();
  const elRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const mouse = useRef({ x: -200, y: -200 });
  const pos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const el = elRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      el.style.opacity = "1";
    };
    const onLeave = () => { el.style.opacity = "0"; };
    const onEnter = () => { el.style.opacity = "1"; };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;
      el.style.transform = `translate3d(${pos.current.x - 200}px, ${pos.current.y - 200}px, 0)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={elRef}
      className="pointer-events-none fixed top-0 left-0 z-[9998] hidden lg:block"
      style={{
        width: 400,
        height: 400,
        opacity: 0,
        transition: "opacity 0.3s",
        willChange: "transform",
      }}
      aria-hidden="true"
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.07) 0%, rgba(59,130,246,0.03) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
