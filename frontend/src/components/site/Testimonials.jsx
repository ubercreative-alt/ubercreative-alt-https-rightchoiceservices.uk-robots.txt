import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/content";

export const Testimonials = () => (
  <section data-testid="testimonials-section" className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="max-w-2xl">
        <p className="rc-label text-[var(--rc-indigo-600)]">
          <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
          {TESTIMONIALS.label}
        </p>
        <h2 className="rc-h2 mt-4" data-testid="testimonials-title">{TESTIMONIALS.title}</h2>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-7">
        {TESTIMONIALS.items.map((item) => (
          <figure
            key={item.name}
            data-testid="testimonial-card"
            className="rounded-3xl bg-[var(--rc-paper)] border border-[var(--rc-lavender)]/25 p-9 flex flex-col transition-transform duration-300 hover:-translate-y-1.5"
          >
            <Quote size={32} className="text-[var(--rc-lavender)]" fill="currentColor" />
            <blockquote className="mt-5 text-[var(--rc-ink-soft)] leading-relaxed italic flex-1">
              “{item.quote}”
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-4">
              <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-heading font-bold text-[var(--rc-ink)]">{item.name}</p>
                <p className="text-sm text-[var(--rc-ink-soft)]">{item.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);
