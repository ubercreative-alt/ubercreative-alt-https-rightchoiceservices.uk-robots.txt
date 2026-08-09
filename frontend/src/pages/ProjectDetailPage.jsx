import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowUpRight, MapPin, Clock, User, Tag, Calendar, ArrowRight } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import Cta from "../components/home/Cta";
import { projects } from "../mock";

const phaseMeta = [
  { key: "before", label: "Before", tag: "01" },
  { key: "during", label: "During", tag: "02" },
  { key: "after", label: "After", tag: "03" },
];

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.items.find((p) => p.slug === slug);
  if (!project) return <Navigate to="/projects" replace />;

  const idx = projects.items.findIndex((p) => p.slug === slug);
  const next = projects.items[(idx + 1) % projects.items.length];

  const meta = [
    { icon: User, label: "Client", value: project.client },
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Clock, label: "Duration", value: project.duration },
    { icon: Tag, label: "Category", value: project.category },
    { icon: Calendar, label: "Year", value: project.year },
  ];

  return (
    <div className="bg-cream">
      <SiteHeader />
      <main>
        <PageHeader title={project.title} crumbs={["Projects", project.category]} />

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal className="rounded-3xl overflow-hidden" variant="up">
              <img src={project.image} alt={project.title} className="w-full h-[420px] md:h-[560px] object-cover" />
            </Reveal>

            <div className="grid lg:grid-cols-3 gap-10 mt-12">
              <Reveal className="lg:col-span-2" variant="left">
                <span className="inline-block text-brand font-semibold tracking-[0.2em] text-sm mb-4">PROJECT OVERVIEW</span>
                <h2 className="font-heading font-extrabold text-ink text-3xl md:text-4xl leading-tight">{project.title}</h2>
                <p className="mt-5 text-mute text-[17px] leading-relaxed">{project.overview}</p>
              </Reveal>
              <Reveal variant="right">
                <div className="rounded-3xl bg-ink text-white p-8">
                  <h3 className="font-heading font-bold text-xl mb-5">Project Details</h3>
                  <ul className="space-y-4">
                    {meta.map((m) => (
                      <li key={m.label} className="flex items-center gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                        <span className="grid place-items-center h-10 w-10 rounded-xl bg-brand/20 text-brand-400 shrink-0"><m.icon className="h-5 w-5" /></span>
                        <div>
                          <div className="text-xs text-white/50 uppercase tracking-wider">{m.label}</div>
                          <div className="font-heading font-semibold">{m.value}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Before / During / After */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block text-brand font-semibold tracking-[0.2em] text-sm mb-4">THE TRANSFORMATION</span>
              <h2 className="font-heading font-extrabold text-ink text-3xl md:text-5xl leading-tight">Before, During &amp; After</h2>
              <p className="mt-4 text-mute">Drag the slider to reveal the transformation.</p>
            </Reveal>

            <Reveal className="mb-16" variant="zoom">
              <BeforeAfterSlider before={project.phases.before.image} after={project.phases.after.image} />
            </Reveal>

            <div className="space-y-16">
              {phaseMeta.map((ph, i) => {
                const data = project.phases[ph.key];
                const reversed = i % 2 === 1;
                return (
                  <div key={ph.key} className="grid lg:grid-cols-2 gap-10 items-center">
                    <Reveal className={`rounded-3xl overflow-hidden ${reversed ? "lg:order-2" : ""}`} variant={reversed ? "right" : "left"}>
                      <img src={data.image} alt={`${project.title} \u2013 ${ph.label}`} className="w-full h-[360px] md:h-[440px] object-cover" />
                    </Reveal>
                    <Reveal className={reversed ? "lg:order-1" : ""} variant={reversed ? "left" : "right"}>
                      <div className="flex items-center gap-4">
                        <span className="font-heading font-extrabold text-5xl text-brand/20">{ph.tag}</span>
                        <span className="inline-block bg-brand text-white text-sm font-semibold px-4 py-1.5 rounded-full">{ph.label}</span>
                      </div>
                      <h3 className="mt-5 font-heading font-extrabold text-ink text-3xl">{ph.label} the Renovation</h3>
                      <p className="mt-4 text-mute text-[17px] leading-relaxed">{data.text}</p>
                    </Reveal>
                  </div>
                );
              })}
            </div>

            <Reveal className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl bg-white ring-1 ring-black/5 p-8">
              <div className="flex items-center gap-4">
                <span className="text-sm text-mute">Next Project</span>
                <Link to={`/projects/${next.slug}`} className="font-heading font-bold text-ink text-xl hover:text-brand transition-colors">{next.title}</Link>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/projects" className="inline-flex items-center gap-2 text-ink font-semibold hover:text-brand transition-colors"><ArrowRight className="h-4 w-4 rotate-180" /> All Projects</Link>
                <Link to={`/projects/${next.slug}`} className="inline-flex items-center gap-3 bg-brand text-white pl-5 pr-2 py-2.5 rounded-full font-semibold hover:bg-brand-600 transition-colors group">
                  View Next
                  <span className="grid place-items-center h-9 w-9 rounded-full bg-white/20"><ArrowUpRight className="h-5 w-5" /></span>
                </Link>
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
