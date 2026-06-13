import { Check, Play, HeartPulse, ArrowRight } from "lucide-react";
import { WHO_WE_ARE } from "@/data/content";
import { ICON_SM } from "@/constants/ui";

const SupportMediaRow = () => (
  <div className="mt-8 grid sm:grid-cols-[1.2fr_1fr] gap-5">
    <div className="rounded-2xl bg-[var(--rc-indigo-800)] p-6 flex gap-4 items-start">
      <span className="grid place-items-center w-11 h-11 rounded-full border border-white/25 shrink-0">
        <HeartPulse size={20} className="text-[var(--rc-lavender)]" />
      </span>
      <div>
        <h4 className="font-heading font-bold text-white">{WHO_WE_ARE.cardTitle}</h4>
        <p className="mt-1.5 text-sm text-white/70">{WHO_WE_ARE.cardText}</p>
      </div>
    </div>
    <div className="relative rounded-2xl overflow-hidden group cursor-pointer min-h-[130px]">
      <img
        src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=700&q=60"
        alt="Team planning support"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid place-items-center w-14 h-14 rounded-full bg-[var(--rc-indigo-600)] text-white shadow-lg">
          <Play size={20} fill="currentColor" />
        </span>
      </span>
    </div>
  </div>
);

const CheckList = ({ items }) => (
  <ul className="mt-8 space-y-3">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3 text-[var(--rc-ink-soft)]">
        <Check size={18} className="text-[var(--rc-indigo-600)] mt-0.5 shrink-0" />
        <span className="text-sm leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

export const WhoWeAre = () => (
  <section id="about" data-testid="about-section" className="bg-[var(--rc-paper)] py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1100&q=70"
          alt="Support worker talking with a young person"
          className="rounded-[2rem] w-full h-[560px] object-cover shadow-xl shadow-[var(--rc-indigo-900)]/10"
        />
        <div className="absolute -bottom-6 -right-6 hidden md:block w-40 h-40 rounded-full bg-[var(--rc-lavender)]/25 -z-0" />
      </div>

      <div>
        <p className="rc-label text-[var(--rc-indigo-600)]">
          <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
          {WHO_WE_ARE.label}
        </p>
        <h2 className="rc-h2 mt-4" data-testid="about-title">{WHO_WE_ARE.title}</h2>
        <p className="mt-5 text-[var(--rc-ink-soft)] leading-relaxed">{WHO_WE_ARE.description}</p>

        <blockquote className="mt-6 border-l-4 border-[var(--rc-lavender)] pl-5 italic text-[var(--rc-ink-soft)]">
          “{WHO_WE_ARE.quote}”
        </blockquote>

        <SupportMediaRow />
        <CheckList items={WHO_WE_ARE.checks} />

        <a href="/services" className="rc-btn-pill mt-9 inline-flex" data-testid="about-learn-more">
          Learn More <ArrowRight size={ICON_SM} />
        </a>
      </div>
    </div>
  </section>
);
