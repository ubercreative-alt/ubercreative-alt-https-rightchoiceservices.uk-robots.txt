import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/site/PageShell";
import { Hero } from "@/components/site/Hero";
import { ICON_SM } from "@/constants/ui";

const HOW_WE_SUPPORT = [
  {
    title: "Facilitate Engaging Plans",
    text: "Collaborate with young individuals to craft plans and programs under the guidance of social workers, parents, caregivers, education providers, health professionals, and other stakeholders. We champion a participatory approach to ensure everyone's active involvement.",
  },
  {
    title: "Inspire Better Lives",
    text: "Cultivate aspirations for a superior quality of life with high expectations and achievable goals, supported by the right level of guidance tailored to individual needs.",
  },
  {
    title: "Guide and Encourage Supportive Social Networks",
    text: "Provide guidance and resources for young people to establish and maintain supportive, reliable, secure, and sustainable social networks that positively impact their lives.",
  },
  {
    title: "Ensure Equal Opportunities",
    text: "Champion equal opportunity, ensuring that every young person has the chance to achieve their full potential. We aim to support them in realising the best possible outcomes within their capabilities.",
  },
];

const PARTNER_AGENCIES = [
  "The Police",
  "Social Services",
  "Educational Establishments",
  "Local Authorities",
  "Mental Health Teams",
  "Youth Offending Teams (the Youth Justice Board for England and Wales)",
  "Barnados",
  "The Inside Out Programme",
  "Safer Neighborhoods Teams",
  "Enable (Drug Addiction Services)",
];

// ---- sections ---------------------------------------------------------------

const TransformIntro = () => (
  <section data-testid="home-transform" className="bg-white py-20 lg:py-28">
    <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
      <p className="rc-label justify-center text-[var(--rc-indigo-600)]">
        <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
        Below the Fold
      </p>
      <h2 className="rc-h2 mt-4">
        Right Choice Services LTD — Transforming the Future of Vulnerable Young People in the South East With Dedicated Support Services and Accommodation.
      </h2>
    </div>
  </section>
);

const WhoWeSupport = () => (
  <section data-testid="home-who-we-support" className="bg-[var(--rc-paper)] py-20 lg:py-28">
    <div className="mx-auto max-w-4xl px-6 lg:px-10">
      <p className="rc-label text-[var(--rc-indigo-600)]">
        <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
        The Young People That We Support
      </p>
      <h2 className="rc-h2 mt-4">A fresh start, for a better future.</h2>
      <div className="mt-7 space-y-5 text-[var(--rc-ink-soft)] leading-relaxed">
        <p>
          The young people we work with come with us from a variety of situations. This may include directly from their family home, after previously failed placements, when struggling in care or during transition periods. They may be dealing with or have in the past experienced family issues, gang violence, substance abuse, physical, mental or sexual abuse, alcohol abuse, crime, mental health issues, and trauma. Our service users may still be attending school or college or are currently unable to access education for any reason.
        </p>
        <p>They may have already been in custody or are at risk of criminal action.</p>
        <p>
          We provide a fresh start. Something different that young people can engage with to forge a better future, while we ensure their basic needs, health, safety and well-being are safeguarded.
        </p>
      </div>
    </div>
  </section>
);

const HowWeSupport = () => (
  <section data-testid="home-how" className="bg-white py-20 lg:py-28">
    <div className="mx-auto max-w-6xl px-6 lg:px-10">
      <p className="rc-label text-[var(--rc-indigo-600)]">
        <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
        How We Support
      </p>
      <h2 className="rc-h2 mt-4">How We Support Young People in Need.</h2>
      <div className="mt-12 grid md:grid-cols-2 gap-7">
        {HOW_WE_SUPPORT.map((item, idx) => (
          <article
            key={item.title}
            data-testid="home-how-card"
            className="rounded-3xl bg-[var(--rc-paper)] p-8 lg:p-9"
          >
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--rc-indigo-500)]">
              0{idx + 1}
            </span>
            <h3 className="mt-3 font-heading font-bold text-[var(--rc-ink)] text-xl">{item.title}</h3>
            <p className="mt-4 text-sm text-[var(--rc-ink-soft)] leading-relaxed">{item.text}</p>
          </article>
        ))}
      </div>
      <p className="mt-12 text-[var(--rc-ink-soft)] leading-relaxed max-w-3xl">
        Our services are extensive and tailored to each young person and their needs. You can find more information about the range of services we provide on our Services page.
      </p>
      <Link to="/services" data-testid="home-services-link" className="rc-btn-pill mt-6 inline-flex">
        Services Page <ArrowRight size={ICON_SM} />
      </Link>
    </div>
  </section>
);

const PartnerAgencies = () => (
  <section data-testid="home-partners" className="bg-[var(--rc-paper)] py-20 lg:py-28">
    <div className="mx-auto max-w-5xl px-6 lg:px-10">
      <p className="rc-label text-[var(--rc-indigo-600)]">
        <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
        Partner Agencies
      </p>
      <h2 className="rc-h2 mt-4">Working with Partner Agencies to Identify Need and Provide Goal-Led Support.</h2>
      <p className="mt-6 text-[var(--rc-ink-soft)] leading-relaxed">
        We actively collaborate with other agencies and professionals to provide dedicated support. Some of the agencies we currently work with include:
      </p>
      <ul className="mt-8 grid sm:grid-cols-2 gap-3">
        {PARTNER_AGENCIES.map((agency) => (
          <li key={agency} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
            <Check size={18} className="text-[var(--rc-indigo-600)] mt-0.5 shrink-0" strokeWidth={3} />
            <span className="text-sm text-[var(--rc-ink)] leading-relaxed">{agency}</span>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-[var(--rc-ink-soft)] leading-relaxed">
        And more. We engage with numerous other agencies who work tirelessly to address issues and create opportunities for young people.
      </p>
    </div>
  </section>
);

const ClosingCallout = () => (
  <section data-testid="home-closing" className="bg-[var(--rc-indigo-900)] py-20 text-white">
    <div className="mx-auto max-w-4xl px-6 lg:px-10">
      <p className="rc-label text-[var(--rc-lavender)]">
        <span className="rc-label-line bg-[var(--rc-lavender)]" />
        Our Approach
      </p>
      <h2 className="rc-h2 mt-4 text-white">Practical and holistic approaches to get back on track.</h2>
      <div className="mt-7 space-y-5 text-white/80 leading-relaxed">
        <p>
          At Right Choice Services LTD we employ practical and holistic approaches to help young people get back on track. They might not be able to imagine a brighter future for themselves &mdash; We can.
        </p>
        <p>
          Our dedicated support staff, alongside relevant professionals, help young people build a firm foundation for future success while ensuring safety in the short term.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link to="/referrals" data-testid="home-refer-cta" className="rc-btn-pill">
          Referral Page <ArrowRight size={ICON_SM} />
        </Link>
        <Link to="/contact" data-testid="home-contact-cta" className="rc-btn-pill">
          Contact Page <ArrowRight size={ICON_SM} />
        </Link>
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <PageShell testId="home-page">
      <Hero />
      <TransformIntro />
      <WhoWeSupport />
      <HowWeSupport />
      <PartnerAgencies />
      <ClosingCallout />
    </PageShell>
  );
}
