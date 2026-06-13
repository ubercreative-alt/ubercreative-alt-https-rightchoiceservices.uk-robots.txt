import { Check, Play, ArrowRight } from "lucide-react";
import { APPROACH } from "@/data/content";
import { ICON_MD, ICON_SM } from "@/constants/ui";

export const Approach = () => (
  <section data-testid="approach-section" className="bg-[var(--rc-paper)] py-24 lg:py-32 relative overflow-hidden">
    <div className="absolute -right-32 top-10 w-96 h-96 rounded-full bg-[var(--rc-lavender)]/15" />
    <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
      <div className="relative rounded-[2rem] overflow-hidden group cursor-pointer">
        <img src={APPROACH.image} alt="Our team working together" className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid place-items-center w-16 h-16 rounded-full bg-white text-[var(--rc-indigo-700)] shadow-xl">
            <Play size={ICON_MD} fill="currentColor" />
          </span>
        </span>
      </div>

      <div>
        <p className="rc-label text-[var(--rc-indigo-600)]">
          <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
          {APPROACH.label}
        </p>
        <h2 className="rc-h2 mt-4" data-testid="approach-title">{APPROACH.title}</h2>
        <p className="mt-5 text-[var(--rc-ink-soft)] leading-relaxed">{APPROACH.description}</p>

        <div className="mt-8 grid sm:grid-cols-2 gap-7">
          {APPROACH.points.map((point) => (
            <div key={point.title} className="flex gap-3.5">
              <span className="mt-1 shrink-0">
                <Check size={ICON_MD} className="text-[var(--rc-indigo-500)]" strokeWidth={3} />
              </span>
              <div>
                <h4 className="font-heading font-bold text-[var(--rc-ink)]">{point.title}</h4>
                <p className="mt-1.5 text-sm text-[var(--rc-ink-soft)] leading-relaxed">{point.text}</p>
              </div>
            </div>
          ))}
        </div>

        <a href="/services" className="rc-btn-pill mt-9 inline-flex" data-testid="approach-learn-more">
          Learn More <ArrowRight size={ICON_SM} />
        </a>
      </div>
    </div>
  </section>
);
