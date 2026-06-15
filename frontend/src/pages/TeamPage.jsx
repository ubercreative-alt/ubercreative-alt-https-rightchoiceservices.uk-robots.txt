import { PageShell, PageHero } from "@/components/site/PageShell";
import { Team } from "@/components/site/Team";

export default function TeamPage() {
  return (
    <PageShell testId="team-page">
      <PageHero
        testId="team-hero"
        label="Our Team"
        title="The Right Choice Services Team."
        description="Here at Right Choice Services LTD, we are incredibly proud of our staff and their level of professionalism, care and respect. Our ethos is to ensure that all staff are well-equipped to undertake their role safely and confidently."
      />
      <Team />
    </PageShell>
  );
}
