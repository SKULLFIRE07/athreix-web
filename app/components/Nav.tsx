"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Mark from "./Mark";

const links = [
  { href: "#services", label: "SERVICES" },
  { href: "#work", label: "WORK" },
  { href: "#process", label: "PROCESS" },
  { href: "#contact", label: "CONTACT" },
];

const tickerItems = [
  "50+ AI AGENTS SHIPPED",
  "12 PRODUCTS LAUNCHED",
  "99.9% UPTIME",
  "24/7 OPERATIONS",
  "SOC-2 COMPLIANT",
  "GPT-4o INTEGRATED",
  "< 24H RESPONSE TIME",
  "ENTERPRISE READY",
];

/* double the items for seamless loop */
const tickerTrack = [...tickerItems, ...tickerItems];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  /* ── scroll state ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── close menu on scroll ── */
  useEffect(() => {
    const handleScroll = () => {
      if (open) setOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Also listen to touchmove on mobile just in case
    window.addEventListener("touchmove", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [open]);

  /* ── active-section tracking ── */
  useEffect(() => {
    const ids = ["services", "work", "process", "contact"];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const ob = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(`#${id}`);
        },
        { threshold: 0, rootMargin: "-49% 0px -50% 0px" },
      );
      ob.observe(el);
      observers.push(ob);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── lock body scroll when mobile nav is open ── */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? "bg-black/70 backdrop-blur-xl border-b border-white/8"
            : "bg-transparent"
        }`}
      >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-14 md:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group" aria-label="Athreix">
          <div className="relative">
            <Mark className="h-7 w-7 md:h-8 md:w-8 text-white group-hover:text-[var(--lava-300)] transition-colors duration-300" />
            <div className="absolute inset-0 bg-[var(--lava-300)] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative display text-[11px] tracking-[0.18em] transition-colors duration-300 ${
                active === l.href
                  ? "nav-link-active text-[var(--lava-100)]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}

          {/* CTA */}
          <a
            href="#contact"
            className="display tracking-[0.2em] text-[10px] px-5 py-2 bg-[var(--lava-300)] text-white hover:bg-[var(--lava-100)] transition-colors duration-300 btn-glow"
          >
            START A PROJECT
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[60]"
        >
          <span
            className={`block h-px w-6 bg-white transition-all duration-300 ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-white transition-all duration-300 ${
              open ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-white transition-all duration-300 ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* ── Scrolling ticker / stats bar ── */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="stats-bar overflow-hidden border-t border-white/5 bg-black/50 backdrop-blur-md"
          >
            <div className="py-1.5 overflow-hidden relative">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />

              <div className="ticker-track flex items-center whitespace-nowrap">
                {tickerTrack.map((item, i) => (
                  <span
                    key={i}
                    className="mono text-[9px] tracking-[0.3em] text-white/40 mx-6 flex items-center gap-3 shrink-0"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--lava-300)] opacity-50" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      </header>

      {/* ── Full-screen mobile nav overlay (Independent of Header) ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl md:hidden"
          >
            {/* Overlay Header (Logo + Close) */}
            <div className="absolute top-0 inset-x-0 px-6 h-14 flex items-center justify-between">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center group">
                <Mark className="h-7 w-7 text-[var(--lava-300)]" />
              </Link>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              >
                <span className="block h-px w-6 bg-white translate-y-[3px] rotate-45" />
                <span className="block h-px w-6 bg-white -translate-y-[4px] -rotate-45" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center h-full gap-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`display text-3xl tracking-[0.2em] transition-colors ${
                    active === l.href
                      ? "text-[var(--lava-100)]"
                      : "text-white/80 hover:text-[var(--lava-100)]"
                  }`}
                >
                  {l.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="display tracking-[0.2em] text-xs px-7 py-3.5 bg-[var(--lava-300)] text-white btn-glow mt-2"
              >
                START A PROJECT
              </motion.a>
            </div>

            {/* Ambient embers behind mobile nav */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="ember"
                  style={{
                    left: `${(i * 47) % 100}%`,
                    animationDelay: `-${(i * 1.5) % 10}s`,
                    animationDuration: `${12 + (i % 4) * 2}s`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
