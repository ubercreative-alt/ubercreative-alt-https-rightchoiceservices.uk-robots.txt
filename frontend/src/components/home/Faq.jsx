import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Reveal from "../Reveal";
import { faqs } from "../../mock";

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="bg-ink text-white py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal className="rounded-3xl overflow-hidden" variant="left">
          <img src={faqs.image} alt="Renovation planning" className="w-full h-[480px] object-cover" />
        </Reveal>

        <Reveal variant="right">
          <span className="inline-block text-brand-400 font-semibold tracking-[0.2em] text-sm mb-4">{faqs.eyebrow}</span>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl leading-tight">{faqs.title}</h2>
          <div className="mt-8 space-y-4">
            {faqs.items.map((f, i) => {
              const active = openIdx === i;
              return (
                <div key={f.q} className={`rounded-2xl overflow-hidden transition-colors ${active ? "bg-brand" : "bg-white/5 ring-1 ring-white/10"}`}>
                  <button onClick={() => setOpenIdx(active ? -1 : i)} className="w-full flex items-center justify-between gap-4 text-left px-6 py-5">
                    <span className="font-heading font-semibold text-lg">{f.q}</span>
                    <span className="grid place-items-center h-8 w-8 rounded-full bg-white/20 shrink-0">
                      {active ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ${active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-white/85 leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
