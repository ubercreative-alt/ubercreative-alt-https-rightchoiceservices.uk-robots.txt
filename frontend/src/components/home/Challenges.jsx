import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "../Reveal";
import { challenges } from "../../mock";

export default function Challenges() {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal className="relative" variant="left">
          <div className="rounded-3xl overflow-hidden">
            <img src={challenges.image} alt="Modern construction" className="w-full h-[500px] object-cover" />
          </div>
          <div className="absolute top-6 -right-4 md:right-6 bg-ink text-white rounded-2xl px-7 py-5 shadow-xl">
            <div className="font-heading font-extrabold text-4xl leading-none">{challenges.badge.value}<span className="text-brand-400">{challenges.badge.suffix}</span></div>
            <div className="mt-1 text-sm text-white/70">{challenges.badge.label}</div>
          </div>
        </Reveal>

        <Reveal variant="right">
          <span className="inline-block text-brand font-semibold tracking-[0.2em] text-sm mb-4">{challenges.eyebrow}</span>
          <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl leading-tight">{challenges.title}</h2>
          <p className="mt-6 text-mute text-[17px] leading-relaxed">{challenges.text}</p>
          <ul className="mt-8 space-y-3">
            {challenges.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-ink">
                <span className="grid place-items-center h-6 w-6 rounded-full bg-brand text-white shrink-0"><Check className="h-4 w-4" /></span>
                {b}
              </li>
            ))}
          </ul>
          <Link to="/about" className="inline-flex items-center gap-3 mt-10 bg-brand text-white pl-6 pr-2 py-2.5 rounded-full font-semibold hover:bg-brand-600 transition-colors group">
            Discover More
            <span className="grid place-items-center h-9 w-9 rounded-full bg-white/20"><ArrowUpRight className="h-5 w-5" /></span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
