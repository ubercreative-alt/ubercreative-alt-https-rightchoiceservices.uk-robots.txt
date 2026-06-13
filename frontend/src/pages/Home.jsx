import { ArrowRight, HeartHandshake, Compass, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/site/PageShell";
import { Hero } from "@/components/site/Hero";
import { PartnersStrip } from "@/components/site/PartnersStrip";
import { WHO_WE_ARE, SERVICES, TEAM, NEWS } from "@/data/content";
import { ICON_MD, ICON_SM } from "@/constants/ui";

const PREVIEW_CARDS = [
  {
    icon: HeartHandshake,
    label: "About Us",
    title: "Who we are",
    text: "A distinctive programme devoted to the welfare and development of young people leaving care or custody.",
    href: "/about",
    testId: "preview-about",
  },
  {
    icon: Compass,
    label: "Services",
    title: "What we provide",
    text: "Supported accommodation, keywork, outreach and life-skills development tailored to every young person.",
    href: "/services",
    testId: "preview-services",
  },
  {
    icon: Users,
    label: "Our Team",
    title: "Meet the team",
    text: "Experienced support workers and leaders dedicated to safeguarding and developing young lives.",
    href: "/team",
    testId: "preview-team",
  },
  {
    icon: ShieldCheck,
    label: "Referrals",
    title: "Make a referral",
    text: "Refer a young person directly and easily — we'll review and respond with next steps.",
    href: "/referrals",
    testId: "preview-referrals",
  },
];

const PreviewSection = () => (
  <section data-testid="home-previews" className="bg-[var(--rc-paper)] py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="max-w-2xl">
        <p className="rc-label text-[var(--rc-indigo-600)]">
          <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
          Explore the Site
        </p>
        <h2 className="rc-h2 mt-4">Everything we offer, in one place.</h2>
        <p className="mt-5 text-[var(--rc-ink-soft)] leading-relaxed">
          Browse the pages below to learn more about who we are, how we support young people, and how to work with us.
        </p>
      </div>
      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PREVIEW_CARDS.map(({ icon: Icon, ...card }) => (
          <Link
            key={card.title}
            to={card.href}
            data-testid={card.testId}
            className="group rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
          >
            <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[var(--rc-indigo-50,#eef0ff)] text-[var(--rc-indigo-600)]">
              <Icon size={ICON_MD} />
            </span>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--rc-indigo-500)]">{card.label}</p>
            <h3 className="mt-2 font-heading font-bold text-[var(--rc-ink)] text-xl group-hover:text-[var(--rc-indigo-600)] transition-colors">
              {card.title}
            </h3>
            <p className="mt-3 text-sm text-[var(--rc-ink-soft)] leading-relaxed">{card.text}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--rc-indigo-600)]">
              Learn More <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const HomeIntro = () => (
  <section data-testid="home-intro" className="bg-white py-24 lg:py-28">
    <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
      <p className="rc-label justify-center text-[var(--rc-indigo-600)]">
        <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
        {WHO_WE_ARE.label}
      </p>
      <h2 className="rc-h2 mt-4">{WHO_WE_ARE.title}</h2>
      <p className="mt-6 text-[var(--rc-ink-soft)] leading-relaxed">{WHO_WE_ARE.description}</p>
      <Link to="/about" className="rc-btn-pill mt-9 inline-flex" data-testid="home-about-cta">
        About Right Choice <ArrowRight size={ICON_SM} />
      </Link>
    </div>
  </section>
);

const HomeNewsPreview = () => (
  <section data-testid="home-news-preview" className="bg-[var(--rc-paper)] py-24 lg:py-28">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <p className="rc-label text-[var(--rc-indigo-600)]">
            <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
            {NEWS.label}
          </p>
          <h2 className="rc-h2 mt-4">{NEWS.title}</h2>
        </div>
        <Link to="/news" className="rc-btn-pill" data-testid="home-news-all">
          View All News <ArrowRight size={ICON_SM} />
        </Link>
      </div>
      <div className="mt-14 grid md:grid-cols-3 gap-7">
        {NEWS.items.slice(0, 3).map((post) => (
          <article
            key={post.title}
            data-testid="home-news-card"
            className="group rounded-3xl bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
          >
            <div className="relative h-52 overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute top-5 left-5 rounded-xl bg-[var(--rc-indigo-700)] text-white text-center px-4 py-2 leading-tight">
                <span className="block font-heading font-bold text-lg">{post.date}</span>
                <span className="block text-[11px] uppercase tracking-wider text-[var(--rc-lavender)]">{post.month}</span>
              </span>
            </div>
            <div className="p-7">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--rc-indigo-500)]">{post.category}</span>
              <h3 className="mt-3 font-heading font-bold text-[var(--rc-ink)] text-lg leading-snug group-hover:text-[var(--rc-indigo-600)] transition-colors">
                {post.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const HomeServicesPreview = () => (
  <section data-testid="home-services-preview" className="bg-white py-24 lg:py-28">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="max-w-2xl">
        <p className="rc-label text-[var(--rc-indigo-600)]">
          <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
          {SERVICES.label}
        </p>
        <h2 className="rc-h2 mt-4">{SERVICES.title}</h2>
      </div>
      <div className="mt-14 grid md:grid-cols-3 gap-7">
        {SERVICES.items.map((item) => (
          <div key={item.title} className="rounded-3xl bg-[var(--rc-paper)] p-8">
            <h3 className="font-heading font-bold text-[var(--rc-ink)] text-lg">{item.title}</h3>
            <p className="mt-3 text-sm text-[var(--rc-ink-soft)] leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Link to="/services" className="rc-btn-pill" data-testid="home-services-cta">
          See All Services <ArrowRight size={ICON_SM} />
        </Link>
      </div>
    </div>
  </section>
);

const HomeTeamPreview = () => (
  <section data-testid="home-team-preview" className="bg-[var(--rc-indigo-900)] py-24 lg:py-28 text-white">
    <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
      <div>
        <p className="rc-label text-[var(--rc-lavender)]">
          <span className="rc-label-line bg-[var(--rc-lavender)]" />
          {TEAM.label}
        </p>
        <h2 className="rc-h2 mt-4 text-white">{TEAM.title}</h2>
        <p className="mt-5 text-white/75 leading-relaxed max-w-lg">{TEAM.description}</p>
        <Link to="/team" className="rc-btn-pill mt-9 inline-flex" data-testid="home-team-cta">
          Meet the Team <ArrowRight size={ICON_SM} />
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {TEAM.members.slice(0, 6).map((member) => (
          <div key={member.id} className="rounded-2xl bg-white/10 p-4 text-center">
            <p className="font-heading font-bold text-white text-sm">{member.name}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[var(--rc-lavender)]">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <PageShell testId="home-page">
      <Hero />
      <PartnersStrip />
      <HomeIntro />
      <PreviewSection />
      <HomeServicesPreview />
      <HomeTeamPreview />
      <HomeNewsPreview />
    </PageShell>
  );
}
