import React from "react";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import ProjectsGrid from "../components/ProjectsGrid";
import Story from "../components/home/Story";
import Cta from "../components/home/Cta";

export default function ProjectsPage() {
  return (
    <div className="bg-cream">
      <SiteHeader />
      <main>
        <PageHeader title="Our Projects" crumbs={["Projects"]} />
        <ProjectsGrid />
        <Story />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
