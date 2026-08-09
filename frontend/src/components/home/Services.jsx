import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";
import { services } from "../../mock";

export default function Services() {
  return (
    <section className="bg-cream-100 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="max-w-2xl">
          <span className="inline-block text-brand font-semibold tracking-[0.2em] text-sm mb-4">{services.eyebrow}</span>
          <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl leading-tight">{services.title}</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          {services.items.map((s, i) => (
            <Reveal key={s.slug} delay={i * 130} variant="zoom">
              <Link to={`/services/${s.slug}`} className="group block relative rounded-3xl overflow-hidden h-[340px]">
                <img src={s.image} alt={s.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <span className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-brand mb-4 w-fit opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading font-bold text-2xl">{s.title}</h3>
                  <p className="mt-2 text-white/80 text-sm max-w-md">{s.desc}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
