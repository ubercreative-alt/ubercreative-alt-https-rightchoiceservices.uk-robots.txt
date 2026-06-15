import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { ICON_SM } from "@/constants/ui";

const LEGISLATION = [
  "Supported Accommodation Regulations 2023",
  "Children Act 1989",
  "Children Act 2004",
  "Leaving Care Act 2000",
  "Care Standards Act 2000",
  "Every Child Matters Outcome",
  "Human Rights Act 1998",
  "Housing Act 2004",
  "Other relevant regulations that guide the practice of looking after children in public care",
];

const Section = ({ id, label, title, children, dark, testId }) => (
  <section
    data-testid={testId}
    id={id}
    className={`py-20 lg:py-28 ${dark ? "bg-[var(--rc-indigo-900)] text-white" : "bg-[var(--rc-paper)] text-[var(--rc-ink)]"}`}
  >
    <div className="mx-auto max-w-4xl px-6 lg:px-10">
      <p className={`rc-label ${dark ? "text-[var(--rc-lavender)]" : "text-[var(--rc-indigo-600)]"}`}>
        <span className={`rc-label-line ${dark ? "bg-[var(--rc-lavender)]" : "bg-[var(--rc-indigo-600)]"}`} />
        {label}
      </p>
      <h2 className={`rc-h2 mt-4 ${dark ? "text-white" : ""}`}>{title}</h2>
      <div className={`mt-7 space-y-5 leading-relaxed ${dark ? "text-white/80" : "text-[var(--rc-ink-soft)]"}`}>
        {children}
      </div>
    </div>
  </section>
);

const WhiteSection = ({ id, label, title, children, testId }) => (
  <section data-testid={testId} id={id} className="bg-white py-20 lg:py-28">
    <div className="mx-auto max-w-4xl px-6 lg:px-10">
      <p className="rc-label text-[var(--rc-indigo-600)]">
        <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
        {label}
      </p>
      <h2 className="rc-h2 mt-4">{title}</h2>
      <div className="mt-7 space-y-5 leading-relaxed text-[var(--rc-ink-soft)]">{children}</div>
    </div>
  </section>
);

export default function About() {
  return (
    <PageShell testId="about-page">
      <PageHero
        testId="about-hero"
        label="About"
        title="About Us – Right Choice Services Ltd."
        description="Welcome to Right Choice Services Ltd, where our commitment is to provide exceptional supported accommodation in and around the South East of England as well as bespoke support services to young people."
      />

      <WhiteSection
        testId="about-intro"
        label="About Us"
        title="A diverse range of young individuals."
      >
        <p>
          Welcome to Right Choice Services Ltd, where our commitment is to provide exceptional supported accommodation in and around the South East of England as well as bespoke support services to young people. At Right Choice Services Ltd, we specialise in catering to the unique needs of a diverse range of young individuals, offering a comprehensive range of support to empower them on their journey towards independence.
        </p>
      </WhiteSection>

      <Section
        testId="about-mission"
        label="Our Mission"
        title="Our Mission."
      >
        <p>
          At Right Choice Services Ltd, we recognise the challenges that young people face when entering supported accommodation and we are dedicated to making this transition smoother. Our mission is to extend a helping and supportive hand to these young individuals. We offer professional and socially recognised adult support systems tailored to address the complex needs they often encounter during this critical phase of their lives.
        </p>
        <p>
          We understand that the journey from childhood to young adulthood can be daunting, especially for those leaving care. Our focus is on providing a safe and nurturing environment where young people can explore their individuality, learn from their experiences, and develop essential life skills at their own pace.
        </p>
      </Section>

      <WhiteSection
        testId="about-what-we-provide"
        label="What We Provide"
        title="What We Provide."
      >
        <p>
          Our services are designed to cater to the specific needs of young people under the care of Local Authorities. We offer assistance in developing and maintaining lifelong self-care and life skills. Our approach to pathway planning goes beyond documentation – we create robust daily action placement plans to ensure real and meaningful progress.
        </p>
        <p>
          We provide both physical and emotional space for young people to be themselves, make mistakes, and learn from them without fear of ridicule. We believe that having personal space is essential for young individuals to manage their lives on a day-to-day basis, allowing them a fair chance to discover and develop their potential through trial and error.
        </p>
        <p>
          Our placement options are diverse. They include supported accommodation for 16yr - 18yr olds, including twenty-four-hour supervised units. We also offer shared accommodation for 18- to 21-year-olds with floating support. In emergencies, placements can be accessed with the understanding that a comprehensive placement agreement will be in place within 72 hours.
        </p>
        <p>
          At Right Choice Services Ltd, we strive to create a positive and supportive environment that enables young people to embark on their journey towards a brighter and more independent future.
        </p>
        <div className="pt-2">
          <Link to="/services" data-testid="about-services-link" className="rc-btn-pill inline-flex">
            Visit our Services Page <ArrowRight size={ICON_SM} />
          </Link>
        </div>
      </WhiteSection>

      <Section
        testId="about-working-with-agencies"
        label="About YOU"
        title="Working With Other Agencies and Services."
      >
        <p>
          We maintain close collaboration with professionals in related sectors, fostering positive interactions over the years. Through these partnerships, we have been able to identify and implement key and supplementary services that may be beyond the budget, staffing, or scope of other agencies.
        </p>
        <p>
          We understand that all of the agencies we work with are often stretched to the limit with record numbers of cases being referred to them. This is where Right Choice Services Ltd excels.
        </p>
        <p>
          We are ideally placed to support young people with very specific needs, offering an intensive package of support from accommodation and daily living support to ultimately helping service users build a better future for themselves.
        </p>
        <p>
          This can be a challenge as many of our young people can&apos;t (yet) see any other future path than the one that they are on. We have the time, staff and resources to help them identify those dreams and proactively work towards them.
        </p>
        <div className="pt-2">
          <Link to="/referrals" data-testid="about-referral-link" className="rc-btn-pill inline-flex">
            Referral Page <ArrowRight size={ICON_SM} />
          </Link>
        </div>
      </Section>

      <WhiteSection
        testId="about-commitment"
        label="Our Commitment"
        title="The Right Choice Services LTD Commitment to Standards."
      >
        <p>
          Right Choice Services Ltd is committed to upholding high standards in all aspects of our services. We are fully dedicated to partnership working, aiming for the best possible outcomes for all young people under our support. Our services align with various legislations, including:
        </p>
        <ul className="mt-2 grid sm:grid-cols-2 gap-3">
          {LEGISLATION.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-2xl bg-[var(--rc-paper)] p-4">
              <Check size={16} className="text-[var(--rc-indigo-600)] mt-0.5 shrink-0" strokeWidth={3} />
              <span className="text-sm text-[var(--rc-ink)] leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2">
          We have also adopted the code of practice as outlined by the General Social Care Council (GSCC).
        </p>
      </WhiteSection>

      <Section testId="about-our-staff" label="Our Staff" title="Our Staff.">
        <p>
          Our staff team are uniquely skilled and we are proud to have such a dedicated and caring team. Their commitment to personal and professional development is one way that they ensure the young people under their supervision receive the very best support for their needs.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Link to="/team" data-testid="about-team-link" className="rc-btn-pill">
            Read more about our staff team <ArrowRight size={ICON_SM} />
          </Link>
          <Link to="/contact" data-testid="about-contact-link" className="rc-btn-pill">
            Contact Us <ArrowRight size={ICON_SM} />
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
