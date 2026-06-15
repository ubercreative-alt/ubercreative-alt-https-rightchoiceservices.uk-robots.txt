import { ShieldCheck, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { POLICIES_PAGE } from "@/data/content";
import { ICON_SM, ICON_MD } from "@/constants/ui";

const PolicyCard = ({ policy }) => (
  <div data-testid="policy-card" className="group rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[var(--rc-indigo-50,#eef0ff)] text-[var(--rc-indigo-600)]">
      <ShieldCheck size={ICON_MD} />
    </span>
    <h3 className="mt-6 font-heading font-bold text-[var(--rc-ink)] text-lg group-hover:text-[var(--rc-indigo-600)] transition-colors">
      {policy.title}
    </h3>
    <p className="mt-3 text-sm text-[var(--rc-ink-soft)] leading-relaxed">{policy.text}</p>
  </div>
);

const PoliciesContactCta = () => (
  <div className="mt-16 rounded-[2rem] bg-[var(--rc-indigo-800)] p-8 lg:p-12 text-white text-center">
    <Mail size={28} className="mx-auto text-[var(--rc-lavender)]" />
    <h3 className="mt-5 font-heading font-bold text-2xl">{POLICIES_PAGE.note}</h3>
    <p className="mt-4 text-white/75 max-w-xl mx-auto">{POLICIES_PAGE.outro}</p>
    <Link to="/contact" data-testid="policies-contact-cta" className="rc-btn-pill mt-8 inline-flex">
      Contact Us <ArrowRight size={ICON_SM} />
    </Link>
  </div>
);

export default function Policies() {
  return (
    <PageShell testId="policies-page">
      <PageHero
        testId="policies-hero"
        label={POLICIES_PAGE.label}
        title={POLICIES_PAGE.title}
        description={POLICIES_PAGE.intro}
      />
      <section className="bg-[var(--rc-paper)] py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {POLICIES_PAGE.items.map((policy) => (
              <PolicyCard key={policy.title} policy={policy} />
            ))}
          </div>
          <PoliciesContactCta />
        </div>
      </section>
    </PageShell>
  );
}
