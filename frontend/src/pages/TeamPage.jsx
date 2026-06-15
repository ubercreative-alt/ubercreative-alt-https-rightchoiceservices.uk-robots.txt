import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { TEAM } from "@/data/content";
import { ICON_SM } from "@/constants/ui";
import placeholder from "@/assets/t-placeholder.svg";
import robert from "@/assets/t-robert.jpg";
import tara from "@/assets/t-tara.jpg";
import florian from "@/assets/t-florian.jpg";
import brikelda from "@/assets/t-placeholder.svg";
import deborah from "@/assets/t-deborah.jpg";
import erjona from "@/assets/t-erjona.jpg";
import eugen from "@/assets/t-eugen.jpg";
import fatmira from "@/assets/t-fatmira.jpg";
import linda from "@/assets/t-linda.jpg";
import riada from "@/assets/t-riada.jpg";
import rita from "@/assets/t-rita.jpg";
import gentiana from "@/assets/t-gentiana.jpg";
import conrad from "@/assets/t-conrad.jpg";
import raze from "@/assets/t-raze.jpg";
import zoe from "@/assets/t-zoe.jpg";
import shirley from "@/assets/t-shirley.jpg";
import arjan from "@/assets/t-arjan.jpg";

const PHOTO_MAP = {
  robert, tara, florian, brikelda, deborah, erjona, eugen, fatmira,
  linda, riada, rita, gentiana, conrad, raze, zoe, shirley, arjan,
};

const photoFor = (key) => PHOTO_MAP[key] || placeholder;
const memberById = (members, id) => members.find((m) => m.id === id);

// ---- shared sub-components ---------------------------------------------------

const BioDialog = ({ member, photo, trigger }) => (
  <Dialog>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent data-testid="team-bio-dialog" className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl">
      <DialogHeader>
        <div className="flex items-center gap-4">
          <img src={photo} alt={member.name} className="w-16 h-16 rounded-2xl object-cover" style={{ objectPosition: "center 30%" }} />
          <div>
            <DialogTitle className="font-heading font-bold text-[var(--rc-ink)] text-xl text-left">{member.name}</DialogTitle>
            <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--rc-indigo-500)] text-left">{member.role}</p>
          </div>
        </div>
      </DialogHeader>
      <div className="space-y-4 text-sm text-[var(--rc-ink-soft)] leading-relaxed">
        {member.bio.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);

// Large feature card used for Senior Management Team + Key Staff
const FeatureCard = ({ member }) => {
  const photo = photoFor(member.photoKey);
  return (
    <article data-testid="team-feature-card" className="grid sm:grid-cols-[280px_1fr] gap-7 items-start rounded-[2rem] bg-white p-6 sm:p-8 shadow-sm">
      <div className="relative rounded-3xl overflow-hidden aspect-[3/4] sm:aspect-[4/5] bg-[var(--rc-indigo-800)]">
        <img src={photo} alt={member.name} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 25%" }} />
      </div>
      <div>
        <h3 className="font-heading font-bold text-[var(--rc-ink)] text-2xl">{member.name}</h3>
        <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--rc-indigo-500)]">{member.role}</p>
        <div className="mt-5 space-y-4 text-sm text-[var(--rc-ink-soft)] leading-relaxed">
          {member.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
};

// Small grid card for the rest of the staff
const StaffCard = ({ member }) => {
  const photo = photoFor(member.photoKey);
  const hasPhoto = PHOTO_MAP[member.photoKey] && member.photoKey !== "brikelda";
  const hasBio = Array.isArray(member.bio) && member.bio.length > 0;
  return (
    <article data-testid="team-card" className="group">
      <div className="relative rounded-3xl overflow-hidden aspect-[3/4] bg-[var(--rc-indigo-800)]">
        <img src={photo} alt={member.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: "center 30%" }} />
        {!hasPhoto && (
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 text-[var(--rc-indigo-700)] text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5">
            Photo coming soon
          </span>
        )}
      </div>
      <div className="mt-5 text-center">
        <h3 className="font-heading font-bold text-[var(--rc-ink)] text-lg">{member.name}</h3>
        <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--rc-indigo-500)]">{member.role}</p>
        {hasBio && (
          <BioDialog
            member={member}
            photo={photo}
            trigger={
              <button data-testid="team-read-bio-btn" className="mt-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--rc-indigo-600)] hover:text-[var(--rc-indigo-800)] transition-colors">
                Read Bio
              </button>
            }
          />
        )}
      </div>
    </article>
  );
};

// ---- page sections ----------------------------------------------------------

const SeniorManagement = ({ members }) => {
  const arjanMember = memberById(members, "arjan");
  const taraMember = memberById(members, "tara");
  if (!arjanMember || !taraMember) return null;
  return (
    <section data-testid="senior-management" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <p className="rc-label text-[var(--rc-indigo-600)]">
          <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
          Senior Management Team
        </p>
        <h2 className="rc-h2 mt-4">Senior Management Team.</h2>
        <div className="mt-12 grid lg:grid-cols-2 gap-7">
          <FeatureCard member={arjanMember} />
          <FeatureCard member={taraMember} />
        </div>
      </div>
    </section>
  );
};

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

const KeyStaff = ({ members }) => {
  const florianMember = memberById(members, "florian-shabanaj");
  const conradMember = memberById(members, "conrad-rowe");
  if (!florianMember || !conradMember) return null;
  return (
    <section data-testid="key-staff" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <p className="rc-label text-[var(--rc-indigo-600)]">
          <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
          Key Staff
        </p>
        <h2 className="rc-h2 mt-4">Examples of Other Key Staff Within Right Choice Services LTD.</h2>
        <div className="mt-12 grid lg:grid-cols-2 gap-7">
          <FeatureCard member={florianMember} />
          <FeatureCard member={conradMember} />
        </div>
      </div>
    </section>
  );
};

const FEATURED_IDS = new Set(["arjan", "tara", "florian-shabanaj", "conrad-rowe"]);

const StaffGrid = ({ members }) => {
  const rest = members.filter((m) => !FEATURED_IDS.has(m.id));
  if (rest.length === 0) return null;
  return (
    <section data-testid="staff-grid" className="bg-[var(--rc-paper)] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="rc-label text-[var(--rc-indigo-600)]">
          <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
          Our Team
        </p>
        <h2 className="rc-h2 mt-4">More of the team.</h2>
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-3 gap-7">
          {rest.map((member) => (
            <StaffCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

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
      <SeniorManagement members={TEAM.members} />
      <StaffTeamSection />
      <KeyStaff members={TEAM.members} />
      <StaffGrid members={TEAM.members} />
      <Specialisms />
      <Training />
      <WorkWithUs />
    </PageShell>
  );
}
