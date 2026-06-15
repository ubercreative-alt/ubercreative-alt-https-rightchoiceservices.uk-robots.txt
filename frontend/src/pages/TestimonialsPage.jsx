import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Testimonials } from "@/components/site/Testimonials";
import { TESTIMONIALS } from "@/data/content";
import { ICON_SM } from "@/constants/ui";

const TestimonialsCta = () => (
  <section className="bg-[var(--rc-paper)] pb-24 lg:pb-28">
    <div className="mx-auto max-w-5xl px-6 lg:px-10">
      <div className="rounded-[2rem] bg-[var(--rc-indigo-800)] p-8 lg:p-12 text-center text-white">
        <h3 className="font-heading font-bold text-2xl">Got a question? Ready to refer?</h3>
        <p className="mt-4 text-white/75 max-w-xl mx-auto">
          Please contact us via the contact page with any questions. Ready to refer to us? Please visit our referral page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="rc-btn-pill" data-testid="testimonials-contact-cta">
            Contact Page <ArrowRight size={ICON_SM} />
          </Link>
          <Link to="/referrals" className="rc-btn-pill" data-testid="testimonials-referral-cta">
            Referral Page <ArrowRight size={ICON_SM} />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default function TestimonialsPage() {
  return (
    <PageShell testId="testimonials-page">
      <PageHero
        testId="testimonials-hero"
        label={TESTIMONIALS.label}
        title="Reviews from young people, agencies and professionals."
        description={TESTIMONIALS.intro}
      />
      <Testimonials />
      <TestimonialsCta />
    </PageShell>
  );
}
