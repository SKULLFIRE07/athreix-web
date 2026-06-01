"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { RevealWord } from "./Reveal";
import Embers from "./Embers";

export default function Feature() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const planetY = useTransform(scrollYProgress, [0, 1], ["20%", "-30%"]);
  const planetScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.2]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.8, 0.4]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section
      ref={ref}
      className="relative h-[90vh] min-h-[650px] w-full overflow-hidden border-y border-white/10"
    >
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #1a1a1f 0%, #0a0a0d 35%, #000 70%)",
        }}
      />

      {/* Stars layer (parallax) */}
      <motion.div style={{ y: starsY }} className="absolute inset-0">
        {Array.from({ length: 120 }).map((_, i) => {
          const top = (i * 37) % 100;
          const left = (i * 73) % 100;
          const size = (i % 3) + 1;
          const opacity = ((i * 7) % 80) / 100 + 0.2;
          return (
            <span
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: size,
                height: size,
                opacity,
              }}
            />
          );
        })}
      </motion.div>

      {/* Planet / horizon arc with parallax */}
      <motion.div
        style={{ y: planetY, scale: planetScale }}
        className="absolute left-1/2 -translate-x-1/2 bottom-[-65%] w-[200%] aspect-square rounded-full"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #2a1810 0%, #1a0e08 35%, #0a0604 55%, transparent 56%)",
          }}
        />
        {/* Atmosphere ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            opacity: glowOpacity,
            background:
              "radial-gradient(circle at 50% 50%, transparent 54%, rgba(255,91,31,0.4) 55%, transparent 60%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>

      {/* Lava glow rising from horizon */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute bottom-0 inset-x-0 h-1/2"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(255,91,31,0.35), rgba(194,55,11,0.2) 30%, transparent 65%)",
          }}
        />
      </motion.div>

      {/* Noise */}
      <div className="noise" />

      {/* Embers rising from the planet */}
      <Embers count={14} />

      {/* HUD */}
      <motion.div
        style={{ y: contentY }}
        className="relative h-full flex flex-col justify-between px-6 md:px-12 py-10"
      >
        <div className="flex justify-between mono text-[10px] tracking-[0.3em] text-white/50">
          <span>NEURAL / BUILD 047</span>
          <span>NODES 24K // ↑ SCALING</span>
        </div>

        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mono text-[10px] tracking-[0.4em] text-[var(--lava-100)] mb-4 uppercase"
          >
            LIVE OPERATIONS
          </motion.div>
          <h2 className="display text-5xl md:text-7xl leading-[0.95]">
            <RevealWord text="ONE PLATFORM." />
            <br />
            <RevealWord text="INFINITE AUTOMATIONS." delay={0.25} />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-6 text-white/70 max-w-xl leading-relaxed uppercase tracking-wider"
          >
            ATHREIX AGENTS HANDLE THOUSANDS OF WORKFLOWS SIMULTANEOUSLY —
            SCALING FROM PROTOTYPE TO PLANET-WIDE OPERATION WITHOUT BREAKING
            A SWEAT.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            <span className="float-badge">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--lava-300)] pulse-dot" />
              24K+ NODES
            </span>
            <span className="float-badge">
              &lt;100MS LATENCY
            </span>
            <span className="float-badge">
              MULTI-REGION
            </span>
          </motion.div>
        </div>

        <div className="flex justify-between mono text-[10px] tracking-[0.3em] text-white/50">
          <span className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[var(--lava-300)] pulse-dot" />
            AGENT MESH — NOMINAL
          </span>
          <span className="hidden md:inline">SYNC LOCKED // 100%</span>
          <span>T+ LIVE</span>
        </div>
      </motion.div>
    </section>
  );
}
