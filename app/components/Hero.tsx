"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { RevealWord } from "./Reveal";
import Embers from "./Embers";

/* ─── Typing Label ─── */
function TypingLabel({
  text,
  startDelay = 0,
}: {
  text: string;
  startDelay?: number;
}) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    const animate = async () => {
      await new Promise((r) => {
        timeout = setTimeout(r, startDelay * 1000);
      });
      for (let i = 0; i <= text.length; i++) {
        setDisplayText(text.slice(0, i));
        await new Promise((r) => setTimeout(r, 40 + Math.random() * 40));
      }
    };
    animate();
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [text, startDelay]);

  return (
    <span className="relative">
      {displayText}
      <span className="typing-cursor ml-1 inline-block w-2 h-3 bg-[var(--lava-300)]" />
    </span>
  );
}

/* ─── stats data ─── */
const stats = [
  { value: "25+", label: "PROJECTS DELIVERED" },
  { value: "$45K+", label: "ACCRUED REVENUE" },
  { value: "$1M", label: "ON TRACK THIS YEAR" },
  { value: "99.9%", label: "UPTIME" },
];

/* ─── corner bracket decoration ─── */
function CornerBrackets() {
  const bracketStyle = "absolute w-6 h-6 pointer-events-none";
  const lineColor = "border-white/10";
  return (
    <>
      <div className={`${bracketStyle} top-0 left-0`}>
        <div className={`absolute top-0 left-0 w-full h-px ${lineColor} border-t`} />
        <div className={`absolute top-0 left-0 h-full w-px ${lineColor} border-l`} />
      </div>
      <div className={`${bracketStyle} top-0 right-0`}>
        <div className={`absolute top-0 right-0 w-full h-px ${lineColor} border-t`} />
        <div className={`absolute top-0 right-0 h-full w-px ${lineColor} border-r`} />
      </div>
      <div className={`${bracketStyle} bottom-0 left-0`}>
        <div className={`absolute bottom-0 left-0 w-full h-px ${lineColor} border-b`} />
        <div className={`absolute bottom-0 left-0 h-full w-px ${lineColor} border-l`} />
      </div>
      <div className={`${bracketStyle} bottom-0 right-0`}>
        <div className={`absolute bottom-0 right-0 w-full h-px ${lineColor} border-b`} />
        <div className={`absolute bottom-0 right-0 h-full w-px ${lineColor} border-r`} />
      </div>
    </>
  );
}

