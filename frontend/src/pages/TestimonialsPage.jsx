import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Testimonials } from "@/components/site/Testimonials";
import { ICON_SM } from "@/constants/ui";

const TestimonialsIntro = () => (
  <section data-testid="testimonials-intro" className="bg-white py-20 lg:py-24">
    <div className="mx-auto max-w-3xl px-6 lg:px-10">
      <div className="space-y-5 text-[var(--rc-ink-soft)] leading-relaxed">
        <p>
          Many of the specifics of the work that we undertake here at Right Choice Services can&apos;t be shared with the public due to privacy and safeguarding reasons. We are incredibly grateful, therefore, when previous service users, agencies and other professionals who have worked with us take the time out of their busy day to leave us a testimonial. We hope these reviews help illustrate the way that we support young people and the impact that our programmes can have.
        </p>
        <p className="text-[var(--rc-ink)] font-heading font-bold text-lg">
          You can find some of our more recent reviews below.
        </p>
      </div>
    </div>
  </section>
);

const TestimonialsCta = () => (
  <section data-testid="testimonials-cta" className="bg-[var(--rc-paper)] pb-24 lg:pb-28">
    <div className="mx-auto max-w-5xl px-6 lg:px-10">
      <div className="rounded-[2rem] bg-[var(--rc-indigo-800)] p-8 lg:p-12 text-center text-white">
        <p className="text-white/85 leading-relaxed">
          Please contact us via the contact page with any questions.
        </p>
        <p className="mt-2 text-white/85 leading-relaxed">
          Ready to refer to us? Please visit our referral page.
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
        label="Testimonials"
        title="Testimonial Page."
        description="Reviews from previous service users, agencies and other professionals who have worked with us."
      />
      <TestimonialsIntro />
      <Testimonials />
      <TestimonialsCta />
    </PageShell>
  );
}
