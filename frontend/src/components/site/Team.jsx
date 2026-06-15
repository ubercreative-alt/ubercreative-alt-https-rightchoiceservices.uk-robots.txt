import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TEAM } from "@/data/content";
import placeholder from "@/assets/t-placeholder.svg";
import robert from "@/assets/t-robert.jpg";
import tara from "@/assets/t-placeholder.svg";
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
import teamMember1 from "@/assets/t-team-1.jpg";
import arjan from "@/assets/t-arjan.jpg";

const PHOTO_MAP = {
  robert,
  tara,
  florian,
  brikelda,
  deborah,
  erjona,
  eugen,
  fatmira,
  linda,
  riada,
  rita,
  gentiana,
  conrad,
  raze,
  zoe,
  shirley,
  teamMember1,
  arjan,
};

const photoFor = (key) => PHOTO_MAP[key] || placeholder;

const BioDialog = ({ member, photo }) => (
  <Dialog>
    <DialogTrigger asChild>
      <button
        data-testid="team-read-bio-btn"
        className="mt-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--rc-indigo-600)] hover:text-[var(--rc-indigo-800)] transition-colors"
      >
        Read Bio
      </button>
    </DialogTrigger>
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

const TeamCard = ({ member }) => {
  const photo = photoFor(member.photoKey);
  const hasPhoto = PHOTO_MAP[member.photoKey] && member.photoKey !== "tara" && member.photoKey !== "brikelda";
  const hasBio = Array.isArray(member.bio) && member.bio.length > 0;

  return (
    <article data-testid="team-card" className="group">
      <div className="relative rounded-3xl overflow-hidden aspect-[3/4] bg-[var(--rc-indigo-800)]">
        <img
          src={photo}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--rc-indigo-900)]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {!hasPhoto && (
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 text-[var(--rc-indigo-700)] text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5">
            Photo coming soon
          </span>
        )}
      </div>
      <div className="mt-5 text-center">
        <h3 className="font-heading font-bold text-[var(--rc-ink)] text-lg group-hover:text-[var(--rc-indigo-600)] transition-colors">
          {member.name}
        </h3>
        <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--rc-indigo-500)]">{member.role}</p>
        {hasBio && <BioDialog member={member} photo={photo} />}
      </div>
    </article>
  );
};

export const Team = () => (
  <section id="team" data-testid="team-section" className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="text-center max-w-3xl mx-auto">
        <p className="rc-label justify-center text-[var(--rc-indigo-600)]">
          <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
          {TEAM.label}
        </p>
        <h2 className="rc-h2 mt-4" data-testid="team-title">{TEAM.title}</h2>
        <p className="mt-4 text-[var(--rc-ink-soft)] leading-relaxed">{TEAM.description}</p>
      </div>

      <div className="mt-10 max-w-4xl mx-auto rounded-3xl bg-[var(--rc-paper)] p-7 lg:p-9 text-center" data-testid="team-staff-note">
        <p className="text-sm text-[var(--rc-ink-soft)] leading-relaxed">{TEAM.staffNote}</p>
      </div>

      <div className="mt-14 grid grid-cols-2 lg:grid-cols-3 gap-7">
        {TEAM.members.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  </section>
);
