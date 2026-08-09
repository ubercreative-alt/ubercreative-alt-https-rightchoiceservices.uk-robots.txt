import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play, CheckCircle2 } from "lucide-react";
import CountUp from "../CountUp";
import { hero } from "../../mock";

export default function Hero() {
  return (
    <section className="relative min-h-[760px] lg:min-h-[820px] flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={hero.bg} alt="Renovation professional at work" fetchPriority="high" decoding="async" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/60 to-ink/30" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 pt-40">
        <div className="max-w-2xl">
          <span className="inline-block text-brand-400 font-semibold tracking-[0.2em] text-sm mb-5 animate-fade-up" style={{ animationDelay: "60ms", animationFillMode: "both" }}>{hero.eyebrow}</span>
          <h1 className="font-heading font-extrabold text-white text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
            {hero.title.split(" ").map((word, i) => (
              <span
                key={i}
                className="inline-block mr-[0.22em] animate-fade-up"
                style={{ animationDelay: `${180 + i * 85}ms`, animationFillMode: "both" }}
              >
                {word}
              </span>
            ))}
          </h1>
          <div className="flex items-center gap-4 mt-9 animate-fade-up" style={{ animationDelay: `${180 + hero.title.split(" ").length * 85 + 120}ms`, animationFillMode: "both" }}>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-white text-ink pl-6 pr-2 py-2.5 rounded-full font-semibold hover:bg-brand hover:text-white transition-colors group">
              Contact Us
              <span className="grid place-items-center h-9 w-9 rounded-full bg-brand text-white group-hover:bg-white group-hover:text-brand transition-colors"><ArrowUpRight className="h-5 w-5" /></span>
            </Link>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="Watch video" className="grid place-items-center h-14 w-14 rounded-full bg-brand text-white hover:scale-105 transition-transform ring-4 ring-white/20">
              <Play className="h-5 w-5 fill-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Floating stat card */}
      <div className="hidden lg:flex absolute right-8 bottom-24 z-10 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 bg-white">
        <div className="bg-brand text-white p-7 flex flex-col justify-center w-44">
          <span className="font-heading font-extrabold text-5xl"><CountUp value={hero.stat.value} /></span>
          <span className="mt-2 text-white/85 text-sm">{hero.stat.label}</span>
          <span className="mt-4 inline-flex items-center gap-1 text-xs text-white/80"><CheckCircle2 className="h-4 w-4" /> Guaranteed</span>
        </div>
        <img src={hero.card} alt="Completed project" loading="lazy" decoding="async" className="w-52 h-full object-cover" />
      </div>
    </section>
  );
}
