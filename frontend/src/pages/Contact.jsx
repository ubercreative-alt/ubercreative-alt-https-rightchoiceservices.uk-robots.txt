import { Mail, PhoneCall, MapPin } from "lucide-react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { ContactForm } from "@/components/site/ContactForm";
import { CONTACT } from "@/data/content";

const ContactDetails = () => (
  <div data-testid="contact-details">
    <h2 className="rc-h2">Get in touch.</h2>
    <p className="mt-5 text-[var(--rc-ink-soft)] leading-relaxed max-w-md">
      If you&apos;re an agency or professional wanting to refer a young person to Right Choice Services Ltd, or you have any
      questions about the services we offer, please don&apos;t hesitate to get in touch.
    </p>
    <ul className="mt-10 space-y-5 text-sm text-[var(--rc-ink)]">
      <li className="flex items-start gap-4">
        <span className="grid place-items-center w-11 h-11 rounded-2xl bg-[var(--rc-indigo-50,#eef0ff)] text-[var(--rc-indigo-600)] shrink-0">
          <PhoneCall size={18} />
        </span>
        <div>
          <p className="font-bold uppercase tracking-[0.16em] text-[11px] text-[var(--rc-indigo-500)]">Call Us</p>
          <p className="mt-1.5" data-testid="contact-page-phone">
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-[var(--rc-indigo-600)]">{CONTACT.phone}</a>
            &nbsp;·&nbsp;
            <a href={`tel:${CONTACT.mobile.replace(/\s/g, "")}`} className="hover:text-[var(--rc-indigo-600)]">{CONTACT.mobile}</a>
          </p>
        </div>
      </li>
      <li className="flex items-start gap-4">
        <span className="grid place-items-center w-11 h-11 rounded-2xl bg-[var(--rc-indigo-50,#eef0ff)] text-[var(--rc-indigo-600)] shrink-0">
          <Mail size={18} />
        </span>
        <div>
          <p className="font-bold uppercase tracking-[0.16em] text-[11px] text-[var(--rc-indigo-500)]">Email Us</p>
          <a href={`mailto:${CONTACT.email}`} className="mt-1.5 inline-block hover:text-[var(--rc-indigo-600)]" data-testid="contact-page-email">
            {CONTACT.email}
          </a>
        </div>
      </li>
      <li className="flex items-start gap-4">
        <span className="grid place-items-center w-11 h-11 rounded-2xl bg-[var(--rc-indigo-50,#eef0ff)] text-[var(--rc-indigo-600)] shrink-0">
          <MapPin size={18} />
        </span>
        <div>
          <p className="font-bold uppercase tracking-[0.16em] text-[11px] text-[var(--rc-indigo-500)]">Visit Us</p>
          <p className="mt-1.5" data-testid="contact-page-address">{CONTACT.address}</p>
        </div>
      </li>
    </ul>
  </div>
);

export default function Contact() {
  return (
    <PageShell testId="contact-page">
      <PageHero
        testId="contact-hero"
        label="Contact"
        title="We'd love to hear from you."
        description="Reach our team directly for referrals, partnerships or any question about our supported accommodation and keywork services."
      />
      <section className="bg-[var(--rc-paper)] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-[1fr_1.2fr] gap-14 items-start">
          <ContactDetails />
          <div className="rounded-[2rem] bg-[var(--rc-indigo-800)] p-8 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