/* ─── Hero ─── */
export default function Hero() {
  return (
    <section className="relative min-h-[580px] md:h-screen md:min-h-[680px] w-full overflow-hidden bg-graphite-deep">
      {/* Ambient light layer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% -10%, rgba(255,91,31,0.1), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-[0.03]" />
      <div className="noise" />

      {/* Animated gradient orbs */}
      <div className="absolute top-[10%] right-[15%] w-[40vw] h-[40vw] bg-[var(--lava-700)] rounded-full blur-[120px] opacity-20 gradient-orb" />
      <div className="absolute top-[30%] right-[5%] w-[30vw] h-[30vw] bg-[var(--lava-900)] rounded-full blur-[100px] opacity-30 gradient-orb-2" />

      <Embers count={20} />

      <div className="absolute bottom-0 inset-x-0 h-[30%] bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative md:h-full grid lg:grid-cols-12 gap-6 lg:gap-8 items-start md:items-center px-6 md:px-12 lg:px-20 pt-28 pb-16 md:py-0 max-w-[1600px] mx-auto">
        {/* Corner bracket HUD */}
        <div className="absolute inset-6 md:inset-12 lg:inset-20 pointer-events-none hidden md:block">
          <CornerBrackets />
        </div>

        {/* Left: copy */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Floating badges */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center gap-2 mb-5"
          >
            <span className="float-badge inline-flex items-center gap-1.5 px-3 py-1 border border-[var(--lava-300)]/30 bg-[var(--lava-300)]/5 mono text-[9px] tracking-[0.2em] text-[var(--lava-100)]">
              <span className="w-1 h-1 rounded-full bg-[var(--lava-300)] pulse-dot" />
              NEW: GPT-4O AGENTS
            </span>
            <span className="float-badge inline-flex items-center gap-1.5 px-3 py-1 border border-white/10 bg-white/3 mono text-[9px] tracking-[0.2em] text-white/50">
              SOC-2 COMPLIANT
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mono text-[9px] md:text-[11px] tracking-[0.3em] text-white/55 mb-8"
          >
            <span className="w-5 h-px bg-[var(--lava-300)]" />
            <TypingLabel text="AI AUTOMATION STUDIO" startDelay={0.6} />
          </motion.div>

          <h1 className="display text-[2.75rem] leading-[1.0] md:text-7xl lg:text-[5.5rem] md:leading-[0.95] overflow-hidden">
            <RevealWord text="FROM IDEA TO" />
            <br />
            <RevealWord text="PRODUCTION AI," delay={0.2} />
            <br />
            <RevealWord text="SHIPPED." delay={0.4} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-8 max-w-xl text-sm md:text-base text-white/60 leading-relaxed uppercase tracking-wide"
          >
            AN AI AUTOMATION STUDIO SHIPPING CUSTOM AGENTS, INTELLIGENT
            AUTOMATION, AND PRODUCTION-GRADE MACHINE LEARNING FOR TEAMS THAT
            MOVE FAST.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#services"
              className="btn-glow inline-flex items-center justify-center display tracking-[0.22em] text-[10px] px-7 py-3.5 bg-white text-black hover:bg-[var(--lava-300)] hover:text-white transition-colors duration-300"
            >
              WHAT WE BUILD
            </a>
            <a
              href="#contact"
              className="btn-glow-outline inline-flex items-center justify-center display tracking-[0.22em] text-[10px] px-7 py-3.5 border border-white/25 text-white/85 transition-all duration-300"
            >
              START A PROJECT →
            </a>
          </motion.div>

          {/* Stats counter row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-10 grid grid-cols-2 md:flex flex-wrap items-center gap-y-8 gap-x-6 md:gap-x-0"
          >
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center">
                {i > 0 && (
                  <div className="w-px h-10 bg-white/10 mx-4 md:mx-6 shrink-0 hidden md:block" />
                )}
                <div>
                  <div className="impact-metric text-2xl md:text-3xl text-lava-gradient">{s.value}</div>
                  <div className="mono text-[8px] md:text-[9px] tracking-[0.2em] text-white/40 uppercase mt-1">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: terminal panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative mt-12 lg:mt-0"
        >
          <div className="relative p-[1px] rounded-sm bg-gradient-to-b from-white/20 via-white/5 to-transparent">
            <div className="relative bg-black rounded-sm overflow-hidden">
              <div className="shimmer absolute inset-0 pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between px-4 md:px-5 py-2.5 md:py-3 border-b border-white/10">
                <div className="mono text-[9px] md:text-[10px] tracking-[0.25em] text-white/50 uppercase">
                  AGENT.SESSION
                </div>
                <div className="flex items-center gap-2 mono text-[8px] md:text-[9px] tracking-[0.2em] text-white/40 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--lava-300)] pulse-dot" />
                  LIVE
                </div>
              </div>

              {/* Lines */}
              <div className="px-4 md:px-5 py-4 md:py-5 mono text-[10px] md:text-[11px] leading-[2]">
                {sessionLines.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.9 + i * 0.18,
                      ease: "easeOut",
                    }}
                    className={`${lineColor(l.kind)} whitespace-pre ${
                      i >= 4 ? "hidden lg:block" : ""
                    }`}
                  >
                    {l.text}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                  className="text-white/40 mt-3"
                >
                  <span className="text-[var(--lava-300)]">➜</span>{" "}
                  <span className="blink">_</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const sessionLines = [
  { kind: "info", text: "[00:00.00] athreix_os v2.4.1 booted." },
  { kind: "info", text: "[00:00.04] Connecting to agent mesh..." },
  { kind: "success", text: "[00:00.12] Mesh connection established." },
  { kind: "info", text: "[00:00.34] Fetching client intent..." },
  { kind: "info", text: "           → intent: SCALE_OPERATIONS" },
  { kind: "info", text: "[00:00.51] Compiling workflow DAG..." },
  { kind: "success", text: "[00:00.89] DAG compiled. 4 nodes active." },
  { kind: "warn", text: "[00:01.02] Warning: High throughput detected." },
  { kind: "info", text: "[00:01.15] Auto-scaling workers (2 -> 16)." },
  { kind: "success", text: "[00:01.40] System ready. Awaiting input." },
];

function lineColor(kind: string) {
  switch (kind) {
    case "info":
      return "text-white/60";
    case "success":
      return "text-[var(--lava-300)]";
    case "warn":
      return "text-amber-400/80";
    default:
      return "text-white/60";
  }
}
