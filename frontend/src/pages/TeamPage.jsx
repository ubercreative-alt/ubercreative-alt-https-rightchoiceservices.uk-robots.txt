import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { TEAM } from "@/data/content";
import { ICON_SM } from "@/constants/ui";
import placeholder from "@/assets/t-placeholder.svg";
import brikelda from "@/assets/t-brikelda.jpg";
import erjona from "@/assets/t-erjona.jpg";
import eugen from "@/assets/t-eugen.jpg";
import fatmira from "@/assets/t-fatmira.jpg";
import gentiana from "@/assets/t-gentiana.jpg";
import riada from "@/assets/t-riada.jpg";
import zoe from "@/assets/t-zoe.jpg";

const PHOTO_MAP = { brikelda, erjona, eugen, fatmira, gentiana, riada, zoe };
const photoFor = (key) => PHOTO_MAP[key] || placeholder;

// ---- roster card ------------------------------------------------------------

const RosterCard = ({ member }) => {
  const photo = photoFor(member.photoKey);
  return (
    <article data-testid="team-roster-card" className="flex flex-col">
      <div className="relative rounded-3xl overflow-hidden aspect-[3/4] bg-[var(--rc-indigo-800)]">
        <img
          src={photo}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 25%" }}
        />
      </div>
      <h3 className="mt-6 font-heading font-bold text-[var(--rc-ink)] text-xl">{member.name}</h3>
      <p className="mt-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--rc-indigo-500)]">
        {member.role}
      </p>
      <p className="mt-4 text-sm text-[var(--rc-ink-soft)] leading-relaxed">{member.bio}</p>
    </article>
  );
};

const TeamRoster = ({ members }) => {
  if (!members || members.length === 0) return null;
  return (
    <section data-testid="team-roster" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="rc-label text-[var(--rc-indigo-600)]">
          <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
          Meet the Team
        </p>
        <h2 className="rc-h2 mt-4">Our people, in their own words.</h2>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {members.map((member) => (
            <RosterCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ---- unchanged sections -----------------------------------------------------

const StaffTeamSection = () => (
  <section data-testid="staff-team" className="bg-[var(--rc-paper)] py-20 lg:py-28">
    <div className="mx-auto max-w-4xl px-6 lg:px-10">
      <p className="rc-label text-[var(--rc-indigo-600)]">
        <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
        Our Staff Team
      </p>
      <h2 className="rc-h2 mt-4">Effective care and support, at all times.</h2>
      <p className="mt-6 text-[var(--rc-ink-soft)] leading-relaxed">{TEAM.staffNote}</p>
      <h3 className="mt-10 font-heading font-bold text-[var(--rc-ink)] text-xl">Other Staff Roles:</h3>
      <ul className="mt-5 space-y-3">
        {TEAM.staffRoles.map((role) => (
          <li key={role} className="flex items-start gap-3 text-[var(--rc-ink)]">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--rc-indigo-600)] shrink-0" />
            <span className="text-sm leading-relaxed">{role}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const Specialisms = () => (
  <section data-testid="specialisms" className="bg-white py-20 lg:py-28">
    <div className="mx-auto max-w-4xl px-6 lg:px-10">
      <p className="rc-label text-[var(--rc-indigo-600)]">
        <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
        Staff Team Specialisms
      </p>
      <h2 className="rc-h2 mt-4">{TEAM.specialisms.title}.</h2>
      <p className="mt-6 text-[var(--rc-ink-soft)] leading-relaxed">{TEAM.specialisms.text}</p>
    </div>
  </section>
);

const Training = () => (
  <section data-testid="training" className="bg-[var(--rc-paper)] py-20 lg:py-28">
    <div className="mx-auto max-w-4xl px-6 lg:px-10">
      <p className="rc-label text-[var(--rc-indigo-600)]">
        <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
        Staff Training & Development
      </p>
      <h2 className="rc-h2 mt-4">{TEAM.training.title}.</h2>
      <p className="mt-6 text-[var(--rc-ink-soft)] leading-relaxed">{TEAM.training.text}</p>
    </div>
  </section>
);

const WorkWithUs = () => (
  <section data-testid="work-with-us" className="bg-[var(--rc-indigo-900)] py-20 text-white">
    <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
      <Mail size={32} className="mx-auto text-[var(--rc-lavender)]" />
      <h2 className="rc-h2 mt-5 text-white">{TEAM.workWithUs.title}</h2>
      <p className="mt-5 text-white/75 max-w-2xl mx-auto">{TEAM.workWithUs.text}</p>
      <Link to="/contact" data-testid="work-with-us-cta" className="rc-btn-pill mt-8 inline-flex">
        Contact Page <ArrowRight size={ICON_SM} />
      </Link>
    </div>
  </section>
);

// ---- page -------------------------------------------------------------------

export default function TeamPage() {
  return (
    <PageShell testId="team-page">
      <PageHero
        testId="team-hero"
        label="Our Team"
        title="The Right Choice Services Team."
        description={TEAM.description}
      />
      <TeamRoster members={TEAM.members} />
      <StaffTeamSection />
      <Specialisms />
      <Training />
      <WorkWithUs />
    </PageShell>
  );
}
