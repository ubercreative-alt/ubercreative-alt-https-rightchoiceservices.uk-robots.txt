import { Mail, PhoneCall, MapPin } from "lucide-react";
import { Logo } from "@/components/site/Header";
import { SocialLinks } from "@/components/site/SocialLinks";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { CONTACT, FOOTER } from "@/data/content";
import { ICON_SM } from "@/constants/ui";

const LinkColumn = ({ title, links, testId }) => (
  <div data-testid={testId}>
    <h4 className="font-heading font-bold text-white text-lg">{title}</h4>
    <ul className="mt-6 space-y-3.5">
      {links.map((link) => (
        <li key={link.label}>
          <a href={link.href} className="text-sm text-white/65 hover:text-[var(--rc-lavender)] transition-colors">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const FooterContact = () => (
  <div>
    <Logo />
    <p className="mt-6 text-sm text-white/65 leading-relaxed max-w-sm">{FOOTER.about}</p>
    <ul className="mt-6 space-y-3 text-sm text-white/80">
      <li className="flex items-center gap-3">
        <Mail size={ICON_SM} className="text-[var(--rc-lavender)]" />
        <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors" data-testid="footer-email">{CONTACT.email}</a>
      </li>
      <li className="flex items-center gap-3">
        <PhoneCall size={ICON_SM} className="text-[var(--rc-lavender)]" />
        <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors" data-testid="footer-phone">{CONTACT.phone} · {CONTACT.mobile}</a>
      </li>
      <li className="flex items-start gap-3">
        <MapPin size={ICON_SM} className="text-[var(--rc-lavender)] mt-0.5" />
        <span data-testid="footer-address">{CONTACT.address}</span>
      </li>
    </ul>
  </div>
);

const FooterBottom = () => (
  <div className="mt-16 pt-7 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[13px] text-white/55">
    <p data-testid="footer-copyright">© {new Date().getFullYear()} Right Choice Services Ltd. All rights reserved.</p>
    <p>Supporting young people in North London, Essex &amp; Medway</p>
  </div>
);

export const Footer = () => (
  <footer data-testid="site-footer" className="bg-[var(--rc-indigo-900)] relative overflow-hidden">
    <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-white/[0.03]" />
    <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr] gap-12">
        <FooterContact />
        <LinkColumn title="Quick Links" links={FOOTER.quickLinks} testId="footer-quick-links" />
        <LinkColumn title="Featured Links" links={FOOTER.featuredLinks} testId="footer-featured-links" />
        <div>
          <h4 className="font-heading font-bold text-white text-lg">Subscribe Our Newsletter</h4>
          <p className="mt-4 text-sm text-white/65">Get our latest updates and news about supporting young people.</p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
          <div className="mt-7">
            <SocialLinks variant="circle" />
          </div>
        </div>
      </div>
      <FooterBottom />
    </div>
  </footer>
);
