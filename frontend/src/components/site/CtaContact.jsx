import { ContactForm } from "@/components/site/ContactForm";
import { CONTACT } from "@/data/content";

export const CtaContact = () => (
  <section id="contact" data-testid="contact-section" className="bg-[var(--rc-paper)] py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="relative rounded-[2.5rem] bg-[var(--rc-indigo-800)] overflow-hidden">
        <div className="absolute -right-20 -top-24 w-80 h-80 rounded-full bg-white/[0.05]" />
        <div className="absolute left-10 -bottom-28 w-72 h-72 rounded-full bg-white/[0.05]" />

        <div className="relative grid lg:grid-cols-2 gap-12 p-10 lg:p-16 items-center">
          <div>
            <p className="rc-label text-[var(--rc-lavender)]">
              <span className="rc-label-line bg-[var(--rc-lavender)]" />
              Get Started Today
            </p>
            <h2 className="rc-h2 mt-4 text-white" data-testid="contact-title">
              Refer a young person to us today.
            </h2>
            <p className="mt-5 text-white/70 leading-relaxed max-w-lg">
              If you're an agency or professional wanting to refer a young person to Right Choice
              Services Ltd, or you have any questions about the services we offer, please don't
              hesitate to get in touch.
            </p>
            <div className="mt-8 space-y-2 text-white/80 text-sm">
              <p data-testid="contact-phone">Tel: {CONTACT.phone} &nbsp;·&nbsp; Mobile: {CONTACT.mobile}</p>
              <p data-testid="contact-email">Email: {CONTACT.email}</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
);
