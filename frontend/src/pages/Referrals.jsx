import { PhoneCall, Mail, ArrowRight } from "lucide-react";
import { TopBar } from "@/components/site/TopBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ReferralForm } from "@/components/site/ReferralForm";
import { CONTACT, REFERRALS_PAGE } from "@/data/content";

const PageHero = () => (
  <section data-testid="referrals-hero" className="relative bg-[var(--rc-indigo-900)] overflow-hidden">
    <div className="absolute -right-24 -top-28 w-96 h-96 rounded-full bg-white/[0.05]" />
    <div className="absolute left-1/3 -bottom-32 w-72 h-72 rounded-full bg-white/[0.04]" />
    <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-44 pb-20">
      <p className="rc-label text-[var(--rc-lavender)]">
        <span className="rc-label-line bg-[var(--rc-lavender)]" />
        {REFERRALS_PAGE.label}
      </p>
      <h1 className="mt-5 font-heading font-bold text-white text-4xl sm:text-5xl lg:text-6xl" data-testid="referrals-title">
        {REFERRALS_PAGE.title}
      </h1>
      <p className="mt-6 max-w-2xl text-white/75 leading-relaxed">{REFERRALS_PAGE.intro}</p>
    </div>
  </section>
);

const ReferralInfo = () => (
  <div>
    <h2 className="rc-h2">What happens next?</h2>
    <div className="mt-9 space-y-7">
      {REFERRALS_PAGE.steps.map((step) => (
        <div key={step.number} className="flex gap-5">
          <span className="font-heading font-bold text-3xl text-[var(--rc-lavender-deep)]">{step.number}</span>
          <div>
            <h4 className="font-heading font-bold text-[var(--rc-ink)]">{step.title}</h4>
            <p className="mt-1.5 text-sm text-[var(--rc-ink-soft)] leading-relaxed">{step.text}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-10 rounded-2xl bg-[var(--rc-indigo-800)] p-7">
      <h4 className="font-heading font-bold text-white text-lg">Got questions?</h4>
      <p className="mt-2 text-sm text-white/70">
        If you need to speak to us or have any questions, please contact us directly and we will be more than happy to help.
      </p>
      <div className="mt-5 space-y-2 text-sm text-white/85">
        <p className="flex items-center gap-2.5">
          <PhoneCall size={14} className="text-[var(--rc-lavender)]" /> {CONTACT.phone} · {CONTACT.mobile}
        </p>
        <p className="flex items-center gap-2.5">
          <Mail size={14} className="text-[var(--rc-lavender)]" /> {CONTACT.email}
        </p>
      </div>
      <a href="/#contact" data-testid="referrals-contact-link" className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--rc-lavender)] hover:text-white transition-colors">
        Contact Us <ArrowRight size={14} />
      </a>
    </div>
  </div>
);

export default function Referrals() {
  return (
    <div data-testid="referrals-page" className="rc-site">
      <TopBar />
      <Header />
      <main>
        <PageHero />
        <section className="bg-[var(--rc-paper)] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-[1fr_1.2fr] gap-14 items-start">
            <ReferralInfo />
            <ReferralForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
