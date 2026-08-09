import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { images } from "../mock";

export default function PageHeader({ title, crumbs = [] }) {
  return (
    <section className="relative pt-44 pb-20 overflow-hidden">
      <div className="absolute inset-0">
        <img src={images.reno2} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/85" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <h1 className="font-heading font-extrabold text-4xl md:text-6xl">{title}</h1>
        <div className="mt-5 flex items-center justify-center gap-2 text-sm text-white/70">
          <Link to="/fixhome" className="hover:text-brand-400">Home</Link>
          {crumbs.map((c) => (
            <span key={c} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-brand-400" />
              <span className="text-brand-400">{c}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
