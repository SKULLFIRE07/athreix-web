"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;
    if (!dot.current) return;

    const xTo = gsap.quickTo(dot.current, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(dot.current, "y", { duration: 0.15, ease: "power3" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX - 8);
      yTo(e.clientY - 8);
    };

    // Show cursor after first move
    const show = () => {
      gsap.to(dot.current, { opacity: 1, duration: 0.3 });
      window.removeEventListener("mousemove", show);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", show);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", show);
    };
  }, []);

  return (
    <div
      ref={dot}
      className="hidden md:block fixed top-0 left-0 w-4 h-4 rounded-full bg-black pointer-events-none mix-blend-difference z-[9999]"
      style={{ opacity: 0 }}
    />
  );
}
