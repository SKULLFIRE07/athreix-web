"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring } from "motion/react";

export default function GlowTracker() {
  const [visible, setVisible] = useState(false);
  const cfg = { damping: 45, stiffness: 120 };
  const x = useSpring(0, cfg);
  const y = useSpring(0, cfg);

  const handler = useCallback(
    (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    },
    [visible, x, y],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [handler]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[1] pointer-events-none w-[700px] h-[700px]"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(255,91,31,0.055) 0%, rgba(255,91,31,0.02) 35%, transparent 70%)",
        filter: "blur(30px)",
      }}
    />
  );
}
