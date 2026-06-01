"use client";

import { motion } from "motion/react";
import Mark from "./Mark";

const socials = [
  { label: "LINKEDIN", href: "https://www.linkedin.com/company/athreix/?viewAsMember=true" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/theathreix?igsh=dm0xdng4eGE5eTho" },
  { label: "WHATSAPP", href: "https://wa.me/919322973362" },
];

const footerLinks = [
  { label: "SERVICES", href: "#services" },
  { label: "WORK", href: "#work" },
  { label: "PROCESS", href: "#process" },
  { label: "CONTACT", href: "#contact" },
];

const marqueeText = "AGENTS • PLATFORMS • TOOLS • ML • DATA • AUTOMATION • ";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-black border-t border-white/10 overflow-hidden"
    >
      {/* Ticker bar at top of footer */}
      <div className="overflow-hidden py-3 border-b border-white/5 bg-[var(--gr-100)]">
        <div className="flex gap-8 whitespace-nowrap ticker-track">
          <div className="display text-[11px] tracking-[0.4em] text-white/15">
            {marqueeText.repeat(8)}
          </div>
          <div className="display text-[11px] tracking-[0.4em] text-white/15">
            {marqueeText.repeat(8)}
          </div>
        </div>
      </div>

      {/* Subtle top glow */}
      <div
        className="absolute top-12 inset-x-0 h-[200px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(255,91,31,0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12 lg:px-20 py-16 md:py-20">
        {/* Top row: CTA + nav + socials */}
        <div className="grid md:grid-cols-12 gap-16 md:gap-12 mb-16">
          {/* CTA */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative inline-block mb-10">
                <Mark className="h-9 w-9 text-white" />
                <div className="absolute inset-0 bg-[var(--lava-300)] opacity-0 hover:opacity-20 blur-xl transition-opacity duration-500" />
              </div>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="display text-4xl md:text-5xl lg:text-6xl leading-[1.05]"
            >
              HAVE A PROJECT YOU&apos;D LIKE TO DISCUSS?
              <br />
              <span className="text-white/40">LET&apos;S CONNECT.</span>
            </motion.h3>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              href="mailto:aryan@athreix.com"
              className="mt-10 inline-block text-xl md:text-2xl text-white/85 hover:text-[var(--lava-100)] transition-colors duration-300 border-b border-white/15 pb-1 hover:border-[var(--lava-300)]"
            >
              aryan@athreix.com
            </motion.a>
            <br />
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              href="tel:+919322973362"
              className="mt-6 inline-block text-xl md:text-2xl text-white/85 hover:text-[var(--lava-100)] transition-colors duration-300 border-b border-white/15 pb-1 hover:border-[var(--lava-300)]"
            >
              +91 9322973362
            </motion.a>
          </div>

          {/* Navigation + Socials */}
          <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-12 md:justify-end">
            {/* Nav links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="mono text-xs tracking-[0.2em] text-white/35 mb-6 uppercase">
                Navigation
              </div>
              <ul className="flex flex-col gap-5">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="social-link relative display text-base md:text-lg tracking-[0.1em] text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="mono text-xs tracking-[0.2em] text-white/35 mb-6 uppercase">
                Connect
              </div>
              <ul className="flex flex-col gap-5">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="social-link relative display text-base md:text-lg tracking-[0.1em] text-white/70 hover:text-white transition-colors"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="text-xs text-white/35 uppercase tracking-wider">
            © 2026 ATHREIX. ALL RIGHTS RESERVED.
          </span>
          <span className="mono text-[9px] tracking-[0.2em] text-white/25 flex items-center gap-2 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--lava-300)] pulse-dot" />
            Systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
