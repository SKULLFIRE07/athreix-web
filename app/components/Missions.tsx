"use client";

import { motion } from "motion/react";
import { RevealWord } from "./Reveal";

const useCases = [
  {
    n: "U-01",
    title: "CUSTOMER SUPPORT AUTOMATION",
    program: "CONVERSATIONAL AI",
    domain: "SAAS / E-COMMERCE",
    impact: "−68%",
    impactLabel: "TICKETS",
    blurb:
      "Multi-channel support agents that resolve tier-1 and tier-2 tickets autonomously, route the rest, and learn from every closed conversation.",
  },
  {
    n: "U-02",
    title: "INTERNAL OPERATIONS AGENTS",
    program: "WORKFLOW AUTOMATION",
    domain: "LOGISTICS / OPS",
    impact: "12×",
    impactLabel: "FASTER",
    blurb:
      "Agents that handle invoice processing, vendor reconciliation, and reporting, wired into the tools your team already uses every day.",
  },
  {
    n: "U-03",
    title: "AI DASHBOARDS FOR TEAMS",
    program: "INTERNAL AI",
    domain: "FINANCE / REVOPS",
    impact: "24/7",
    impactLabel: "REAL-TIME",
    blurb:
      "Natural-language dashboards that turn live data into answers. Ask a question, get a chart, drill down, export. No SQL required.",
  },

  {
    n: "U-05",
    title: "AI-POWERED HIRING PIPELINE",
    program: "HR AUTOMATION",
    domain: "RECRUITING / HR",
    impact: "4×",
    impactLabel: "FASTER HIRING",
    blurb:
      "Resume screening, candidate scoring, interview scheduling, and feedback synthesis — all automated with human-in-the-loop approvals.",
  },
  {
    n: "U-06",
    title: "PREDICTIVE MAINTENANCE",
    program: "INDUSTRIAL AI",
    domain: "MANUFACTURING",
    impact: "93%",
    impactLabel: "ACCURACY",
    blurb:
      "Sensor data pipelines feeding anomaly detection models that predict equipment failures 48 hours before they happen.",
  },
];

export default function Missions() {
  return (
    <section id="work" className="relative bg-graphite-deep">
      <div className="noise" />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12 lg:px-20 py-20 md:py-24">
        <div className="flex items-baseline gap-6 mb-16 mono text-[11px] tracking-[0.3em] text-white/45">
          <span>02</span>
          <span className="w-12 h-px bg-white/20" />
          <span>WORK</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <h2 className="display text-5xl md:text-7xl leading-[0.95]">
            <RevealWord text="REAL SYSTEMS," />
            <br />
            <RevealWord text="IN PRODUCTION." delay={0.2} />
          </h2>
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            href="#contact"
            className="display tracking-[0.22em] text-[10px] text-white border-b border-white/25 pb-1 hover:border-[var(--lava-300)] hover:text-[var(--lava-100)] transition self-start md:self-end"
          >
            SEE FULL PORTFOLIO →
          </motion.a>
        </div>

        <ul className="border-t border-white/10">
          {useCases.map((m, idx) => (
            <motion.li
              key={m.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative border-b border-white/10 grid md:grid-cols-12 gap-6 py-10 hover:bg-white/[0.04] transition-colors duration-500 cursor-pointer"
            >
              {/* Left accent bar */}
              <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-white scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top shadow-[0_0_15px_3px_rgba(255,255,255,0.7)]" />

              {/* Number */}
              <div className="md:col-span-1 mono text-[11px] tracking-[0.2em] text-white/40 pt-2 group-hover:text-[var(--lava-100)] transition">
                {m.n}
              </div>

              {/* Title + blurb */}
              <div className="md:col-span-5">
                <div className="mono text-[10px] tracking-[0.3em] text-white/40 mb-2">
                  {m.program}
                </div>
                <h3 className="display text-xl sm:text-2xl md:text-4xl leading-tight group-hover:translate-x-2 transition-transform duration-500">
                  {m.title}
                </h3>
                <p className="mt-3 text-white/50 max-w-xl text-sm md:text-base leading-relaxed uppercase tracking-wider">
                  {m.blurb}
                </p>
              </div>

              {/* Impact metric — BIG + orange */}
              <div className="md:col-span-3 flex flex-col items-start md:items-center justify-center">
                <span className="impact-metric">{m.impact}</span>
                <span className="mono text-[10px] tracking-[0.25em] text-white/40 mt-1">
                  {m.impactLabel}
                </span>
              </div>

              {/* Domain */}
              <div className="md:col-span-2 text-[10px] text-white/50 pt-2 mono tracking-[0.2em]">
                {m.domain}
              </div>

              {/* Arrow */}
              <div className="md:col-span-1 flex md:justify-end pt-2">
                <span
                  aria-hidden
                  className="display text-2xl text-white/25 group-hover:text-[var(--lava-300)] group-hover:translate-x-2 transition-all duration-300"
                >
                  →
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
