import { PageShell, PageHero } from "@/components/site/PageShell";
import { ReferralForm } from "@/components/site/ReferralForm";

export default function Referrals() {
  return (
    <PageShell testId="referrals-page">
      <PageHero
        testId="referrals-hero"
        label="Referrals"
        title="Referrals."
        description="We strive to ensure that working with us is as easy as possible."
      />
      <section className="bg-[var(--rc-paper)] py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="space-y-5 text-[var(--rc-ink-soft)] leading-relaxed text-center">
            <p>
              We strive to ensure that working with us is as easy as possible. To streamline our processes we have now included an option for you to refer directly and easily by completing the referral form below.
            </p>
            <p>
              Please use this to request supported accommodation or support services for a young person.
            </p>
            <p>
              If you need to speak to us or have any questions please contact us directly and we will be more than happy to help.
            </p>
          </div>

          <h2 className="rc-h2 mt-16 text-center">Referral Form.</h2>

          <div className="mt-10">
            <ReferralForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
