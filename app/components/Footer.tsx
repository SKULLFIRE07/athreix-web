"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Mark from "./Mark";

const socials = [
  { label: "LINKEDIN", href: "https://www.linkedin.com/company/athreix/?viewAsMember=true" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/theathreix" },
  { label: "WHATSAPP", href: "https://wa.me/919322973362" },
];

const footerLinks = [
  { label: "SERVICES", href: "#services" },
  { label: "PORTFOLIO", href: "#portfolio" },
  { label: "AI LAB", href: "#ai-lab" },
  { label: "CONTACT", href: "#contact" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Fade up elements
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      // Massive ATHREIX text letters appear strictly one by one as you scroll!
      gsap.fromTo(".athreix-letter", 
        { opacity: 0, y: 150, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 1, // Stagger exactly equal to duration creates a strictly sequential timeline
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 60%",
            end: "85% bottom",
            scrub: 1
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={ref} className="relative bg-black text-white border-t border-white/5 overflow-hidden flex flex-col justify-between min-h-screen">
      
      {/* Abstract Background Glows */}
      <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vw] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20 pt-24 md:pt-32 relative z-10 flex-1 flex flex-col">
        <div className="grid md:grid-cols-12 gap-16 md:gap-12 flex-1">
          {/* CTA */}
          <div className="md:col-span-7">
            <h3 className="reveal-up opacity-0 translate-y-10 display text-4xl md:text-5xl lg:text-7xl font-light leading-[1.05] mb-12 tracking-tight">
              HAVE A PROJECT?<br />
              <span className="text-white/30 italic">LET&apos;S BUILD IT.</span>
            </h3>
            
            <div className="reveal-up opacity-0 translate-y-10 flex flex-col gap-6 items-start">
              <a href="mailto:aryan@athreix.com" className="inline-flex items-center gap-4 text-xl md:text-3xl font-light text-white hover:text-white/80 transition-all duration-300">
                aryan@athreix.com
              </a>
              <a href="tel:+919322973362" className="inline-flex items-center gap-4 text-xl md:text-3xl font-light text-white/50 hover:text-white transition-all duration-300">
                +91 9322973362
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-16 md:justify-end mt-8 md:mt-0">
            <div className="reveal-up opacity-0 translate-y-10">
              <div className="mono text-[10px] tracking-[0.3em] text-white/30 mb-8 uppercase font-bold">Navigation</div>
              <ul className="flex flex-col gap-5">
                {footerLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="relative display text-base md:text-lg tracking-wide text-white/50 hover:text-white transition-colors duration-300 hover:translate-x-2 inline-block transform">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal-up opacity-0 translate-y-10">
              <div className="mono text-[10px] tracking-[0.3em] text-white/30 mb-8 uppercase font-bold">Connect</div>
              <ul className="flex flex-col gap-5">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="relative display text-base md:text-lg tracking-wide text-white/50 hover:text-white transition-colors duration-300 hover:translate-x-2 inline-block transform">{s.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pb-12 pt-8 flex flex-col justify-between items-start gap-6 relative z-20 mt-20 border-t border-white/10">
          <span className="mono text-[10px] text-white/30 uppercase tracking-widest">© 2026 Athreix. All rights reserved.</span>
        </div>
      </div>

      {/* MASSIVE BACKGROUND TYPOGRAPHY */}
      <div className="absolute inset-0 overflow-hidden flex justify-center items-end pb-24 sm:pb-32 pointer-events-none select-none z-0">
        <div 
          className="text-[18vw] md:text-[24vw] font-bold text-white/[0.08] leading-[0.75] tracking-tighter flex"
          style={{ fontFamily: "var(--font-alliance)" }}
        >
          {["A", "T", "H", "R", "E", "I", "X"].map((letter, i) => (
            <span key={i} className="athreix-letter opacity-0 translate-y-20 inline-block">
              {letter}
            </span>
          ))}
        </div>
      </div>

    </footer>
  );
}
