import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar } from "lucide-react";
import Reveal from "../Reveal";
import { blog } from "../../mock";

export default function Blog() {
  return (
    <section id="blog" className="bg-cream-100 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-brand font-semibold tracking-[0.2em] text-sm mb-4">{blog.eyebrow}</span>
          <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl leading-tight">{blog.title}</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {blog.items.map((b, i) => (
            <Reveal key={b.title} delay={i * 100}>
              <article className="group rounded-3xl overflow-hidden bg-white ring-1 ring-black/5 hover:shadow-xl transition-shadow">
                <div className="relative h-56 overflow-hidden">
                  <img src={b.image} alt={b.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute top-4 left-4 bg-brand text-white text-xs font-semibold px-3 py-1.5 rounded-full">{b.category}</span>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-2 text-sm text-mute"><Calendar className="h-4 w-4 text-brand" />{b.date}</div>
                  <h3 className="mt-3 font-heading font-bold text-xl text-ink group-hover:text-brand transition-colors leading-snug">{b.title}</h3>
                  <Link to="/fixhome#blog" className="inline-flex items-center gap-2 mt-5 font-semibold text-ink group-hover:text-brand transition-colors">
                    Read More <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
