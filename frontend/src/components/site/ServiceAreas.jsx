import { Check } from "lucide-react";
import { AREAS } from "@/data/content";

const AreaCard = ({ area }) => {
  const featured = Boolean(area.tag);
  return (
    <div
      data-testid="area-card"
      className={`relative rounded-3xl p-9 flex flex-col transition-transform duration-300 hover:-translate-y-1.5 ${
        featured
          ? "bg-[var(--rc-indigo-800)] shadow-2xl shadow-[var(--rc-indigo-800)]/30 lg:-mt-4 lg:mb-[-1rem]"
          : "bg-white shadow-sm"
      }`}
    >
      {featured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[var(--rc-lavender)] text-[var(--rc-indigo-900)] text-[11px] font-bold uppercase tracking-[0.16em] px-5 py-1.5">
          {area.tag}
        </span>
      )}
      <h3 className={`font-heading font-bold text-2xl ${featured ? "text-white" : "text-[var(--rc-ink)]"}`}>
        {area.name}
      </h3>
      <p className={`mt-3 text-sm leading-relaxed ${featured ? "text-white/70" : "text-[var(--rc-ink-soft)]"}`}>
        {area.text}
      </p>
      <ul className={`mt-7 space-y-3.5 flex-1 pt-7 border-t border-dashed ${featured ? "border-white/20" : "border-[var(--rc-lavender)]/40"}`}>
        {area.features.map((feature) => (
          <li key={feature} className={`flex items-start gap-3 text-sm ${featured ? "text-white/85" : "text-[var(--rc-ink-soft)]"}`}>
            <Check size={16} className={`mt-0.5 shrink-0 ${featured ? "text-[var(--rc-lavender)]" : "text-[var(--rc-indigo-500)]"}`} strokeWidth={3} />
            {feature}
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        data-testid="area-referral-btn"
        className={`mt-9 inline-flex justify-center rounded-full px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] transition-all duration-300 ${
          featured
            ? "bg-gradient-to-r from-[var(--rc-lavender)] to-[var(--rc-indigo-500)] text-white hover:shadow-lg"
            : "border-2 border-[var(--rc-indigo-600)] text-[var(--rc-indigo-600)] hover:bg-[var(--rc-indigo-600)] hover:text-white"
        }`}
      >
        Make a Referral
      </a>
    </div>
  );
};

export const ServiceAreas = () => (
  <section id="areas" data-testid="areas-section" className="bg-[var(--rc-paper)] py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="text-center max-w-2xl mx-auto">
        <p className="rc-label justify-center text-[var(--rc-indigo-600)]">
          <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
          {AREAS.label}
        </p>
        <h2 className="rc-h2 mt-4" data-testid="areas-title">{AREAS.title}</h2>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-7 items-stretch">
        {AREAS.items.map((area) => (
          <AreaCard key={area.name} area={area} />
        ))}
      </div>
    </div>
  </section>
);
