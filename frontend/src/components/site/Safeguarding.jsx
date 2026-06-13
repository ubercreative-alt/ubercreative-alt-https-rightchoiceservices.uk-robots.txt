import { Play, Sparkles } from "lucide-react";
import { SAFEGUARDING } from "@/data/content";
import { ICON_MD } from "@/constants/ui";

export const Safeguarding = () => (
  <section data-testid="safeguarding-section" className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
      <div className="relative rounded-[2rem] overflow-hidden group cursor-pointer order-2 lg:order-1">
        <img src={SAFEGUARDING.image} alt="One-to-one support session" className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid place-items-center w-16 h-16 rounded-full bg-[var(--rc-indigo-600)] text-white shadow-xl">
            <Play size={ICON_MD} fill="currentColor" />
          </span>
        </span>
      </div>

      <div className="order-1 lg:order-2">
        <p className="rc-label text-[var(--rc-indigo-600)]">
          <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
          {SAFEGUARDING.label}
        </p>
        <h2 className="rc-h2 mt-4" data-testid="safeguarding-title">{SAFEGUARDING.title}</h2>
        <p className="mt-5 text-[var(--rc-ink-soft)] leading-relaxed">{SAFEGUARDING.description}</p>

        <div className="mt-8 space-y-6">
          {SAFEGUARDING.bars.map((bar) => (
            <div key={bar.label} data-testid="safeguarding-bar">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[var(--rc-ink)]">{bar.label}</span>
                <span className="text-sm font-heading font-bold text-[var(--rc-indigo-600)]">{bar.value}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-[var(--rc-lavender)]/25 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--rc-lavender)] to-[var(--rc-indigo-600)]"
                  style={{ width: `${bar.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 flex gap-4 items-start rounded-2xl bg-[var(--rc-paper)] p-6 border border-[var(--rc-lavender)]/30">
          <span className="grid place-items-center w-11 h-11 rounded-full bg-[var(--rc-indigo-600)] text-white shrink-0">
            <Sparkles size={19} />
          </span>
          <div>
            <h4 className="font-heading font-bold text-[var(--rc-ink)]">{SAFEGUARDING.cardTitle}</h4>
            <p className="mt-1 text-sm text-[var(--rc-ink-soft)]">{SAFEGUARDING.cardText}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
