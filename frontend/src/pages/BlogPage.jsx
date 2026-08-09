import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Cta from "../components/home/Cta";
import { blog } from "../mock";

export default function BlogPage() {
  return (
    <div className="bg-cream">
      <SiteHeader />
      <main>
        <PageHeader title="Our Blog" crumbs={["Blog"]} />
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal className="max-w-2xl mb-12">
              <span className="inline-block text-brand font-semibold tracking-[0.2em] text-sm mb-4">{blog.eyebrow}</span>
              <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl leading-tight">{blog.title}</h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {blog.items.map((b, i) => (
                <Reveal key={b.slug} delay={i * 100} variant="zoom">
                  <article className="group rounded-3xl overflow-hidden bg-white ring-1 ring-black/5 hover:shadow-xl transition-shadow h-full flex flex-col">
                    <Link to={`/blog/${b.slug}`} className="relative h-56 overflow-hidden block">
                      <img src={b.image} alt={b.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <span className="absolute top-4 left-4 bg-brand text-white text-xs font-semibold px-3 py-1.5 rounded-full">{b.category}</span>
                    </Link>
                    <div className="p-7 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-sm text-mute"><Calendar className="h-4 w-4 text-brand" />{b.date}</div>
                      <h3 className="mt-3 font-heading font-bold text-xl text-ink group-hover:text-brand transition-colors leading-snug"><Link to={`/blog/${b.slug}`}>{b.title}</Link></h3>
                      <p className="mt-3 text-mute text-sm leading-relaxed flex-1">{b.excerpt}</p>
                      <Link to={`/blog/${b.slug}`} className="inline-flex items-center gap-2 mt-5 font-semibold text-ink group-hover:text-brand transition-colors">Read More <ArrowUpRight className="h-4 w-4" /></Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
