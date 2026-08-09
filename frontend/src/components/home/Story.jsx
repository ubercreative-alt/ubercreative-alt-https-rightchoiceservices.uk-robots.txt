import React from "react";
import CountUp from "../CountUp";
import Reveal from "../Reveal";
import { story } from "../../mock";

export default function Story() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img src={story.image} alt="Renovation story" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/80" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
        <Reveal className="max-w-2xl">
          <span className="inline-block text-brand-400 font-semibold tracking-[0.2em] text-sm mb-4">{story.eyebrow}</span>
          <h2 className="font-heading font-extrabold text-4xl md:text-6xl leading-[1.05]">{story.title}</h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-10 sm:gap-16 mt-12">
          {story.stats.map((st, i) => (
            <Reveal key={st.label} delay={i * 120}>
              <div className="font-heading font-extrabold text-5xl md:text-6xl text-brand-400"><CountUp value={st.value} delay={i * 350} /></div>
              <div className="mt-2 text-white/80">{st.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
