import React from "react";
import Reveal from "../Reveal";
import BeforeAfterSlider from "../BeforeAfterSlider";
import { realProjects } from "../../mock";

export default function RealProjects() {
  return (
    <section id="projects" className="bg-cream-100 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-brand font-semibold tracking-[0.2em] text-sm mb-4">{realProjects.eyebrow}</span>
          <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl leading-tight">{realProjects.title}</h2>
          <p className="mt-4 text-mute">{realProjects.subtitle}</p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-6">
          {realProjects.items.map((p, i) => (
            <Reveal key={p.title} delay={i * 120} variant={i % 2 ? "right" : "left"}>
              <div className="rounded-3xl overflow-hidden bg-white ring-1 ring-black/5 p-4">
                <BeforeAfterSlider before={p.before} after={p.after} className="h-[320px] md:h-[380px]" />
                <div className="flex items-center justify-between px-2 pt-4 pb-1">
                  <h3 className="font-heading font-bold text-xl text-ink">{p.title}</h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand bg-brand/10 px-3 py-1.5 rounded-full">{p.category}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mt-6">
          {realProjects.gallery.map((g, i) => (
            <Reveal key={g.title} delay={i * 110} variant="zoom">
              <div className="group relative rounded-3xl overflow-hidden h-[300px]">
                <img src={g.image} alt={g.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="text-brand-400 text-xs font-semibold tracking-wider uppercase">{g.category}</span>
                  <h3 className="font-heading font-bold text-xl mt-1">{g.title}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
