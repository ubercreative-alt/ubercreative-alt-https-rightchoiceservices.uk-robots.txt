import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ICON_SM } from "@/constants/ui";

const PARTNER_AGENCIES = [
  "The Police",
  "Social Services",
  "Educational establishments",
  "Mental Health Teams",
  "Youth Offending Teams (see the Youth Justice Board for England and Wales)",
  "Barnados",
  "The Inside Out Programme",
  "Safer Neighborhoods Teams",
  "Enable (Drug Addiction Services)",
];

const KEY_SERVICES = [
  {
    title: "Dedicated Accommodation and Living Support",
    items: [
      "High-quality supported accommodation for 16-18 year old and 18yrs+",
      "Designated support hours",
      "24/7/365 support worker contact",
      "Responsible adult support",
      "Outreach Work",
      "Escorting young people (to appointments, court proceedings and more)",
      "Keyworking support, life and independent living skill development",
    ],
  },
  {
    title: "Support Planning and Administration",
    items: [
      "Undertaking administrative tasks, verifying information and responding to queries",
      "Ongoing assessment of need/development during the duration of placement",
      "Consultation with Education / Training / Employment worker",
      "Assessing the needs of young people, and planning and delivering programmes related to areas such as health, fitness, smoking, drugs, gang affiliation/risk, relationships and bullying.",
      "Support/Pathway plan",
      "Casework to process in support of diversion from re-offending",
      "Exit planning with transition support",
      "End of placement report.",
    ],
  },
  {
    title: "Working With Our Service Users",
    items: [
      "Managing and administering youth and community projects and resources",
      "Running arts-based activities, community/environmental projects, residential activities, outdoor education and sporting activities",
      "Befriending and supporting individuals in various settings",
      "Mentoring and supporting individuals to encourage social inclusion",
      "Offering counselling to individuals",
      "Outreach workers engage with young people in restaurants and cafés and on the street to make contact with alienated and 'at risk' groups who reject formal activities.",
    ],
  },
  {
    title: "Other Related Services",
    items: [
      "Recruiting, training and managing staff, including volunteers",
      "Working with parents and community groups to win support for improved provision and acting as an advocate for young people's interests",
      "Identifying and pursuing sources of funding for projects to improve services and/or resources for young people",
      "Drawing up business plans, writing reports and formal presentations to funding bodies.",
    ],
  },
];

const OurServicesIntro = () => (
  <section data-testid="services-intro" className="bg-white py-20 lg:py-28">
    <div className="mx-auto max-w-4xl px-6 lg:px-10">
      <p className="rc-label text-[var(--rc-indigo-600)]">
        <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
        Our Services
      </p>
      <h2 className="rc-h2 mt-4">Our Services.</h2>
      <p className="mt-6 text-[var(--rc-ink-soft)] leading-relaxed">
        Right Choice Services LTD offers a unique service that provides for young people with specific and individual needs. We assist our young adults to re-settle in the wider community and reach their potential. Services will be needs-led and within the framework of looked-after children.
      </p>

      <h3 className="mt-12 font-heading font-bold text-[var(--rc-ink)] text-2xl">Right Choice Services LTD Services</h3>
      <p className="mt-5 text-[var(--rc-ink-soft)] leading-relaxed">
        Our services are comprehensive and bespoke packages within a dedicated framework are put together with each young person&apos;s needs in mind.
      </p>
    </div>
  </section>
);

const PartnerAgencies = () => (
  <section data-testid="services-partners" className="bg-[var(--rc-paper)] py-20 lg:py-28">
    <div className="mx-auto max-w-5xl px-6 lg:px-10">
      <p className="rc-label text-[var(--rc-indigo-600)]">
        <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
        Working With Other Agencies
      </p>
      <h2 className="rc-h2 mt-4">Working With Other Agencies.</h2>
      <p className="mt-6 text-[var(--rc-ink-soft)] leading-relaxed">
        We work closely with social services, the police and other agencies and professionals to offer dedicated support when needed. These include but are not limited to:
      </p>
      <ul className="mt-8 grid sm:grid-cols-2 gap-3">
        {PARTNER_AGENCIES.map((agency, idx) => (
          <Reveal key={agency} delay={(idx % 4) * 0.06} as="li" className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
            <Check size={18} className="text-[var(--rc-indigo-600)] mt-0.5 shrink-0" strokeWidth={3} />
            <span className="text-sm text-[var(--rc-ink)] leading-relaxed">{agency}</span>
          </Reveal>
        ))}
      </ul>
      <p className="mt-8 text-[var(--rc-ink-soft)] leading-relaxed">
        And numerous other agencies working to address issues and promote opportunities for young people.
      </p>
      <p className="mt-5 text-[var(--rc-ink-soft)] leading-relaxed">
        Years of fostering positive interactions and collaborating with other professionals have helped us to identify and put into place additional services that other agencies don&apos;t have the budget, staff or remit for.
      </p>
    </div>
  </section>
);

const KeyServicesGrid = () => (
  <section data-testid="services-key" className="bg-white py-20 lg:py-28">
    <div className="mx-auto max-w-6xl px-6 lg:px-10">
      <p className="rc-label text-[var(--rc-indigo-600)]">
        <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
        Highlighting Key Services
      </p>
      <h2 className="rc-h2 mt-4">Highlighting Key Services.</h2>
      <p className="mt-6 max-w-3xl text-[var(--rc-ink-soft)] leading-relaxed">
        Below is an outline of many of the services we currently offer. These include all aspects of planning, safeguarding, administration, identifying and meeting specific needs and more. This is by no means an exhaustive list.
      </p>

      <div className="mt-14 grid md:grid-cols-2 gap-7">
        {KEY_SERVICES.map((group, idx) => (
          <Reveal key={group.title} delay={(idx % 2) * 0.12}>
            <div data-testid="services-key-card" className="rounded-3xl bg-[var(--rc-paper)] p-8 lg:p-10">
              <h3 className="font-heading font-bold text-[var(--rc-ink)] text-xl">{group.title}</h3>
              <ul className="mt-6 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[var(--rc-ink-soft)]">
                    <Check size={16} className="text-[var(--rc-indigo-600)] mt-0.5 shrink-0" strokeWidth={3} />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const ServicesCta = () => (
  <section className="bg-[var(--rc-indigo-900)] py-16">
    <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center text-white">
      <p className="font-heading font-bold text-2xl">
        You can refer a young person to us directly through our referral page.
      </p>
      <p className="mt-3 text-white/75">Questions? Get in touch with us via our contact page.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/referrals" className="rc-btn-pill" data-testid="services-referral-cta">
          Referral Page <ArrowRight size={ICON_SM} />
        </Link>
        <Link to="/contact" className="rc-btn-pill" data-testid="services-contact-cta">
          Contact Page <ArrowRight size={ICON_SM} />
        </Link>
      </div>
    </div>
  </section>
);

export default function Services() {
  return (
    <PageShell testId="services-page">
      <PageHero
        testId="services-hero"
        label="Services"
        title="Our Services."
        description="A unique service that provides for young people with specific and individual needs."
      />
      <OurServicesIntro />
      <PartnerAgencies />
      <KeyServicesGrid />
      <ServicesCta />
    </PageShell>
  );
}
