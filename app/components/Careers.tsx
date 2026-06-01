"use client";

import { motion } from "motion/react";
import { RevealWord } from "./Reveal";
import Embers from "./Embers";

export default function Careers() {
  return (
    <section
      id="start"
      className="relative bg-graphite-deep overflow-hidden border-t border-white/10"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 85% 30%, rgba(255,91,31,0.16), transparent 65%), radial-gradient(ellipse 60% 50% at 10% 90%, rgba(106,26,5,0.22), transparent 65%)",
        }}
      />

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-[0.04]" />

      {/* Noise */}
      <div className="noise" />

      {/* Embers floating up */}
      <Embers count={16} />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="flex items-baseline gap-6 mb-12 mono text-[11px] tracking-[0.3em] text-white/45">
          <span>04</span>
          <span className="w-12 h-px bg-white/20" />
          <span>START A PROJECT</span>
        </div>

        <h2 className="display text-6xl md:text-[8rem] leading-[0.9] max-w-5xl">
          <RevealWord text="LET'S BUILD" forceAnimate />
          <br />
          <RevealWord text="SOMETHING." delay={0.3} forceAnimate />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 max-w-2xl text-white/65 text-sm md:text-base uppercase tracking-wider leading-relaxed"
        >
          HAVE AN IDEA? AN INTERNAL WORKFLOW THAT&apos;S EATING YOUR TEAM ALIVE? AN
          AI PRODUCT YOU WANT TO TAKE FROM ZERO TO LAUNCH? TELL US ABOUT IT.
          WE USUALLY REPLY WITHIN A DAY.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="mailto:aryan@athreix.com"
            className="btn-glow display tracking-[0.22em] text-[10px] md:text-xs px-10 py-4 md:py-5 bg-white text-black hover:bg-[var(--lava-300)] hover:text-white transition-colors duration-300 text-center"
          >
            EMAIL US
          </a>
          <a
            href="#contact"
            className="btn-glow-outline display tracking-[0.22em] text-[10px] md:text-xs px-10 py-4 md:py-5 border border-white/20 text-white/80 transition-all duration-300 text-center"
          >
            LET&apos;S TALK →
          </a>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <span className="float-badge">SOC-2 COMPLIANT</span>
          <span className="float-badge">GDPR READY</span>
          <span className="float-badge">99.9% SLA</span>
        </motion.div>
      </div>
    </section>
  );
}
