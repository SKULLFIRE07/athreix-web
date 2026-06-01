"use client";

import { motion } from "motion/react";
import Reveal, { RevealWord } from "./Reveal";

const process = [
  {
    k: "01",
    title: "CAPTURE THE IDEA",
    desc: "We sit down with you, map the workflow you want to automate, and define what shipping actually looks like for it.",
  },
  {
    k: "02",
    title: "WIRE UP THE SYSTEM",
    desc: "Models, tools, retrieval, evals, UI, wired end-to-end with the boring parts (auth, billing, observability) built in.",
  },
  {
    k: "03",
    title: "SHIP TO PRODUCTION",
    desc: "Cloud-native deployment with monitoring, error tracking, and the queues, workers, and caching needed to stay fast.",
  },
  {
    k: "04",
    title: "LOOP, LEARN, REFINE",
    desc: "Real users break real systems. We watch the traces, tune the prompts, retrain the models, and ship improvements every week.",
  },
];

const stack: Record<string, string[]> = {
  FRONTEND: ["React", "Next.js", "React Native", "TypeScript", "Tailwind"],
  BACKEND: ["Node.js", "Express / Fastify", "Postgres", "Redis", "Typed APIs"],
  "AI / ML": ["LLM APIs", "RAG pipelines", "Tool calling", "Eval frameworks", "Vector DBs"],
  INFRASTRUCTURE: ["AWS / GCP", "Docker", "Queues & workers", "Observability", "CI/CD"],
};

export default function Technology() {
  return (
    <section id="process" className="relative bg-[var(--gr-100)] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.06]" />
      <div className="noise" />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12 lg:px-20 py-20 md:py-24">
        <div className="flex items-baseline gap-6 mb-16 mono text-[11px] tracking-[0.3em] text-white/45">
          <span>03</span>
          <span className="w-12 h-px bg-white/20" />
          <span>PROCESS</span>
        </div>

        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <h2 className="md:col-span-8 display text-5xl md:text-7xl leading-[0.95]">
            <RevealWord text="HOW WE GO FROM" forceAnimate />
            <br />
            <RevealWord text="ZERO TO SHIPPED." delay={0.25} forceAnimate />
          </h2>
          <Reveal
            delay={0.4}
            className="md:col-span-4 self-end text-white/60 text-sm md:text-base leading-relaxed uppercase tracking-wider"
          >
            FOUR PHASES, RUN AS A TIGHT LOOP. YOU STAY CLOSE TO THE BUILD; WE
            KEEP THE VELOCITY HIGH AND THE SURPRISES LOW.
          </Reveal>
        </div>

        {/* ── Process steps with timeline ── */}
        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 mb-24">
          {process.map((p, idx) => (
            <motion.div
              key={p.k}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="card-3d group bg-[var(--gr-100)] p-8 min-h-[280px] flex flex-col justify-between relative overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    "radial-gradient(circle at 50% 100%, rgba(255,91,31,0.12), transparent 65%)",
                }}
              />

              {/* Shimmer */}
              <div className="shimmer absolute inset-0 pointer-events-none" />

              {/* Step number with glowing dot */}
              <div className="relative flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--lava-300)] opacity-50 group-hover:opacity-100 group-hover:shadow-[0_0_12px_var(--lava-300)] transition-all duration-500" />
                <span className="mono text-[10px] tracking-[0.3em] text-white/35 group-hover:text-white/60 transition-colors">
                  /{p.k}
                </span>
              </div>

              <div className="relative">
                <h3 className="display text-2xl md:text-3xl leading-tight mb-4 group-hover:text-[var(--lava-100)] transition-colors duration-500">
                  {p.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed uppercase tracking-wider">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Tech stack ── */}
        <div className="mb-24">
          <Reveal className="mb-12">
            <h3 className="display text-3xl md:text-4xl leading-tight">
              THE STACK BEHIND IT ALL.
            </h3>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {Object.entries(stack).map(([category, items], catIdx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: catIdx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="mono text-[10px] tracking-[0.35em] text-[var(--lava-100)] mb-5 flex items-center gap-3">
                  <span className="w-3 h-px bg-[var(--lava-300)]" />
                  {category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: catIdx * 0.1 + i * 0.05,
                      }}
                      className="tech-pill"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* ── By the numbers ── */}
        <div>
          <Reveal className="mb-10">
            <h3 className="display text-3xl md:text-4xl leading-tight">
              BY THE NUMBERS.
            </h3>
          </Reveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {[
              { num: "25+", label: "PROJECTS DELIVERED" },
              { num: "$45K+", label: "ACCRUED REVENUE" },
              { num: "$1M", label: "ON TRACK THIS YEAR" },
              { num: "<72H", label: "TO FIRST DEPLOY" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[var(--gr-100)] p-6 flex flex-col justify-center items-center text-center group"
              >
                <div className="impact-metric group-hover:scale-105 transition-transform duration-500">
                  {stat.num}
                </div>
                <div className="mono text-[9px] tracking-[0.25em] text-white/40 mt-3">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
