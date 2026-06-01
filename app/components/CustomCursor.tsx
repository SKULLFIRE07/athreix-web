"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring } from "motion/react";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cfg = { damping: 22, stiffness: 280, mass: 0.4 };
  const x = useSpring(0, cfg);
  const y = useSpring(0, cfg);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    },
    [visible, x, y],
  );

  const handleOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    setHovering(
      !!target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='hover']",
      ),
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [handleMove, handleOver]);

  if (!visible) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            hovering
              ? "w-2.5 h-2.5 bg-[var(--lava-300)]"
              : "w-1.5 h-1.5 bg-white"
          }`}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ease-out ${
            hovering
              ? "w-14 h-14 border-[var(--lava-300)]/50 scale-110"
              : "w-9 h-9 border-white/25"
          }`}
        />
      </motion.div>
    </>
  );
}
