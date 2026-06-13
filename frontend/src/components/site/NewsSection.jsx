import { ArrowRight } from "lucide-react";
import { NEWS } from "@/data/content";
import { ICON_SM } from "@/constants/ui";

export const NewsSection = () => (
  <section id="news" data-testid="news-section" className="bg-[var(--rc-paper)] py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <p className="rc-label text-[var(--rc-indigo-600)]">
            <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
            {NEWS.label}
          </p>
          <h2 className="rc-h2 mt-4" data-testid="news-title">{NEWS.title}</h2>
        </div>
        <a href="/contact" className="rc-btn-pill" data-testid="news-discover-btn">
          Get In Touch <ArrowRight size={ICON_SM} />
        </a>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-7">
        {NEWS.items.map((post) => (
          <article
            key={post.title}
            data-testid="news-card"
            className="group rounded-3xl bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
          >
            <div className="relative h-56 overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute top-5 left-5 rounded-xl bg-[var(--rc-indigo-700)] text-white text-center px-4 py-2 leading-tight">
                <span className="block font-heading font-bold text-lg">{post.date}</span>
                <span className="block text-[11px] uppercase tracking-wider text-[var(--rc-lavender)]">{post.month}</span>
              </span>
            </div>
            <div className="p-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--rc-indigo-500)]">{post.category}</span>
              <h3 className="mt-3 font-heading font-bold text-[var(--rc-ink)] text-xl leading-snug group-hover:text-[var(--rc-indigo-600)] transition-colors">
                {post.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--rc-ink-soft)] leading-relaxed">{post.text}</p>
              <a href="/contact" className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--rc-indigo-600)]">
                Read More <ArrowRight size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
