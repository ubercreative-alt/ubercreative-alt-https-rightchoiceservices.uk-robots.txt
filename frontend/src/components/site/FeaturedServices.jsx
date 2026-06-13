import { ArrowRight, Home, ClipboardList, Users } from "lucide-react";
import { SERVICES } from "@/data/content";

const ICONS = { Home, ClipboardList, Users };

export const FeaturedServices = () => (
  <section id="services" data-testid="services-section" className="relative py-24 lg:py-32 overflow-hidden">
    <div className="absolute inset-0">
      <img src={SERVICES.bgImage} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[var(--rc-indigo-900)]/92" />
    </div>

    <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
      <div className="max-w-2xl">
        <p className="rc-label text-[var(--rc-lavender)]">
          <span className="rc-label-line bg-[var(--rc-lavender)]" />
          {SERVICES.label}
        </p>
        <h2 className="rc-h2 mt-4 text-white" data-testid="services-title">{SERVICES.title}</h2>
        <p className="mt-4 text-white/70 leading-relaxed">{SERVICES.description}</p>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-7">
        {SERVICES.items.map((service, i) => {
          const Icon = ICONS[service.icon];
          return (
            <article
              key={service.title}
              data-testid="service-card"
              className="group rounded-3xl bg-white/[0.07] backdrop-blur-md border border-white/10 p-9 transition-all duration-300 hover:bg-[var(--rc-indigo-700)] hover:-translate-y-1.5"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="grid place-items-center w-14 h-14 rounded-2xl bg-[var(--rc-lavender)]/20 text-[var(--rc-lavender)]">
                <Icon size={26} />
              </span>
              <h3 className="mt-6 font-heading font-bold text-white text-xl leading-snug">{service.title}</h3>
              <p className="mt-3 text-sm text-white/65 leading-relaxed">{service.text}</p>
              <a href="/contact" className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--rc-lavender)] group-hover:text-white transition-colors">
                Learn more <ArrowRight size={14} />
              </a>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);
