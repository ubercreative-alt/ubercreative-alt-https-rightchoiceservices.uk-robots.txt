import { PageShell, PageHero } from "@/components/site/PageShell";
import { NewsSection } from "@/components/site/NewsSection";

export default function News() {
  return (
    <PageShell testId="news-page">
      <PageHero
        testId="news-hero"
        label="News & Insights"
        title="Latest news from Right Choice Services."
        description="Stories, insights and updates from our support team on safeguarding, outreach and helping young people transition to independence."
      />
      <NewsSection />
    </PageShell>
  );
}
