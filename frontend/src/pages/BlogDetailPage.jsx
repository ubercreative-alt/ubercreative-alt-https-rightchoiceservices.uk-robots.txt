import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Calendar, User, Tag, ArrowRight, Facebook, Twitter, Linkedin } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Cta from "../components/home/Cta";
import { blog } from "../mock";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = blog.items.find((b) => b.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;
  const others = blog.items.filter((b) => b.slug !== slug);

  return (
    <div className="bg-cream">
      <SiteHeader />
      <main>
        <PageHeader title={post.title} crumbs={["Blog", post.category]} />
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <Reveal className="rounded-3xl overflow-hidden">
                <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="w-full h-[380px] md:h-[480px] object-cover" />
              </Reveal>
              <Reveal>
                <div className="flex flex-wrap items-center gap-5 mt-8 text-sm text-mute">
                  <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-brand" />{post.date}</span>
                  <span className="inline-flex items-center gap-2"><User className="h-4 w-4 text-brand" />{post.author}</span>
                  <span className="inline-flex items-center gap-2"><Tag className="h-4 w-4 text-brand" />{post.category}</span>
                </div>
                <h2 className="mt-5 font-heading font-extrabold text-ink text-3xl md:text-4xl leading-tight">{post.title}</h2>
                <div className="mt-6 space-y-5">
                  {post.content.map((p, i) => (
                    <p key={i} className="text-ink/80 text-[17px] leading-relaxed">{p}</p>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-10 pt-8 border-t border-black/10">
                  <span className="text-ink font-semibold">Share:</span>
                  {[Facebook, Twitter, Linkedin].map((Ic, i) => (
                    <a key={i} href="https://facebook.com" aria-label="Share" className="grid place-items-center h-10 w-10 rounded-full bg-white ring-1 ring-black/5 text-ink hover:bg-brand hover:text-white transition-colors"><Ic className="h-4 w-4" /></a>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-1">
              <div className="rounded-3xl bg-white ring-1 ring-black/5 p-6">
                <h3 className="font-heading font-bold text-ink text-lg mb-4">Recent Articles</h3>
                <ul className="space-y-5">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link to={`/blog/${o.slug}`} className="group flex gap-4">
                        <img src={o.image} alt={o.title} className="h-16 w-16 rounded-xl object-cover shrink-0" />
                        <div>
                          <div className="text-xs text-mute">{o.date}</div>
                          <div className="font-heading font-semibold text-ink leading-snug group-hover:text-brand transition-colors">{o.title}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to="/blog" className="inline-flex items-center gap-2 mt-6 font-semibold text-ink hover:text-brand transition-colors">View All Articles <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </Reveal>
          </div>
        </section>
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
