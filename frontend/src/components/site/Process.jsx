import { ArrowRight } from "lucide-react";
import { PROCESS } from "@/data/content";

export const Process = () => (
  <section id="how-we-work" data-testid="process-section" className="bg-[var(--rc-paper)] py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="rc-label text-[var(--rc-indigo-600)]">
            <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
            {PROCESS.label}
          </p>
          <h2 className="rc-h2 mt-4" data-testid="process-title">{PROCESS.title}</h2>
          <p className="mt-5 text-[var(--rc-ink-soft)] leading-relaxed max-w-xl">{PROCESS.description}</p>
          <a href="/referrals" className="rc-btn-pill mt-8 inline-flex" data-testid="process-cta">
            {PROCESS.cta} <ArrowRight size={15} />
          </a>
        </div>
        <img src={PROCESS.image} alt="Meeting with partner agencies" className="rounded-[2rem] w-full h-[340px] object-cover shadow-lg shadow-[var(--rc-indigo-900)]/10" />
      </div>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROCESS.steps.map((step, i) => {
          const dark = i === 2;
          return (
            <div
              key={step.number}
              data-testid="process-step"
              className={`rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1.5 ${
                dark ? "bg-[var(--rc-indigo-700)] shadow-xl shadow-[var(--rc-indigo-700)]/30" : "bg-white shadow-sm"
              }`}
            >
              <p className={`font-heading font-bold text-3xl ${dark ? "text-[var(--rc-lavender)]" : "text-[var(--rc-lavender-deep)]"}`}>
                {step.number}
              </p>
              <h4 className={`mt-5 font-heading font-bold ${dark ? "text-white" : "text-[var(--rc-ink)]"}`}>{step.title}</h4>
              <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/70" : "text-[var(--rc-ink-soft)]"}`}>{step.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
