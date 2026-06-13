import { PageShell, PageHero } from "@/components/site/PageShell";
import { Team } from "@/components/site/Team";

export default function TeamPage() {
  return (
    <PageShell testId="team-page">
      <PageHero
        testId="team-hero"
        label="Our Team"
        title="Meet the dedicated people behind Right Choice."
        description="Our experienced support workers and leaders bring decades of combined experience in safeguarding, social care, keywork and youth development."
      />
      <Team />
    </PageShell>
  );
}
