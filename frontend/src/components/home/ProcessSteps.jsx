import React from "react";
import Reveal from "../Reveal";
import { steps } from "../../mock";

export default function ProcessSteps() {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-brand font-semibold tracking-[0.2em] text-sm mb-4">{steps.eyebrow}</span>
          <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl leading-tight">{steps.title}</h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-14 items-center mt-14">
          <Reveal className="rounded-3xl overflow-hidden" variant="left">
            <img src={steps.image} alt="Our process" className="w-full h-[460px] object-cover" />
          </Reveal>

          <div className="space-y-5">
            {steps.items.map((s, i) => (
              <Reveal key={s.no} delay={i * 90}>
                <div className="group flex items-start gap-5 rounded-2xl bg-white ring-1 ring-black/5 p-6 hover:bg-ink hover:ring-ink transition-colors">
                  <span className="font-heading font-extrabold text-4xl text-brand shrink-0">{s.no}</span>
                  <div>
                    <h4 className="font-heading font-bold text-xl text-ink group-hover:text-white transition-colors">{s.title}</h4>
                    <p className="mt-1 text-mute group-hover:text-white/70 transition-colors">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
