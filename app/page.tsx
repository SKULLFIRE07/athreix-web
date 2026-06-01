"use client";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Platforms from "./components/Platforms";
import Missions from "./components/Missions";
import Feature from "./components/Feature";
import Technology from "./components/Technology";
import Careers from "./components/Careers";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import GlowTracker from "./components/GlowTracker";

const marqueeItems = [
  "25+ PROJECTS DELIVERED",
  "$45K+ ACCRUED REVENUE",
  "$1M ON TRACK THIS YEAR",
  "99.9% UPTIME",
  "24/7 OPERATIONS",
  "<72H TO DEPLOY",
];

function StatsMarquee() {
  const track = marqueeItems.map((item, i) => (
    <span key={i} className="flex items-center gap-6 shrink-0">
      <span>{item}</span>
      <span className="text-[var(--lava-300)]/40">◆</span>
    </span>
  ));

  return (
    <div className="stats-bar py-4 overflow-hidden relative border-y border-white/10">
      <div className="flex gap-6 whitespace-nowrap ticker-track mono text-[10px] tracking-[0.3em] text-white/45">
        {track}
        {track}
        {track}
        {track}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <GlowTracker />
      <Nav />
      <main className="flex-1">
        <Hero />
        <StatsMarquee />
        <div className="section-divider" />
        <Platforms />
        <div className="section-divider" />
        <Missions />
        <div className="section-divider" />
        <Feature />
        <div className="section-divider" />
        <Technology />
        <div className="section-divider" />
        <Careers />
      </main>
      <Footer />
    </>
  );
}
