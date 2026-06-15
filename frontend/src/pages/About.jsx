import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { ICON_SM } from "@/constants/ui";

const ABOUT_HERO_IMG =
  "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1200&q=70";

const Section = ({ label, title, children, dark, testId }) => (
  <section
    data-testid={testId}
    className={`py-20 lg:py-28 ${dark ? "bg-[var(--rc-indigo-900)] text-white" : "bg-[var(--rc-paper)] text-[var(--rc-ink)]"}`}
  >
    <div className="mx-auto max-w-5xl px-6 lg:px-10">
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

const PlacementList = () => {
  const items = [
    "Supported accommodation for 16–18 year olds, including twenty-four-hour supervised units",
    "Shared accommodation for 18–21 year olds with floating support",
    "Emergency placements with a comprehensive placement agreement in place within 72 hours",
  ];
  return (
    <ul className="mt-8 space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[var(--rc-ink-soft)]">
          <Check size={18} className="text-[var(--rc-indigo-600)] mt-0.5 shrink-0" strokeWidth={3} />
          <span className="text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default function About() {
  return (
    <PageShell testId="about-page">
      <PageHero
        testId="about-hero"
        label="About Us"
        title="Welcome to Right Choice Services Ltd."
        description="Where our commitment is to provide exceptional supported accommodation in and around the South East of England as well as bespoke support services to young people."
      />

      <section data-testid="about-intro" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-[1fr_1.05fr] gap-14 items-center">
          <div className="relative">
            <img
              src={ABOUT_HERO_IMG}
              alt="Support worker speaking with a young person"
              className="rounded-[2rem] w-full h-[520px] object-cover shadow-xl shadow-[var(--rc-indigo-900)]/10"
            />
            <div className="absolute -bottom-6 -right-6 hidden md:block w-40 h-40 rounded-full bg-[var(--rc-lavender)]/25 -z-0" />
          </div>
          <div>
            <p className="rc-label text-[var(--rc-indigo-600)]">
              <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
              About Us – Right Choice Services Ltd
            </p>
            <h2 className="rc-h2 mt-4">A diverse range of young individuals.</h2>
            <p className="mt-6 text-[var(--rc-ink-soft)] leading-relaxed">
              At Right Choice Services Ltd, we specialise in catering to the unique needs of a diverse range of young individuals, offering a comprehensive range of support to empower them on their journey towards independence.
            </p>
          </div>
        </div>
      </section>

      <Section
        testId="about-mission"
        label="Our Mission"
        title="A helping and supportive hand for young people."
        dark
      >
        <p>
          At Right Choice Services Ltd, we recognise the challenges that young people face when entering supported accommodation and we are dedicated to making this transition smoother. Our mission is to extend a helping and supportive hand to these young individuals. We offer professional and socially recognised adult support systems tailored to address the complex needs they often encounter during this critical phase of their lives.
        </p>
        <p>
          We understand that the journey from childhood to young adulthood can be daunting, especially for those leaving care. Our focus is on providing a safe and nurturing environment where young people can explore their individuality, learn from their experiences, and develop essential life skills at their own pace.
        </p>
      </Section>

      <Section
        testId="about-what-we-provide"
        label="What We Provide"
        title="Bespoke support designed for real progress."
      >
        <p>
          Our services are designed to cater to the specific needs of young people under the care of Local Authorities. We offer assistance in developing and maintaining lifelong self-care and life skills. Our approach to pathway planning goes beyond documentation – we create robust daily action placement plans to ensure real and meaningful progress.
        </p>
        <p>
          We provide both physical and emotional space for young people to be themselves, make mistakes, and learn from them without fear of ridicule. We believe that having personal space is essential for young individuals to manage their lives on a day-to-day basis, allowing them a fair chance to discover and develop their potential through trial and error.
        </p>
        <p>Our placement options are diverse and include:</p>
        <PlacementList />
        <p className="mt-8">
          At Right Choice Services Ltd, we strive to create a positive and supportive environment that enables young people to embark on their journey towards a brighter and more independent future.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/services" className="rc-btn-pill" data-testid="about-services-cta">
            Our Services <ArrowRight size={ICON_SM} />
          </Link>
          <Link to="/referrals" className="rc-btn-pill" data-testid="about-referral-cta">
            Make a Referral <ArrowRight size={ICON_SM} />
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
