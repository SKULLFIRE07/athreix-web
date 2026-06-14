"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const Core3D = dynamic(() => import("./components/Core3D"), { ssr: false });

/* ── Reusable GSAP hooks ── */
function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 70%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
}

function useParallax(ref: React.RefObject<HTMLElement | null>, yOffset: number) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: yOffset,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [ref, yOffset]);
}

/* ── GSAP Text Scrub Component ── */
function ScrubText({ text }: { text: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;
    const words = containerRef.current.querySelectorAll('.scrub-word');
    
    const ctx = gsap.context(() => {
      gsap.fromTo(words, 
        { color: "rgba(0,0,0,0.12)" }, 
        { 
          color: "rgba(0,0,0,0.95)",
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 40%",
            scrub: true,
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <h2 ref={containerRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight balance-text" style={{ fontFamily: "var(--font-alliance)" }}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="scrub-word inline-block mr-[0.25em]">{word}</span>
      ))}
    </h2>
  );
}

/* ── 24/7/365 Canvas Particle Network ── */
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: {x: number, y: number, vx: number, vy: number}[] = [];
    const numParticles = 70; // Slightly denser

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
      });
    }

    let animationFrameId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1.0;

      for (let i = 0; i < numParticles; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges smoothly
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.0, 0, Math.PI * 2); // Bolder dots
        ctx.fillStyle = 'rgba(0,0,0,0.3)'; // Higher opacity
        ctx.fill();

        for (let j = i + 1; j < numParticles; j++) {
          let p2 = particles[j];
          let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0,0,0,${0.12 - dist / 1500})`; // Bolder connecting lines
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}

/* ══════════════════════════════════════════════
   SECTION 1 - Hero
   ══════════════════════════════════════════════ */
function HeroSection() {
  const infoRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bgShapeRef1 = useRef<HTMLDivElement>(null);
  const bgShapeRef2 = useRef<HTMLDivElement>(null);

  useParallax(bgShapeRef1, -200);
  useParallax(bgShapeRef2, 250);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.0, delay: 0.2, ease: "power3.out" });
    gsap.fromTo(".hero-headline", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.4, ease: "power4.out" });
    gsap.fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.0, delay: 0.7, ease: "power3.out" });
    gsap.fromTo(".hero-vis", { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 2.0, delay: 1.0, ease: "power2.out" });

    // Premium scroll parallax for Hero
    gsap.to(".hero-parallax", {
      y: "25vh",
      opacity: 0,
      scale: 0.95,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "600px top",
        scrub: 1
      }
    });
  }, []);

  return (
    <div className="bg-white min-h-screen relative z-10 flex flex-col pt-24 sm:pt-32 overflow-hidden">
      {/* Palantir-style Ultra-Subtle Blueprint Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-between px-6 sm:px-12 md:px-16 lg:px-20 opacity-[0.015] mix-blend-multiply">
        <div className="w-[1px] h-full bg-black"></div>
        <div className="w-[1px] h-full bg-black"></div>
        <div className="w-[1px] h-full bg-black"></div>
        <div className="w-[1px] h-full bg-black hidden sm:block"></div>
        <div className="w-[1px] h-full bg-black hidden lg:block"></div>
      </div>

      {/* Background abstract moving elements matching DeFi aesthetics */}
      <div ref={bgShapeRef1} className="absolute top-[10%] right-[5%] opacity-[0.06] pointer-events-none w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-black rounded-full mix-blend-multiply blur-[120px] animate-float-slow z-0" />
      <div ref={bgShapeRef2} className="absolute bottom-[20%] left-[-5%] opacity-[0.04] pointer-events-none w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-black rounded-full mix-blend-multiply blur-[100px] animate-spin-slow z-0" />
      
      {/* Massive 3D Palantir Data Core with Dots */}
      <Core3D />

      <div className="hero-parallax flex-1 flex flex-col justify-center items-center w-full px-6 sm:px-12 md:px-16 lg:px-20 relative z-10 text-center">
        <p ref={subtitleRef} className="mono text-xs sm:text-sm uppercase tracking-[0.4em] pl-[0.4em] text-black/70 mb-8 sm:mb-12 font-extrabold text-center w-full">
          One of India's first AI-native agencies
        </p>
        <h1
          className="hero-headline font-medium select-none whitespace-nowrap opacity-0"
          style={{ fontSize: "clamp(50px, 14vw, 220px)", lineHeight: 0.9, letterSpacing: "-0.04em", fontFamily: "var(--font-alliance)" }}
        >
          Athreix
        </h1>
        <p className="hero-desc mt-10 sm:mt-16 text-lg sm:text-xl md:text-2xl text-black/50 max-w-3xl leading-relaxed font-light opacity-0" style={{ fontFamily: "var(--font-alliance)" }}>
          We engineer autonomous systems, custom intelligence platforms, and deep integrations that permanently compound your enterprise capabilities.
        </p>
        <div className="mt-16 sm:mt-24 w-[1px] h-24 bg-gradient-to-b from-black/20 to-transparent mx-auto animate-float-slow" />
      </div>

      <div ref={infoRef} className="hidden sm:flex justify-between w-full px-6 sm:px-12 md:px-16 lg:px-20 pb-10 relative z-10" style={{ opacity: 0 }}>
        <div className="flex flex-col">
          <span className="mono text-[10px] text-black/30 uppercase tracking-[0.2em] mb-1 font-medium">Scroll down</span>
          <span className="w-12 h-[1px] bg-black/20" />
        </div>
        <div className="flex text-right">
          <p className="mono text-[9px] sm:text-[10px] uppercase tracking-widest text-black/40 leading-[1.8] font-medium">
            Building Systems<br />That Defy Limits
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SECTION 2 - About / Mission
   ══════════════════════════════════════════════ */
function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 70%", once: true } });
      });

      // Infinite Marquee animation
      gsap.to(".marquee-inner", {
        xPercent: -50,
        repeat: -1,
        duration: 45, // SLOWER
        ease: "linear"
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-24 sm:py-32 bg-white flex flex-col overflow-hidden z-20">
      <div className="container mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10 flex flex-col items-center text-center">
        <p className="mono text-xs sm:text-sm tracking-[0.2em] text-black/40 uppercase font-medium mb-8 sm:mb-12">
          Core Mission
        </p>
        <p className="reveal-up text-xl sm:text-2xl md:text-3xl text-black/80 leading-relaxed max-w-4xl font-medium" style={{ fontFamily: "var(--font-alliance)" }}>
          We operate like a special-ops engineering unit. Small team, fast cycles, zero bureaucracy. Embedded in your problem until it's solved perfectly.
        </p>
      </div>

      {/* Horizontal Stats Marquee */}
      <div className="w-full mt-24 overflow-hidden border-y border-black/5 bg-black/[0.02] py-6 flex items-center">
        <div className="marquee-inner flex whitespace-nowrap items-center gap-12 sm:gap-20 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase font-bold text-black/30 w-max">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 sm:gap-20">
              <span>&lt;72h TO FIRST DEPLOY</span>
              <span className="text-black/20">/</span>
              <span>25+ PROJECTS SHIPPED</span>
              <span className="text-black/20">/</span>
              <span>99.9% UPTIME SLA</span>
              <span className="text-black/20">/</span>
              <span>8-12wk MVP TO SCALE</span>
              <span className="text-black/20">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 3 - Capabilities
   ══════════════════════════════════════════════ */
const capabilities = [
  { icon: "⬡", title: "AI Agent Systems", desc: "Autonomous agents that handle support, sales, ops, and data - running 24/7 on your infrastructure without human intervention." },
  { icon: "◇", title: "Full-Stack Platforms", desc: "End-to-end SaaS products from auth to analytics, shipped as turnkey platforms your users will absolutely love." },
  { icon: "△", title: "Production ML", desc: "Model training, fine-tuning, RAG pipelines, and real-time inference deployed at planetary scale with low latency." },
  { icon: "○", title: "Workflow Automation", desc: "Eliminate manual work entirely with intelligent pipelines that connect your tools, data, and decisions seamlessly." },
];

function CapabilitiesSection() {
  const ref = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  useParallax(parallaxRef, 150);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current || !cardsRef.current) return;
    const ctx = gsap.context(() => {
      // Background Laser Sweep
      gsap.to(".laser-sweep", {
        y: "100vh",
        duration: 4,
        ease: "linear",
        repeat: -1,
        yoyo: true
      });

      // Extreme Palantir Entrance for Capabilities
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1.5,
        }
      });

      // Background grid parallax
      tl.fromTo(".cap-grid", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 0.2, duration: 1 });

      // Hardware locking animation for boxes (Strictly SCROLL-BOUND)
      gsap.fromTo(
        cardsRef.current!.children,
        { opacity: 0, z: -500, rotateX: 45, y: 150 },
        {
          opacity: 1,
          z: 0,
          rotateX: 0,
          y: 0,
          stagger: 0.15, // Extremely fast sequence
          ease: "none",
          scrollTrigger: {
            trigger: cardsRef.current, 
            start: "top 85%", 
            end: "center 65%", // Extremely short physical scroll distance
            scrub: true
          }
        }
      );

      gsap.utils.toArray<HTMLElement>(".reveal-up-cap").forEach((el) => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 75%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-black text-white py-32 sm:py-48 px-6 sm:px-12 md:px-16 lg:px-20 relative overflow-hidden [perspective:2000px]">
      
      {/* Dark Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
      
      {/* Massive subtle background typography for dark mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-bold text-white/[0.03] whitespace-nowrap pointer-events-none select-none z-0" style={{ fontFamily: "var(--font-alliance)" }}>
        CAPABILITIES
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-24">
          <div>
            <p className="reveal-up-cap opacity-0 translate-y-10 mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/40 mb-6 font-bold flex items-center gap-3">
              <span className="w-2 h-2 bg-white/40 rounded-sm animate-pulse" />
              Core systems
            </p>
            <h2 className="reveal-up-cap opacity-0 translate-y-10 text-5xl sm:text-6xl md:text-7xl font-light text-white/95 leading-[1.1] tracking-tight" style={{ fontFamily: "var(--font-alliance)" }}>
              What We Engineer
            </h2>
          </div>
          <p className="reveal-up-cap opacity-0 translate-y-10 text-lg sm:text-xl text-white/40 max-w-md leading-relaxed lg:text-right" style={{ fontFamily: "var(--font-alliance)" }}>
            Every system we build is designed for production from day one - battle-tested, continuously monitored, and highly scalable.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 transform-style-3d">
          {capabilities.map((c, i) => (
            <div 
              key={c.title} 
              className="group border border-white/5 bg-transparent p-8 sm:p-10 hover:border-white/10 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-700 flex flex-col justify-between min-h-[420px] relative overflow-hidden backdrop-blur-md opacity-0"
              style={{ clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)" }}
            >
              
              {/* Corner target reticles */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 group-hover:border-white/30 transition-colors duration-500" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 group-hover:border-white/30 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/10 group-hover:border-white/30 transition-colors duration-500" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 group-hover:border-white/30 transition-colors duration-500" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-12">
                  <div className="text-4xl text-white/20 group-hover:text-white/80 transition-all duration-500 transform group-hover:scale-110 origin-left">{c.icon}</div>
                  <span className="mono text-[9px] text-white/20">0{i+1}</span>
                </div>
                <h3 className="text-2xl font-medium text-white/90 mb-6 tracking-wide group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-alliance)" }}>{c.title}</h3>
                <p className="text-sm sm:text-base text-white/40 leading-relaxed group-hover:text-white/60 transition-colors" style={{ fontFamily: "var(--font-alliance)" }}>{c.desc}</p>
              </div>
              <div className="mt-8 h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-1000 ease-out" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 4 - Services
   ══════════════════════════════════════════════ */
const servicesList = [
  { num: "01", title: "Custom AI Agents", desc: "Purpose-built autonomous agents that handle sales, support, ops, and data pipelines - running 24/7 without human intervention." },
  { num: "02", title: "AI SaaS Platforms", desc: "Full-stack AI-powered web and mobile products, from auth to analytics - shipped as turnkey platforms your customers can use today." },
  { num: "03", title: "Internal Tools & Automation", desc: "Dashboards, CRMs, admin panels, and workflow engines that replace spreadsheets and reduce manual work by 90%." },
  { num: "04", title: "Production ML & Data", desc: "Model training, fine-tuning, RAG pipelines, and real-time inference at scale - deployed on your infra or ours." },
  { num: "05", title: "AI Strategy & Consulting", desc: "Discovery sprints to identify high-leverage automation, proof-of-concept in days, and a roadmap to full implementation." },
  { num: "06", title: "Design & Engineering", desc: "End-to-end product design, frontend, backend, DevOps, and infra - we are the technical team you don't have to hire." },
];

function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current || !cardsRef.current) return;
    const ctx = gsap.context(() => {
      // Reveal header elements
      gsap.utils.toArray<HTMLElement>(".reveal-up-srv").forEach((el) => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 75%", once: true } });
      });

      // Extreme Palantir Hardware Locking for Services (Strictly SCROLL-BOUND)
      gsap.fromTo(
        cardsRef.current!.children,
        { opacity: 0, z: -500, rotateX: 45, y: 150 },
        {
          opacity: 1,
          z: 0,
          rotateX: 0,
          y: 0,
          stagger: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "center center", // Finish animation when container hits the middle of the screen
            scrub: true
          }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={ref} className="bg-[#fafafa] py-32 sm:py-48 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-black/5 relative overflow-hidden">
      
      {/* Crazy Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
      
      {/* Massive subtle background typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-bold text-black/[0.02] whitespace-nowrap pointer-events-none select-none z-0" style={{ fontFamily: "var(--font-alliance)" }}>
        SYSTEMS
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-24">
          <div>
            <p className="reveal-up-srv opacity-0 translate-y-10 mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-black/40 mb-6 font-medium">What we do</p>
            <h2 className="reveal-up-srv opacity-0 translate-y-10 text-5xl sm:text-6xl md:text-7xl font-light text-black/90 leading-tight tracking-tight" style={{ fontFamily: "var(--font-alliance)" }}>Services</h2>
          </div>
          <p className="reveal-up-srv opacity-0 translate-y-10 text-lg sm:text-xl text-black/50 max-w-md leading-relaxed lg:text-right" style={{ fontFamily: "var(--font-alliance)" }}>
            We don&apos;t do generic IT. Every single engagement is totally bespoke, built around your exact constraints and goals.
          </p>
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transform-style-3d [perspective:2000px]">
          {servicesList.map((s) => (
            <div 
              key={s.num} 
              className="bg-white border-[1.5px] border-black/10 p-8 sm:p-10 md:p-12 transition-all duration-700 opacity-0 flex flex-col justify-between group relative overflow-hidden shadow-sm hover:shadow-md hover:border-black/30"
              style={{ clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)", minHeight: "360px" }}
            >
              {/* Corner target reticles */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-black/10 group-hover:border-black/40 transition-colors" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-black/10 group-hover:border-black/40 transition-colors" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-black/10 group-hover:border-black/40 transition-colors" />
              
              {/* Glowing hover orbit */}
              <div className="absolute -inset-24 bg-gradient-to-r from-black/0 via-black/[0.03] to-black/0 opacity-0 group-hover:opacity-100 rotate-45 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

              <div className="relative z-10">
                <span className="mono text-[10px] tracking-[0.2em] text-black/60 uppercase font-bold">{s.num}</span>
                <h3 className="mt-8 mb-4 text-xl sm:text-2xl font-medium text-black leading-snug" style={{ fontFamily: "var(--font-alliance)" }}>{s.title}</h3>
              </div>
              <p className="relative z-10 text-sm sm:text-base text-black/70 leading-relaxed mt-10 font-normal" style={{ fontFamily: "var(--font-alliance)" }}>"{s.desc}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 5 - Process
   ══════════════════════════════════════════════ */
const steps = [
  { num: "01", title: "Discovery Sprint", desc: "We map your workflows, identify the highest-leverage automation opportunities, and align on scope - usually in under 48 hours." },
  { num: "02", title: "Prototype & Prove", desc: "Working proof-of-concept shipped within days, not months. You validate direction before committing to a full build." },
  { num: "03", title: "Build & Ship", desc: "Production-grade engineering: CI/CD, monitoring, security, infra. We ship to your users with absolutely zero drama." },
  { num: "04", title: "Scale & Support", desc: "Ongoing optimization, feature rollouts, and 24/7 monitoring. We stay embedded directly as your AI engineering team." },
];

function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  useParallax(parallaxRef, -100);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current || !cardsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-up-proc").forEach((el) => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 70%", once: true } });
      });

      // Stagger Process steps (Strictly SCROLL-BOUND)
      gsap.fromTo(
        cardsRef.current!.children,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15, // Extremely fast sequence
          ease: "none",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            end: "center 65%", // Extremely short physical scroll distance
            scrub: true
          }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#f2f2f2] py-32 sm:py-48 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-black/5 relative overflow-hidden">
      
      {/* Crazy Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
      
      {/* Massive subtle background typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-bold text-black/[0.02] whitespace-nowrap pointer-events-none select-none z-0" style={{ fontFamily: "var(--font-alliance)" }}>
        PROCESS
      </div>

      <div ref={parallaxRef} className="absolute left-0 top-1/4 w-[1px] h-[50%] bg-gradient-to-b from-transparent via-black/10 to-transparent pointer-events-none z-0" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
          <div>
            <p className="reveal-up-proc opacity-0 translate-y-10 mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-black/40 mb-6 font-medium">How we work</p>
            <h2 className="reveal-up-proc opacity-0 translate-y-10 text-5xl sm:text-6xl md:text-7xl font-light text-black/90 leading-[1.1] tracking-tight balance-text" style={{ fontFamily: "var(--font-alliance)" }}>
              From Zero to Production in 8-12 Weeks
            </h2>
          </div>
          <div className="flex items-end">
            <p className="reveal-up-proc opacity-0 translate-y-10 text-lg sm:text-xl text-black/50 leading-relaxed" style={{ fontFamily: "var(--font-alliance)" }}>
              Every engagement follows the same battle-tested playbook designed for maximum speed and absolute reliability.
            </p>
          </div>
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((s) => (
            <div 
              key={s.num} 
              className="group opacity-0 bg-white border border-black/5 p-8 sm:p-10 transition-all duration-500 hover:border-black/20 hover:shadow-lg relative overflow-hidden"
              style={{ clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)", minHeight: "320px" }}
            >
              <div className="flex items-center gap-4 mb-10">
                <span className="mono text-[10px] sm:text-xs tracking-[0.3em] text-black/30 font-medium">{s.num}</span>
                <div className="h-[2px] flex-1 bg-black/5 group-hover:bg-black/20 transition-colors duration-700" />
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-black/80 mb-4" style={{ fontFamily: "var(--font-alliance)" }}>{s.title}</h3>
              <p className="text-sm sm:text-base text-black/50 leading-relaxed font-light" style={{ fontFamily: "var(--font-alliance)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 6 - Pipeline / Technology
   ══════════════════════════════════════════════ */
const CODE_SNIPPET = `
impl AutonomousAgent {
    pub async fn execute(&mut self, ctx: &Context) -> Result<()> {
        let embeddings = self.vector_db.query(&ctx.intent).await?;
        let action = self.llm.reason(embeddings).await?;
        self.dispatch(action).await
    }
}

