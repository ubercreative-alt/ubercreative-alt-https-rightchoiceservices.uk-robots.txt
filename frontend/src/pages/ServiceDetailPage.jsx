import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowUpRight, Check, Phone } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Cta from "../components/home/Cta";
import { services, roofingServices, brand } from "../mock";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.items.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;

  return (
    <div className="bg-cream">
      <SiteHeader />
      <main>
        <PageHeader title={service.title} crumbs={["Services", service.title]} />

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">
            {/* Sidebar */}
            <Reveal className="lg:col-span-1 order-2 lg:order-1">
              <div className="rounded-3xl bg-white ring-1 ring-black/5 p-6">
                <h3 className="font-heading font-bold text-ink text-lg mb-4">All Services</h3>
                <ul className="space-y-2">
                  {services.items.map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`} className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-colors ${s.slug === slug ? "bg-brand text-white" : "bg-cream text-ink hover:bg-brand hover:text-white"}`}>
                        {s.title}<ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 rounded-3xl bg-ink text-white p-8 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand/30" />
                <h3 className="relative font-heading font-bold text-2xl">Need a Free Quote?</h3>
                <p className="relative mt-2 text-white/70 text-sm">Speak to our team today for friendly, no-obligation advice.</p>
                <a href={`tel:${brand.phone}`} className="relative mt-5 inline-flex items-center gap-3">
                  <span className="grid place-items-center h-12 w-12 rounded-full bg-brand"><Phone className="h-5 w-5" /></span>
                  <span className="font-heading font-bold text-xl">{brand.phone}</span>
                </a>
              </div>
            </Reveal>

            {/* Main */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <Reveal className="rounded-3xl overflow-hidden" variant="right">
                <img src={service.image} alt={service.title} loading="lazy" decoding="async" className="w-full h-[380px] md:h-[460px] object-cover" />
              </Reveal>
              <Reveal>
                <h2 className="mt-8 font-heading font-extrabold text-ink text-3xl md:text-4xl">{service.title}</h2>
                <p className="mt-5 text-mute text-[17px] leading-relaxed">{service.overview}</p>
                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 bg-white rounded-xl ring-1 ring-black/5 px-4 py-3.5">
                      <span className="grid place-items-center h-7 w-7 rounded-full bg-brand text-white shrink-0"><Check className="h-4 w-4" /></span>
                      <span className="text-ink font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {service.gallery.map((g, i) => (
                  <Reveal key={i} delay={i * 90} variant="zoom" className="rounded-2xl overflow-hidden">
                    <img src={g} alt={`${service.title} example ${i + 1}`} loading="lazy" decoding="async" className="w-full h-32 md:h-44 object-cover" />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {service.isRoofing && (
          <section className="bg-cream-100 py-24">
            <div className="max-w-7xl mx-auto px-6">
              <Reveal className="text-center max-w-2xl mx-auto mb-14">
                <span className="inline-block text-brand font-semibold tracking-[0.2em] text-sm mb-4">{roofingServices.eyebrow}</span>
                <h2 className="font-heading font-extrabold text-ink text-3xl md:text-5xl leading-tight">{roofingServices.title}</h2>
              </Reveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {roofingServices.items.map((r, i) => (
                  <Reveal key={r.title} delay={(i % 3) * 90} variant="zoom">
                    <div className="group rounded-3xl overflow-hidden bg-white ring-1 ring-black/5 hover:shadow-xl transition-shadow h-full">
                      <div className="relative h-52 overflow-hidden">
                        <img src={r.image} alt={r.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                      <div className="p-7">
                        <h3 className="font-heading font-bold text-xl text-ink group-hover:text-brand transition-colors">{r.title}</h3>
                        <p className="mt-3 text-mute text-sm leading-relaxed">{r.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <Cta />
      </main>
      <Footer />
    </div>
  );
}
