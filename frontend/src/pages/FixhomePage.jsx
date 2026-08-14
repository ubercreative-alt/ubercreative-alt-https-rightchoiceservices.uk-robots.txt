import React from "react";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import Hero from "../components/home/Hero";
import TrustedExperts from "../components/home/TrustedExperts";
import Services from "../components/home/Services";
import ProcessDark from "../components/home/ProcessDark";
import Challenges from "../components/home/Challenges";
import Story from "../components/home/Story";
import RealProjects from "../components/home/RealProjects";
import Testimonials from "../components/home/Testimonials";
import ReviewsSlider from "../components/home/ReviewsSlider";
import Faq from "../components/home/Faq";
import ProcessSteps from "../components/home/ProcessSteps";
import Blog from "../components/home/Blog";
import Cta from "../components/home/Cta";

export default function FixhomePage() {
  return (
    <div className="bg-cream">
      <SiteHeader />
      <main>
        <Hero />
        <TrustedExperts />
        <Services />
        <ProcessDark />
        <Challenges />
        <Story />
        <RealProjects />
        <Testimonials />
        <ReviewsSlider />
        <Faq />
        <ProcessSteps />
        <Blog />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