func HandleWebSocket(c *websocket.Conn) {
    for {
        msg := <-stream
        c.WriteJSON(msg)
    }
}

def fine_tune_model(dataset_path: str):
    model = AutoModelForCausalLM.from_pretrained("deepseek-r1")
    trainer = Trainer(model=model, train_dataset=dataset)
    trainer.train()
`.repeat(20);

function PipelineSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      
      // Unpinned, natural scroll timeline
      // Starts when section is 80% into view, finishes exactly at center!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", 
          end: "center center", 
          scrub: 1.5,
        }
      });

      // 1. Fade in and slide up the text block
      tl.fromTo(".pipeline-text-block", 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      // 2. The Windows terminal zooms in MASSIVELY!
      tl.fromTo(".windows-screen-container",
        { scale: 0.5, rotationX: 15, y: 150, opacity: 0 },
        { scale: 1.15, rotationX: 0, y: 0, opacity: 1, duration: 2, ease: "power2.out" },
        "<" 
      );

      // 3. Code blocks type out inside the terminal to FILL the screen!
      // This is separated from the master timeline and given its own scroll trigger
      // so it maps 1:1 with the scroll wheel like the grid boxes!
      gsap.fromTo(".tech-pill", 
        { opacity: 0, scale: 0 },
        {
          opacity: 1, 
          scale: 1,
          stagger: 0.1,
          duration: 0.05, // Fast duration relative to stagger makes them strictly sequential
          ease: "back.out(2)", // Give each one a satisfying physical "pop"
          scrollTrigger: { 
            trigger: ".windows-screen-container", 
            start: "top 70%", 
            end: "bottom 30%", 
            scrub: true
          }
        }
      );

      // Infinite code stream scroll in the background
      gsap.to(".code-stream", { y: "-50%", duration: 100, repeat: -1, ease: "none" });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-[#020202] text-white py-24 sm:py-32 px-6 sm:px-12 md:px-16 lg:px-20 relative overflow-hidden flex flex-col justify-center"
    >
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.05] flex justify-center">
        <div className="code-stream whitespace-pre mono text-[10px] sm:text-xs leading-[2] tracking-widest text-white/50">
          {CODE_SNIPPET}
        </div>
      </div>

      <div className="max-w-[1200px] w-full mx-auto relative z-10 flex flex-col items-center justify-center pt-20">
        <div className="text-center mb-12 sm:mb-16 pipeline-text-block opacity-0">
          <p className="mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/40 mb-6 font-medium">Technology</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-light text-white leading-[1.05] mb-6 tracking-tight balance-text mx-auto max-w-4xl" style={{ fontFamily: "var(--font-alliance)" }}>
            Powering the Build Pipeline
          </h2>
          <p className="text-lg sm:text-xl text-white/50 leading-relaxed mx-auto max-w-2xl" style={{ fontFamily: "var(--font-alliance)" }}>
            A massive AI‑powered development pipeline flawlessly integrating product design, deep engineering, and global deployment at unprecedented speed.
          </p>
        </div>
        
        <div className="relative w-full max-w-5xl [perspective:2000px] windows-screen-container opacity-0">
          
          {/* The Windows Terminal */}
          <div className="relative w-full aspect-[16/10] bg-[#0a0a0a] rounded-xl border border-[#2a2a2a] shadow-[0_50px_100px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col">
            
            {/* Glass Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none z-20 transform -translate-x-1/2" />

            {/* macOS / Sleek Terminal Header */}
            <div className="h-8 sm:h-12 bg-[#1c1c1c] w-full flex items-center px-4 sm:px-6 border-b border-white/5 shrink-0 z-10 relative">
              {/* Mac Window Controls */}
              <div className="flex items-center gap-2 absolute left-4 sm:left-6">
                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#27c93f]" />
              </div>
              
              {/* Centered Title */}
              <div className="w-full flex justify-center pointer-events-none">
                <div className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                  <span className="text-[10px] sm:text-xs mono text-white/50 tracking-wide font-medium">pipeline — -bash — 80x24</span>
                </div>
              </div>
            </div>

            {/* Screen Content - Dark Mode Terminal / Grid */}
            <div className="flex-1 bg-[#050505] p-6 sm:p-12 relative overflow-hidden flex flex-wrap content-start gap-3 sm:gap-4 z-10">
              {/* Subtle grid on the screen background */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              
              {/* Tech Pills inside the screen */}
              {[
                "Rust", "Go", "Python", "TypeScript", "C++", "CUDA", "OpenCL", "PyTorch", 
                "TensorFlow", "JAX", "Hugging Face", "Claude Opus 4.8", "GPT-5.5", "DeepSeek R1", 
                "Llama 3.2", "Mixtral 8x22B", "LangChain", "LlamaIndex", "Mastra", "AutoGen", 
                "CrewAI", "LangGraph", "DSPy", "Pinecone", "Milvus", "Qdrant", "Weaviate", 
                "pgvector", "Turbopuffer", "Chroma", "Redis", "PostgreSQL", "MySQL", "Supabase", 
                "Firebase", "MongoDB", "Kafka", "RabbitMQ", "NATS", "Celery", "BullMQ", "Next.js", 
                "React", "Svelte", "Vue", "TailwindCSS", "Framer Motion", "WebGL", "Three.js", 
                "Vercel AI SDK", "FastAPI", "Express", "NestJS", "Spring Boot", "Actix Web", 
                "Axum", "Tonic", "gRPC", "GraphQL", "WebSockets", "WebRTC"
              ].map((t) => (
                <button 
                  key={t} 
                  className="tech-pill opacity-0 mono text-[10px] sm:text-sm tracking-[0.1em] px-3 sm:px-5 py-1.5 sm:py-2.5 border font-medium rounded-sm backdrop-blur-sm border-white/10 text-white/50 bg-white/[0.02]"
                >
                  {t}
                </button>
              ))}
              
              {/* Blinking cursor at the end */}
              <span className="w-2 sm:w-3 h-4 sm:h-6 bg-white/70 animate-pulse self-end ml-1 mb-1 sm:mb-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 7 - CTA
   ══════════════════════════════════════════════ */
function CTASection() {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Basic reveals
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 80%", once: true } });
      });

      // Word by word reveal for headline
      gsap.fromTo(".cta-word", 
        { opacity: 0, y: 20, filter: "blur(10px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-headline",
            start: "top 75%",
            once: true
          }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#030303] text-white py-32 sm:py-48 px-6 sm:px-12 md:px-16 lg:px-20 relative overflow-hidden">
      
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-white/[0.015] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1000px] mx-auto text-center relative z-10">
        <p className="reveal-up opacity-0 translate-y-10 mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-white/40 mb-10 font-medium">Start building</p>
        <h2 className="cta-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-10 tracking-tight balance-text" style={{ fontFamily: "var(--font-alliance)" }}>
          {["Ready", "to", "Ship", "Your", "Next", "AI-Powered", "Product?"].map((word, i) => (
            <span key={i} className="cta-word inline-block mr-3 sm:mr-4 lg:mr-5">
              {word}
            </span>
          ))}
        </h2>
        <p className="reveal-up text-lg sm:text-xl md:text-2xl text-white/40 max-w-3xl mx-auto mb-16 leading-relaxed" style={{ fontFamily: "var(--font-alliance)" }}>
          We run a free discovery sprint to find the highest-leverage automation in your business - and ship a working proof-of-concept within the first week.
        </p>
        <div className="reveal-up flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="mailto:aryan@athreix.com" className="nav-btn mono text-xs uppercase tracking-widest border border-white/30 px-12 py-5 hover:text-black transition-all duration-500 bg-white/5 font-medium rounded-sm">
            <span className="nav-btn-bg !bg-white rounded-sm" />
            <span className="relative z-10">Book a Sprint</span>
          </a>
          <a href="https://wa.me/919322973362" target="_blank" rel="noopener noreferrer" className="mono text-xs uppercase tracking-widest text-white/50 hover:text-white border border-white/10 hover:border-white/40 hover:bg-white/5 px-12 py-5 transition-all duration-300 font-medium rounded-sm">
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════ */
export default function Home() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="grid-overlay" />
      <main>
        <HeroSection />
        <AboutSection />
        <CapabilitiesSection />
        <ServicesSection />
        <ProcessSection />
        <PipelineSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
