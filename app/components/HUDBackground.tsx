"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function HUDBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hexData, setHexData] = useState<string[]>([]);
  const [coords, setCoords] = useState({ x: "000.00", y: "000.00" });

  useEffect(() => {
    // Generate random hex data
    const generateHex = () => {
      return Array.from({ length: 8 }, () => 
        Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()
      );
    };
    setHexData(generateHex());

    const interval = setInterval(() => {
      setHexData(generateHex());
      setCoords({
        x: (Math.random() * 999).toFixed(2).padStart(6, '0'),
        y: (Math.random() * 999).toFixed(2).padStart(6, '0')
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Boot up sequence
      tl.to(".hud-overlay", { opacity: 0.1, duration: 0.1, yoyo: true, repeat: 3 })
        .to(".hud-overlay", { opacity: 1, duration: 2, ease: "power4.out" })
        .fromTo(".hud-line", { scaleX: 0 }, { scaleX: 1, duration: 1.5, stagger: 0.1, ease: "expo.inOut" }, "-=1.5")
        .fromTo(".hud-element", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.05, ease: "power3.out" }, "-=1");

      // Continuous rotations
      gsap.to(".spin-slow-cw", { rotation: 360, duration: 40, repeat: -1, ease: "none", transformOrigin: "center center" });
      gsap.to(".spin-slow-ccw", { rotation: -360, duration: 60, repeat: -1, ease: "none", transformOrigin: "center center" });
      gsap.to(".spin-fast", { rotation: 360, duration: 10, repeat: -1, ease: "none", transformOrigin: "center center" });
      
      // Radar sweep
      gsap.to(".radar-sweep", { rotation: 360, duration: 4, repeat: -1, ease: "none", transformOrigin: "center center" });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden hud-overlay mix-blend-multiply">
      
      {/* Massive Background Coordinates & Data Streams */}
      <div className="absolute top-8 left-8 flex flex-col gap-1 hud-element">
        <span className="mono text-[8px] text-black/30 font-bold tracking-[0.3em]">SYS.OP.409</span>
        <span className="mono text-[8px] text-black/30 font-bold tracking-[0.3em]">LAT: {coords.x}</span>
        <span className="mono text-[8px] text-black/30 font-bold tracking-[0.3em]">LNG: {coords.y}</span>
      </div>

      <div className="absolute top-8 right-8 flex flex-col gap-1 text-right hud-element">
        {hexData.map((hex, i) => (
          <span key={i} className="mono text-[8px] text-black/20 font-bold tracking-widest">{hex}</span>
        ))}
      </div>

      {/* Structural Framing Lines */}
      <div className="absolute top-[15%] left-0 w-full h-[1px] bg-black/10 hud-line origin-left" />
      <div className="absolute bottom-[15%] left-0 w-full h-[1px] bg-black/10 hud-line origin-right" />
      <div className="absolute top-0 left-[15%] w-[1px] h-full bg-black/10 hud-line origin-top" />
      <div className="absolute top-0 right-[15%] w-[1px] h-full bg-black/10 hud-line origin-bottom" />

      {/* Corner Brackets */}
      <div className="absolute top-10 left-10 w-16 h-16 border-t-[2px] border-l-[2px] border-black/20 hud-element" />
      <div className="absolute top-10 right-10 w-16 h-16 border-t-[2px] border-r-[2px] border-black/20 hud-element" />
      <div className="absolute bottom-10 left-10 w-16 h-16 border-b-[2px] border-l-[2px] border-black/20 hud-element" />
      <div className="absolute bottom-10 right-10 w-16 h-16 border-b-[2px] border-r-[2px] border-black/20 hud-element" />

      {/* The Massive Central SVG HUD Engine */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[1500px] max-h-[1500px] opacity-60">
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          <g transform="translate(500 500)">
            
            {/* Outer Grid Ring */}
            <circle cx="0" cy="0" r="450" fill="none" stroke="black" strokeWidth="2" strokeDasharray="4 12" className="spin-slow-cw" />
            <circle cx="0" cy="0" r="460" fill="none" stroke="black" strokeWidth="1" className="spin-slow-ccw" />
            
            {/* Thick segmented data ring */}
            <circle cx="0" cy="0" r="400" fill="none" stroke="black" strokeWidth="4" strokeDasharray="1 15 50 15" className="spin-fast" />
            <circle cx="0" cy="0" r="390" fill="none" stroke="black" strokeWidth="20" strokeDasharray="1 5" opacity="0.2" className="spin-slow-ccw" />

            {/* Inner Precision Rings */}
            <circle cx="0" cy="0" r="300" fill="none" stroke="black" strokeWidth="1" />
            <circle cx="0" cy="0" r="290" fill="none" stroke="black" strokeWidth="1" strokeDasharray="5 5" className="spin-slow-cw" />
            
            {/* Radar Sweep */}
            <path d="M 0 0 L 0 -290 A 290 290 0 0 1 150 -245 Z" fill="url(#radar-gradient)" className="radar-sweep" />

            {/* Crosshairs */}
            <line x1="-500" y1="0" x2="500" y2="0" stroke="black" strokeWidth="2" opacity="0.5" />
            <line x1="0" y1="-500" x2="0" y2="500" stroke="black" strokeWidth="2" opacity="0.5" />
            <circle cx="0" cy="0" r="10" fill="none" stroke="black" strokeWidth="3" />
            <circle cx="0" cy="0" r="3" fill="black" />

            {/* Target nodes on rings */}
            <g className="spin-slow-cw">
              <circle cx="0" cy="-400" r="5" fill="black" />
              <circle cx="346" cy="200" r="5" fill="black" />
              <circle cx="-346" cy="200" r="5" fill="black" />
            </g>

            {/* Sine Wave Data Streams */}
            <path d="M -500 100 Q -250 200 0 100 T 500 100" fill="none" stroke="black" strokeWidth="1" opacity="0.2" />
            <path d="M -500 -100 Q -250 -200 0 -100 T 500 -100" fill="none" stroke="black" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />

          </g>

          <defs>
            <radialGradient id="radar-gradient" cx="0%" cy="0%" r="100%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      
    </div>
  );
}
