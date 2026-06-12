import { ArrowUpRight, ArrowRight } from "lucide-react";
import { HERO } from "@/data/content";

const HeroServiceCards = () => (
  <div
    data-testid="hero-services-card"
    className="rc-fade-up rounded-3xl bg-white/10 backdrop-blur-xl border border-white/15 p-8 lg:p-10 shadow-2xl shadow-black/20"
    style={{ animationDelay: "150ms" }}
  >
    {HERO.cards.map((card, i) => (
      <div key={card.title} className={`group ${i > 0 ? "pt-7 mt-7 border-t border-dashed border-white/25" : ""}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-white text-lg">{card.title}</h3>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">{card.text}</p>
          </div>
          <ArrowUpRight size={22} className="shrink-0 text-[var(--rc-lavender)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    ))}
  </div>
);

const HeroContent = () => (
  <div className="rc-fade-up">
    <p className="rc-label text-[var(--rc-lavender)]" data-testid="hero-tagline">
      <span className="rc-label-line bg-[var(--rc-lavender)]" />
      {HERO.tagline}
    </p>
    <h1 className="mt-5 font-heading font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.08] capitalize" data-testid="hero-title">
      {HERO.title}
    </h1>
    <p className="mt-6 max-w-xl text-white/80 text-base leading-relaxed">{HERO.description}</p>
    <div className="mt-9 flex flex-wrap items-center gap-6">
      <a href="/referrals" className="rc-btn-pill" data-testid="hero-primary-cta">
        {HERO.primaryCta}
      </a>
      <a
        href="#services"
        data-testid="hero-secondary-cta"
        className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] text-white hover:text-[var(--rc-lavender)] transition-colors"
      >
        {HERO.secondaryCta} <ArrowRight size={16} />
      </a>
    </div>
  </div>
);

export const Hero = () => (
  <section id="home" data-testid="hero-section" className="relative min-h-[92vh] flex items-center overflow-hidden bg-[var(--rc-indigo-900)]">
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1920&q=70"
        alt="Young people being supported"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--rc-indigo-900)]/95 via-[var(--rc-indigo-800)]/80 to-[var(--rc-indigo-700)]/60" />
    </div>
    <div className="relative mx-auto max-w-7xl px-6 lg:px-10 w-full pt-40 pb-28 grid lg:grid-cols-[1.25fr_1fr] gap-14 items-center">
      <HeroContent />
      <HeroServiceCards />
    </div>
  </section>
);
