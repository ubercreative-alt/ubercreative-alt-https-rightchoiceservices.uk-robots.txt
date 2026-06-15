import { PageShell, PageHero } from "@/components/site/PageShell";
import { POLICIES_PAGE } from "@/data/content";

export default function Policies() {
  return (
    <PageShell testId="policies-page">
      <PageHero
        testId="policies-hero"
        label="Policies"
        title="Policies."
        description="At Right Choice Services LTD, we follow all required legislation and proactively include advised best practice guidelines in all aspects of our organisation."
      />
      <section className="bg-[var(--rc-paper)] py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="space-y-5 text-[var(--rc-ink-soft)] leading-relaxed">
            <p>{POLICIES_PAGE.intro}</p>
            <p className="text-[var(--rc-ink)] font-heading font-bold text-xl mt-10">Please view our policies below.</p>
            <p>{POLICIES_PAGE.outro}</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
