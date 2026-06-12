import { PARTNERS, STATS } from "@/data/content";

const AVATARS = [
  "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&q=60",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=60",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=60",
];

const MARQUEE_COPIES = ["a", "b"];

export const PartnersStrip = () => (
  <section data-testid="partners-strip" className="grid lg:grid-cols-[2fr_1fr]">
    <div className="bg-[var(--rc-indigo-800)] relative overflow-hidden py-14 flex items-center">
      <div className="absolute -left-10 -top-16 w-64 h-64 rounded-full bg-white/5" />
      <div className="rc-marquee">
        <div className="rc-marquee-track">
          {MARQUEE_COPIES.flatMap((copy) =>
            PARTNERS.map((name) => (
              <span key={`${copy}-${name}`} className="mx-8 inline-flex items-center gap-8 font-heading font-bold text-xl text-white/85 whitespace-nowrap">
                {name}
                <span className="w-2 h-2 rounded-full bg-[var(--rc-lavender)]" />
              </span>
            ))
          )}
        </div>
      </div>
    </div>
    <div className="bg-[var(--rc-indigo-700)] py-12 px-10 flex flex-col justify-center" data-testid="partners-stat-block">
      <div className="flex items-center gap-4">
        <div className="flex -space-x-3">
          {AVATARS.map((src) => (
            <img key={src} src={src} alt="young person" className="w-11 h-11 rounded-full border-2 border-[var(--rc-indigo-700)] object-cover" />
          ))}
        </div>
        <p className="font-heading font-bold text-white text-4xl">
          {STATS.heroCount}
          <sup className="text-[var(--rc-lavender)] text-xl ml-0.5">+</sup>
        </p>
      </div>
      <h3 className="mt-4 font-heading font-bold text-white text-lg">{STATS.heroLabel}</h3>
      <p className="mt-1 text-sm text-white/65">{STATS.heroSub}</p>
    </div>
  </section>
);
