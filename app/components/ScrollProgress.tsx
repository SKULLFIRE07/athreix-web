"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[1000] origin-left pointer-events-none"
      style={{ scaleX }}
    >
      {/* Subtle orange gradient body */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff5b1f]/30 to-[#ff9a4a]/80" />
      
      {/* Intense glowing head */}
      <div className="absolute top-[-1px] right-0 h-[4px] w-[15px] bg-white rounded-full shadow-[0_0_15px_4px_rgba(255,91,31,0.9)]" />
    </motion.div>
  );
}
