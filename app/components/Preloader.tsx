"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Mark from "./Mark";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        document.body.style.overflow = "";
      },
    });

    // Progress bar
    tl.to(barRef.current, { scaleX: 1, duration: 2.2, ease: "power4.out" }, 0);

    // Letters stagger in
    if (lettersRef.current) {
      tl.fromTo(
        lettersRef.current.children,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.25, stagger: 0.08, ease: "power2.out" },
        0.8
      );
    }

    // Slide preloader out
    tl.to(containerRef.current, { yPercent: -100, duration: 0.9, ease: "power3.inOut" }, 2.6);

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center gap-6 will-change-transform"
    >
      <Mark className="w-12 h-12 text-black" />

      <div ref={lettersRef} className="display text-lg tracking-[0.35em] text-black">
        {"ATHREIX".split("").map((ch, i) => (
          <span key={i} className="inline-block opacity-0 translate-y-3">{ch}</span>
        ))}
      </div>

      <div className="w-16 h-px bg-black/10 overflow-hidden">
        <div ref={barRef} className="h-full bg-black origin-left" style={{ transform: "scaleX(0)" }} />
      </div>
    </div>
  );
}
