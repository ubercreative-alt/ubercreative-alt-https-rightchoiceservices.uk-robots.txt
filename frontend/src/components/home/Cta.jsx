import React from "react";
import { Link } from "react-router-dom";
import { Phone, ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";
import { brand } from "../../mock";

export default function Cta() {
  return (
    <section className="bg-cream pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-brand text-white px-8 md:px-14 py-14 md:py-16">
            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10" />
            <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-white/5" />
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div>
                <span className="font-semibold tracking-[0.2em] text-sm text-white/80">READY TO START?</span>
                <h2 className="font-heading font-extrabold text-3xl md:text-5xl mt-3 leading-tight max-w-2xl">Let's Transform Your Home Into Something Extraordinary</h2>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <a href={`tel:${brand.phone}`} className="inline-flex items-center gap-3">
                  <span className="grid place-items-center h-14 w-14 rounded-full bg-white/20"><Phone className="h-6 w-6" /></span>
                  <span>
                    <span className="block text-white/70 text-sm">Call Us Anytime</span>
                    <span className="block font-heading font-bold text-xl">{brand.phone}</span>
                  </span>
                </a>
                <Link to="/contact" className="inline-flex items-center gap-3 bg-white text-brand pl-6 pr-2 py-2.5 rounded-full font-semibold hover:bg-ink hover:text-white transition-colors group whitespace-nowrap">
                  Get A Free Quote
                  <span className="grid place-items-center h-9 w-9 rounded-full bg-brand text-white group-hover:bg-white group-hover:text-ink transition-colors"><ArrowUpRight className="h-5 w-5" /></span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
