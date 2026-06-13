import { PageShell, PageHero } from "@/components/site/PageShell";
import { Faq } from "@/components/site/Faq";

export default function FaqPage() {
  return (
    <PageShell testId="faq-page">
      <PageHero
        testId="faq-hero"
        label="FAQs"
        title="Frequently asked questions."
        description="Answers to the questions agencies, social workers and professionals ask us most often."
      />
      <Faq />
    </PageShell>
  );
}
