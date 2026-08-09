import React from "react";
import { Star, Quote } from "lucide-react";
import Reveal from "../Reveal";
import { testimonials } from "../../mock";

export default function Testimonials() {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-brand font-semibold tracking-[0.2em] text-sm mb-4">{testimonials.eyebrow}</span>
          <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl leading-tight">{testimonials.title}</h2>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-6 mt-14 items-stretch">
          {/* Rating summary */}
          <Reveal className="lg:col-span-1">
            <div className="h-full rounded-3xl bg-ink text-white p-9 flex flex-col justify-center">
              <div className="font-heading font-extrabold text-6xl text-brand-400">{testimonials.rating}</div>
              <div className="flex items-center gap-1 mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-brand-400 text-brand-400" />
                ))}
              </div>
              <p className="mt-4 text-white/70">{testimonials.totalReviews}</p>
              <p className="mt-1 text-white/50 text-sm">Verified customer reviews</p>
            </div>
          </Reveal>

          {/* Two review cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {testimonials.items.slice(0, 2).map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <div className="h-full rounded-3xl bg-white ring-1 ring-black/5 p-8 shadow-sm hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: t.rating }).map((_, k) => (
                        <Star key={k} className="h-4 w-4 fill-brand text-brand" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-brand/20" />
                  </div>
                  <p className="mt-5 text-ink/80 leading-relaxed">{t.text}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="grid place-items-center h-11 w-11 rounded-full bg-brand text-white font-heading font-bold">{t.name.charAt(0)}</span>
                    <div>
                      <div className="font-heading font-bold text-ink">{t.name}</div>
                      <div className="text-sm text-mute">{t.role}</div>
                    </div>
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
