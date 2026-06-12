import { TopBar } from "@/components/site/TopBar";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { PartnersStrip } from "@/components/site/PartnersStrip";
import { WhoWeAre } from "@/components/site/WhoWeAre";
import { SupportPillars } from "@/components/site/SupportPillars";
import { Approach } from "@/components/site/Approach";
import { FeaturedServices } from "@/components/site/FeaturedServices";
import { Benefits } from "@/components/site/Benefits";
import { Process } from "@/components/site/Process";
import { Safeguarding } from "@/components/site/Safeguarding";
import { CtaContact } from "@/components/site/CtaContact";
import { Testimonials } from "@/components/site/Testimonials";
import { ServiceAreas } from "@/components/site/ServiceAreas";
import { Faq } from "@/components/site/Faq";
import { NewsSection } from "@/components/site/NewsSection";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <div data-testid="home-page" className="rc-site">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <PartnersStrip />
        <WhoWeAre />
        <SupportPillars />
        <Approach />
        <FeaturedServices />
        <Benefits />
        <Process />
        <Safeguarding />
        <CtaContact />
        <Testimonials />
        <ServiceAreas />
        <Faq />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
}
