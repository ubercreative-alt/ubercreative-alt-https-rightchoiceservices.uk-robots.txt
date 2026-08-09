import React from "react";
import CountUp from "../CountUp";
import Reveal from "../Reveal";
import { CheckCircle2 } from "lucide-react";
import { processStats } from "../../mock";

export default function ProcessDark() {
  return (
    <section className="relative bg-ink text-white py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "28px 28px" }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <span className="inline-block text-brand-400 font-semibold tracking-[0.2em] text-sm mb-4">{processStats.eyebrow}</span>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl leading-tight">{processStats.title}</h2>
            <ul className="mt-8 space-y-4">
              {processStats.steps.map((s) => (
                <li key={s} className="flex items-center gap-3 text-white/85 text-lg">
                  <CheckCircle2 className="h-6 w-6 text-brand-400 shrink-0" /> {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="grid grid-cols-2 gap-5">
            <div className="col-span-2 grid grid-cols-2 gap-5">
              <img src={processStats.images[0]} alt="Renovation in progress" loading="lazy" decoding="async" className="rounded-2xl h-44 w-full object-cover" />
              <img src={processStats.images[1]} alt="Craftsman at work" loading="lazy" decoding="async" className="rounded-2xl h-44 w-full object-cover" />
            </div>
            {processStats.stats.map((st) => (
              <div key={st.label} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
                <div className="font-heading font-extrabold text-4xl text-brand-400"><CountUp value={st.value} /></div>
                <div className="mt-1 text-white/70 text-sm">{st.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
