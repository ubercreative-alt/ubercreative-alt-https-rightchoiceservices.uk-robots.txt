import { PageShell, PageHero } from "@/components/site/PageShell";
import { SupportPillars } from "@/components/site/SupportPillars";
import { FeaturedServices } from "@/components/site/FeaturedServices";
import { Benefits } from "@/components/site/Benefits";
import { Process } from "@/components/site/Process";
import { ServiceAreas } from "@/components/site/ServiceAreas";

export default function Services() {
  return (
    <PageShell testId="services-page">
      <PageHero
        testId="services-hero"
        label="Our Services"
        title="Tailored support, built around every young person."
        description="From planning and safeguarding to identifying and meeting specific needs — our services are extensive and tailored to each young person we work with."
      />
      <SupportPillars />
      <FeaturedServices />
      <Benefits />
      <Process />
      <ServiceAreas />
    </PageShell>
  );
}
