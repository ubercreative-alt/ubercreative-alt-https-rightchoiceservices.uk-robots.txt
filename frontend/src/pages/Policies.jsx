import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { POLICIES_PAGE } from "@/data/content";
import { ICON_SM } from "@/constants/ui";

export default function Policies() {
  return (
    <PageShell testId="policies-page">
      <PageHero
        testId="policies-hero"
        label={POLICIES_PAGE.label}
        title={POLICIES_PAGE.title}
        description={POLICIES_PAGE.intro}
      />
      <section className="bg-[var(--rc-paper)] py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <p className="rc-label justify-center text-[var(--rc-indigo-600)]">
            <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
            Available on Request
          </p>
          <h2 className="rc-h2 mt-4">View our policies below.</h2>
          <p className="mt-6 text-[var(--rc-ink-soft)] leading-relaxed">{POLICIES_PAGE.note}</p>

          <div className="mt-12 rounded-[2rem] bg-[var(--rc-indigo-800)] p-8 lg:p-12 text-white">
            <Mail size={28} className="mx-auto text-[var(--rc-lavender)]" />
            <p className="mt-5 text-white/85 leading-relaxed">{POLICIES_PAGE.outro}</p>
            <Link to="/contact" data-testid="policies-contact-cta" className="rc-btn-pill mt-8 inline-flex">
              Contact Us <ArrowRight size={ICON_SM} />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
