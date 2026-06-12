import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TEAM } from "@/data/content";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import team5 from "@/assets/team-5.jpg";
import team6 from "@/assets/team-6.jpg";
import team7 from "@/assets/team-7.jpg";
import team8 from "@/assets/team-8.jpg";
import team9 from "@/assets/team-9.jpg";

const PHOTOS = [team1, team2, team3, team4, team5, team6, team7, team8, team9];

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

const TeamCard = ({ member, photo }) => (
  <article data-testid="team-card" className="group">
    <div className="relative rounded-3xl overflow-hidden aspect-[3/4]">
      <img
        src={photo}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ objectPosition: "center 30%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--rc-indigo-900)]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <div className="mt-5 text-center">
      <h3 className="font-heading font-bold text-[var(--rc-ink)] text-lg group-hover:text-[var(--rc-indigo-600)] transition-colors">
        {member.name}
      </h3>
      <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--rc-indigo-500)]">{member.role}</p>
      {member.bio && <BioDialog member={member} photo={photo} />}
    </div>
  </article>
);

export const Team = () => (
  <section id="team" data-testid="team-section" className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="text-center max-w-2xl mx-auto">
        <p className="rc-label justify-center text-[var(--rc-indigo-600)]">
          <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
          {TEAM.label}
        </p>
        <h2 className="rc-h2 mt-4" data-testid="team-title">{TEAM.title}</h2>
        <p className="mt-4 text-[var(--rc-ink-soft)] leading-relaxed">{TEAM.description}</p>
      </div>

      <div className="mt-14 grid grid-cols-2 lg:grid-cols-3 gap-7">
        {TEAM.members.map((member, i) => (
          <TeamCard key={member.id} member={member} photo={PHOTOS[i]} />
        ))}
      </div>
    </div>
  </section>
);
