import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Users, CalendarCheck } from "lucide-react";
import Reveal from "../Reveal";
import { about } from "../../mock";

const pointIcons = [Users, CalendarCheck];

export default function TrustedExperts() {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal className="relative" variant="left">
          <div className="relative rounded-3xl overflow-hidden">
            <img src={about.image} alt="Trusted renovation experts" className="w-full h-[520px] object-cover" />
          </div>
          {/* Experience badge */}
          <div className="absolute -bottom-6 left-6 bg-brand text-white rounded-2xl px-8 py-6 shadow-xl">
            <div className="font-heading font-extrabold text-5xl leading-none">{about.experience.value}<span className="text-brand-100">{about.experience.suffix}</span></div>
            <div className="mt-2 text-sm text-white/85">{about.experience.label}</div>
          </div>
        </Reveal>

        <Reveal variant="right">
          <span className="inline-block text-brand font-semibold tracking-[0.2em] text-sm mb-4">{about.eyebrow}</span>
          <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl leading-tight">{about.title}</h2>
          <p className="mt-6 text-mute text-[17px] leading-relaxed">{about.text}</p>

          <div className="grid sm:grid-cols-2 gap-6 mt-9">
            {about.points.map((p, i) => {
              const Ic = pointIcons[i % pointIcons.length];
              return (
                <div key={p.title} className="flex items-start gap-4">
                  <span className="grid place-items-center h-12 w-12 rounded-xl bg-brand/10 text-brand shrink-0"><Ic className="h-6 w-6" /></span>
                  <div>
                    <h4 className="font-heading font-bold text-ink text-lg">{p.title}</h4>
                    <p className="text-sm text-mute mt-1">{p.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link to="/about" className="inline-flex items-center gap-3 mt-10 bg-ink text-white pl-6 pr-2 py-2.5 rounded-full font-semibold hover:bg-brand transition-colors group">
            More About Us
            <span className="grid place-items-center h-9 w-9 rounded-full bg-brand text-white group-hover:bg-white group-hover:text-brand transition-colors"><ArrowUpRight className="h-5 w-5" /></span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
