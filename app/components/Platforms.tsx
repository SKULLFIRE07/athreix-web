"use client";

import { motion } from "motion/react";
import Reveal, { RevealWord } from "./Reveal";

/* ─── Service icons (inline SVG) ─── */
function IconAgents({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className={className}>
      <path d="M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 9a2 2 0 0 0-2 2v1a2 2 0 0 0 4 0v-1a2 2 0 0 0-2-2Z" />
      <path d="M5 9a2 2 0 0 0-2 2v1a2 2 0 0 0 4 0v-1a2 2 0 0 0-2-2Z" />
      <path d="M12 10v4m0 0-4 4m4-4 4 4m-11 0h14" />
    </svg>
  );
}

function IconProducts({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M3 9h18M9 3v18" />
      <circle cx="16" cy="16" r="2" />
    </svg>
  );
}

function IconInternal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className={className}>
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

function IconApps({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className={className}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  );
}

function IconML({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className={className}>
      <circle cx="12" cy="4" r="2" />
      <circle cx="5" cy="10" r="2" />
      <circle cx="19" cy="10" r="2" />
      <circle cx="8" cy="18" r="2" />
      <circle cx="16" cy="18" r="2" />
      <path d="M12 6v0M12 6l-5.5 3M12 6l5.5 3" />
      <path d="M5 12l3 4M19 12l-3 4" />
      <path d="M10 18h4" />
      <path d="M7.5 11l4.5-5M16.5 11l-4.5-5" />
    </svg>
  );
}

function IconData({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className={className}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
      <path d="M4 8.5c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </svg>
  );
}

const icons = [IconAgents, IconProducts, IconInternal, IconApps, IconML, IconData];

const services = [
  {
    id: "01",
    code: "AGENTS",
    name: "AI AUTOMATION",
    tag: "MULTI-STEP AGENTS THAT SHIP WORK",
    desc: "Custom agents with workflow orchestration and tool use, designed to integrate into your stack and reliably execute end-to-end tasks, not just chat.",
    spec: ["TOOL-USING AGENTS", "WORKFLOW ORCHESTRATION", "EVAL & GUARDRAILS"],
  },
  {
    id: "02",
    code: "PRODUCTS",
    name: "AI SAAS PLATFORMS",
    tag: "PRODUCTION AI PRODUCTS FROM IDEA TO LAUNCH",
    desc: "Full-stack AI products with auth, billing, dashboards, and usage tracking. Ready for paying customers from day one.",
    spec: ["AUTH & BILLING", "USAGE METERING", "DASHBOARDS"],
  },
  {
    id: "03",
    code: "INTERNAL",
    name: "INTERNAL TOOLS",
    tag: "ADMIN PANELS, PIPELINES, COPILOTS",
    desc: "Internal-facing AI: ops dashboards, data pipelines, and copilots that automate the work your team does every day.",
    spec: ["ADMIN PANELS", "DATA PIPELINES", "TEAM COPILOTS"],
  },
  {
    id: "04",
    code: "APPS",
    name: "WEB & MOBILE",
    tag: "TYPED, SCALABLE, FAST",
    desc: "React and React Native applications built on typed APIs and modern infrastructure. Fast to ship, easy to extend.",
    spec: ["REACT & RN", "TYPED APIS", "CLOUD-NATIVE"],
  },
  {
    id: "05",
    code: "ML",
    name: "MACHINE LEARNING",
    tag: "MODELS THAT ACTUALLY WORK",
    desc: "Custom ML pipelines from data prep to deployment — fine-tuning, embeddings, classification, and prediction models built for your domain.",
    spec: ["FINE-TUNING", "EMBEDDINGS", "MLOPS"],
  },
  {
    id: "06",
    code: "DATA",
    name: "DATA ENGINEERING",
    tag: "PIPELINES, LAKES, WAREHOUSES",
    desc: "End-to-end data infrastructure: ingestion, transformation, warehousing, and real-time streaming pipelines that feed your AI.",
    spec: ["ETL PIPELINES", "DATA LAKES", "REAL-TIME STREAMS"],
  },
];

export default function Platforms() {
  return (
    <section id="services" className="relative bg-[var(--gr-100)]">
      <div className="noise" />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12 lg:px-20 py-20 md:py-24">
        <div className="flex items-baseline gap-6 mb-16 mono text-[11px] tracking-[0.3em] text-white/45">
          <span>01</span>
          <span className="w-12 h-px bg-white/20" />
          <span>SERVICES</span>
        </div>

        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <h2 className="md:col-span-7 display text-5xl md:text-7xl leading-[0.95] overflow-hidden">
            <RevealWord text="WHAT WE" />
            <br />
            <RevealWord text="BUILD FOR YOU." delay={0.25} />
          </h2>
          <Reveal
            delay={0.4}
            className="md:col-span-5 md:col-start-9 self-end text-white/60 text-sm md:text-base leading-relaxed uppercase tracking-wider"
          >
            SIX WAYS WE PARTNER WITH TEAMS: FROM A SINGLE AGENT THAT SOLVES
            ONE PAINFUL WORKFLOW TO CUSTOM ML MODELS AND FULL DATA INFRASTRUCTURE.
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {services.map((p, idx) => {
            const Icon = icons[idx];
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: (idx % 3) * 0.12 + Math.floor(idx / 3) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="card-3d group relative bg-[var(--gr-100)] p-8 md:p-10 min-h-[380px] flex flex-col justify-between overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background:
                      "radial-gradient(ellipse at 80% 0%, rgba(255,91,31,0.14), transparent 60%)",
                  }}
                />

                {/* Shimmer sweep */}
                <div className="shimmer absolute inset-0 pointer-events-none" />

                <div className="relative flex items-start justify-between">
                  <div>
                    {/* Icon */}
                    <div className="icon-container mb-5">
                      <Icon className="w-5 h-5 text-[var(--lava-300)]" />
                    </div>

                    <div className="mono text-[11px] tracking-[0.3em] text-white/40">
                      {p.code}
                    </div>
                    <h3 className="display text-3xl md:text-5xl mt-4 transition-colors duration-500 group-hover:text-[var(--lava-100)]">
                      {p.name}
                    </h3>
                    <div className="display tracking-[0.18em] text-[10px] text-white/55 mt-3">
                      {p.tag}
                    </div>
                  </div>
                  <span className="mono text-xs text-white/25">{p.id}</span>
                </div>

                <div className="relative">
                  <p className="text-white/60 leading-relaxed max-w-md text-sm md:text-base uppercase tracking-wider">
                    {p.desc}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 mono text-[9px] tracking-[0.2em] text-white/45">
                    {p.spec.map((s) => (
                      <span key={s} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-[var(--lava-300)]" /> {s}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="mt-8 inline-flex items-center gap-3 display tracking-[0.22em] text-[10px] text-white/90 border-b border-white/25 pb-1 hover:border-[var(--lava-300)] hover:text-[var(--lava-100)] transition"
                  >
                    TALK TO US
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
