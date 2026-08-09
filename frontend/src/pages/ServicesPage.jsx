import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import ProcessSteps from "../components/home/ProcessSteps";
import Cta from "../components/home/Cta";
import { services } from "../mock";

export default function ServicesPage() {
  return (
    <div className="bg-cream">
      <SiteHeader />
      <main>
        <PageHeader title="Our Services" crumbs={["Services"]} />
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal className="max-w-2xl">
              <span className="inline-block text-brand font-semibold tracking-[0.2em] text-sm mb-4">{services.eyebrow}</span>
              <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl leading-tight">{services.title}</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              {services.items.map((s, i) => (
                <Reveal key={s.slug} delay={i * 90}>
                  <Link to={`/services/${s.slug}`} className="group block relative rounded-3xl overflow-hidden h-[360px]">
                    <img src={s.image} alt={s.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                      <span className="grid place-items-center h-11 w-11 rounded-full bg-brand mb-4 w-fit"><ArrowUpRight className="h-5 w-5" /></span>
                      <h3 className="font-heading font-bold text-2xl">{s.title}</h3>
                      <p className="mt-2 text-white/80 text-sm max-w-md">{s.desc}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <ProcessSteps />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
