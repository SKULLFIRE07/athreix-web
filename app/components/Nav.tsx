"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const links = [
  { href: "#services", label: "SERVICES" },
  { href: "#portfolio", label: "PORTFOLIO" },
  { href: "#ai-lab", label: "AI LAB" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 inset-x-0 z-[100] opacity-0 pointer-events-auto bg-white/70 backdrop-blur-2xl border-b border-black/[0.04]"
        style={{ willChange: "transform" }}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0 group">
            <span className="display text-[14px] sm:text-[15px] tracking-[0.15em] font-medium text-black/90 group-hover:text-black transition-colors duration-300">
              [ ATHREIX ]
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="mono text-[9px] uppercase tracking-[0.25em] text-black/50 hover:text-black transition-colors duration-300 font-medium"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Contact Button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center mono text-[9px] uppercase tracking-[0.25em] bg-black text-white px-8 py-2.5 rounded-sm hover:bg-black/80 transition-transform hover:scale-105 duration-300 font-medium"
          >
            Contact
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="sm:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          >
            <span className={`block h-[1px] w-5 bg-black transition-all duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-[1px] w-5 bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[1px] w-5 bg-black transition-all duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[90] bg-white text-black sm:hidden flex flex-col items-center justify-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="mono text-lg tracking-[0.3em] opacity-70 hover:opacity-100 uppercase transition-opacity font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mono text-lg tracking-[0.3em] px-10 py-4 border border-black/20 uppercase mt-8 hover:bg-black hover:text-white transition-colors font-medium"
          >
            CONTACT
          </a>
        </div>
      )}
    </>
  );
}
