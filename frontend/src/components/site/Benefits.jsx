import { Home, PhoneCall, KeyRound, Footprints, ShieldCheck, Route } from "lucide-react";
import { BENEFITS } from "@/data/content";
import { ICON_LG } from "@/constants/ui";

const ICONS = { Home, PhoneCall, KeyRound, Footprints, ShieldCheck, Route };

export const Benefits = () => (
  <section data-testid="benefits-section" className="bg-[var(--rc-indigo-800)] py-24 lg:py-32 relative overflow-hidden">
    <div className="absolute -left-24 bottom-0 w-80 h-80 rounded-full bg-white/[0.04]" />
    <div className="absolute right-10 -top-20 w-72 h-72 rounded-full bg-white/[0.04]" />

    <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-[1fr_1.5fr] gap-14 items-stretch">
      <img
        src={BENEFITS.image}
        alt="Supporting young people"
        className="rounded-[2rem] w-full h-full min-h-[420px] object-cover"
      />

      <div>
        <p className="rc-label text-[var(--rc-lavender)]">
          <span className="rc-label-line bg-[var(--rc-lavender)]" />
          {BENEFITS.label}
        </p>
        <h2 className="rc-h2 mt-4 text-white" data-testid="benefits-title">{BENEFITS.title}</h2>
        <p className="mt-4 text-white/70 leading-relaxed max-w-2xl">{BENEFITS.description}</p>

        <div className="mt-10 rounded-3xl bg-[var(--rc-indigo-700)] p-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-9">
          {BENEFITS.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div key={item.title} data-testid="benefit-item">
                <Icon size={ICON_LG} className="text-[var(--rc-lavender)]" strokeWidth={1.6} />
                <h4 className="mt-4 font-heading font-bold text-white text-[15px]">{item.title}</h4>
                <p className="mt-1.5 text-[13px] text-white/60 leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);
