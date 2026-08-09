import React from "react";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import TrustedExperts from "../components/home/TrustedExperts";
import ProcessDark from "../components/home/ProcessDark";
import Testimonials from "../components/home/Testimonials";
import Cta from "../components/home/Cta";

export default function AboutPage() {
  return (
    <div className="bg-cream">
      <SiteHeader />
      <main>
        <PageHeader title="About Us" crumbs={["About Us"]} />
        <TrustedExperts />
        <ProcessDark />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
