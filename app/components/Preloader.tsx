"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    const t = setTimeout(() => setLoading(false), 2800);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center gap-8"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Mark — path draws, then fills */}
          <svg viewBox="0 0 48 48" className="w-16 h-16">
            <motion.path
              d="M24 3 L44 45 L4 45 Z"
              fill="none"
              stroke="white"
              strokeWidth={1.2}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
            <motion.path
              d="M24 3 L44 45 L4 45 Z"
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.4 }}
            />
            <motion.path
              d="M24 17 L34 42 L28 42 L24 33 L20 42 L14 42 Z"
              fill="black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35, duration: 0.25 }}
            />
          </svg>

          {/* Brand typing */}
          <div className="display text-xl tracking-[0.35em]">
            {"ATHREIX".split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.0 + i * 0.09,
                  duration: 0.25,
                  ease: "easeOut",
                }}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          {/* Progress bar */}
          <div className="h-px w-20 bg-white/10 overflow-hidden rounded-full">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--lava-500), var(--lava-300))",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
