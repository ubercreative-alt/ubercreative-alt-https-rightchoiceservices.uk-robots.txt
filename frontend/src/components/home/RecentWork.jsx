import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";
import { projects } from "../../mock";

export default function RecentWork() {
  return (
    <section id="projects" className="bg-cream-100 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-block text-brand font-semibold tracking-[0.2em] text-sm mb-4">{projects.eyebrow}</span>
            <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl leading-tight">{projects.title}</h2>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-3 bg-ink text-white pl-6 pr-2 py-2.5 rounded-full font-semibold hover:bg-brand transition-colors group w-fit">
            View All Projects
            <span className="grid place-items-center h-9 w-9 rounded-full bg-brand text-white group-hover:bg-white group-hover:text-brand transition-colors"><ArrowUpRight className="h-5 w-5" /></span>
          </Link>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projects.items.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 90}>
              <Link to={`/projects/${p.slug}`} className="group relative rounded-3xl overflow-hidden h-[300px] block">
                <img src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div>
                    <span className="text-brand-400 text-xs font-semibold tracking-wider uppercase">{p.category}</span>
                    <h3 className="font-heading font-bold text-xl mt-1">{p.title}</h3>
                  </div>
                  <span className="grid place-items-center h-11 w-11 rounded-full bg-brand text-white shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><ArrowUpRight className="h-5 w-5" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
