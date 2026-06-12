import { ArrowUpRight } from "lucide-react";
import { PILLARS } from "@/data/content";

export const SupportPillars = () => (
  <section data-testid="pillars-section" className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
        <div>
          <p className="rc-label text-[var(--rc-indigo-600)]">
            <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
            {PILLARS.label}
          </p>
          <h2 className="rc-h2 mt-4" data-testid="pillars-title">{PILLARS.title}</h2>
        </div>
        <p className="text-[var(--rc-ink-soft)] leading-relaxed lg:pb-2">{PILLARS.description}</p>
      </div>

      <div className="mt-14 grid md:grid-cols-2 gap-7">
        {PILLARS.items.map((item) => (
          <article
            key={item.title}
            data-testid="pillar-card"
            className="group relative rounded-3xl overflow-hidden h-[340px] cursor-default"
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--rc-indigo-900)]/95 via-[var(--rc-indigo-900)]/35 to-[var(--rc-indigo-900)]/10" />
            <span className="absolute top-0 right-0 rounded-bl-3xl bg-[var(--rc-lavender)] text-[var(--rc-indigo-900)] text-[11px] font-bold uppercase tracking-[0.18em] px-6 py-3">
              {item.badge}
            </span>
            <span className="absolute top-5 left-5 grid place-items-center w-12 h-12 rounded-full border border-white/40 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[var(--rc-indigo-800)]">
              <ArrowUpRight size={20} />
            </span>
            <div className="absolute inset-x-0 bottom-0 p-7">
              <h3 className="font-heading font-bold text-white text-xl">{item.title}</h3>
              <p className="mt-2 text-sm text-white/75 leading-relaxed max-w-md">{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
