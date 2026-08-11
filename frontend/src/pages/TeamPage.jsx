import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
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
import florian from "@/assets/t-florian.jpg";
import deborah from "@/assets/t-deborah.jpg";
import linda from "@/assets/t-linda.jpg";
import shirley from "@/assets/t-shirley.jpg";
import tara from "@/assets/t-tara.jpg";
import arjan from "@/assets/t-arjan.jpg";
import robert from "@/assets/t-robert.jpg";

const PHOTO_MAP = { brikelda, erjona, eugen, fatmira, gentiana, riada, zoe, florian, deborah, linda, shirley, tara, arjan, robert };
const photoFor = (key) => PHOTO_MAP[key] || placeholder;

// ---- leadership spotlight (blue hero continuation) --------------------------

const LeaderCard = ({ leader }) => {
  const photo = leader.photoKey ? photoFor(leader.photoKey) : null;
  return (
    <article
      data-testid="leadership-card"
      className="rounded-[2rem] bg-white/[0.06] backdrop-blur-sm border border-white/10 p-7 lg:p-9 flex flex-col"
    >
      {photo && (
        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] mb-7 bg-[var(--rc-indigo-800)]">
          <img
            src={photo}
            alt={leader.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 25%" }}
          />
        </div>
      )}
      <h3 className="font-heading font-bold text-white text-2xl sm:text-3xl">{leader.name}</h3>
      <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--rc-lavender)]">
        {leader.role}
      </p>
      <div className="mt-5 space-y-4 text-white/80 leading-relaxed text-sm">
        {leader.bio.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
};

const LeadershipSpotlight = ({ leaders }) => {
  if (!leaders || leaders.length === 0) return null;
  return (
    <section
      data-testid="leadership-spotlight"
      className="relative bg-[var(--rc-indigo-900)] text-white pb-24 lg:pb-32 -mt-1"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <p className="rc-label text-[var(--rc-lavender)]">
          <span className="rc-label-line bg-[var(--rc-lavender)]" />
          Senior Management
        </p>
        <h2 className="rc-h2 mt-4 text-white">Meet Our Leadership.</h2>
        <div className="mt-10 grid lg:grid-cols-2 gap-7 items-start">
          {leaders.map((leader, idx) => (
            <Reveal key={leader.id} delay={idx * 0.12}>
              <LeaderCard leader={leader} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

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
          {members.map((member, idx) => (
            <Reveal key={member.id} delay={(idx % 3) * 0.1}>
              <RosterCard member={member} />
            </Reveal>
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
      <LeadershipSpotlight leaders={TEAM.leadership} />
      <TeamRoster members={TEAM.members} />
      <StaffTeamSection />
      <Specialisms />
      <Training />
      <WorkWithUs />
    </PageShell>
  );
}
