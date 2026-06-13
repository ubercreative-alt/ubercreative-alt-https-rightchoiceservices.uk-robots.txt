import { PageShell, PageHero } from "@/components/site/PageShell";
import { WhoWeAre } from "@/components/site/WhoWeAre";
import { Approach } from "@/components/site/Approach";
import { Safeguarding } from "@/components/site/Safeguarding";
import { Testimonials } from "@/components/site/Testimonials";

export default function About() {
  return (
    <PageShell testId="about-page">
      <PageHero
        testId="about-hero"
        label="About Us"
        title="About Right Choice Services."
        description="A distinctive programme devoted to the welfare and development of young individuals navigating the transition from the care of local authorities and/or custody across the South East of England."
      />
      <WhoWeAre />
      <Approach />
      <Safeguarding />
      <Testimonials />
    </PageShell>
  );
}
