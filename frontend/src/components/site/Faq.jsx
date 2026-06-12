import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/data/content";

export const Faq = () => {
  const mid = Math.ceil(FAQS.items.length / 2);
  const columns = [FAQS.items.slice(0, mid), FAQS.items.slice(mid)];

  return (
    <section id="faqs" data-testid="faq-section" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="rc-label text-[var(--rc-indigo-600)]">
            <span className="rc-label-line bg-[var(--rc-indigo-600)]" />
            {FAQS.label}
          </p>
          <h2 className="rc-h2 mt-4" data-testid="faq-title">{FAQS.title}</h2>
          <p className="mt-4 text-[var(--rc-ink-soft)]">{FAQS.description}</p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-x-10 gap-y-0 items-start">
          {columns.map((column, c) => (
            <Accordion key={c} type="single" collapsible className="space-y-4">
              {column.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`faq-${c}-${i}`}
                  data-testid="faq-item"
                  className="rounded-2xl border border-[var(--rc-lavender)]/30 bg-[var(--rc-paper)] px-7 data-[state=open]:border-[var(--rc-indigo-500)]"
                >
                  <AccordionTrigger className="font-heading font-bold text-[var(--rc-ink)] text-left hover:no-underline py-5">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[var(--rc-ink-soft)] leading-relaxed pb-6">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};
