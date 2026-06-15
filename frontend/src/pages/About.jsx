import { PageShell, PageHero } from "@/components/site/PageShell";
import { WhoWeAre } from "@/components/site/WhoWeAre";
import { Approach } from "@/components/site/Approach";
import { Safeguarding } from "@/components/site/Safeguarding";

export default function About() {
  return (
    <PageShell testId="about-page">
      <PageHero
        testId="about-hero"
        label="About Us"
        title="About Right Choice Services Ltd."
        description="Welcome to Right Choice Services Ltd, where our commitment is to provide exceptional supported accommodation and bespoke support services to young people across the South East of England."
      />
      <WhoWeAre />
      <Approach />
      <Safeguarding />
    </PageShell>
  );
}
