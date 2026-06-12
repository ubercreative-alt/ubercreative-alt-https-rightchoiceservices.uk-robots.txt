import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, PhoneCall, Facebook, Twitter, Youtube, Instagram, MapPin } from "lucide-react";
import { Logo } from "@/components/site/Header";
import { CONTACT, FOOTER } from "@/data/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

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

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/newsletter`, { email });
      toast.success("Thank you for subscribing!");
      setEmail("");
    } catch {
      toast.error("Subscription failed. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <footer data-testid="site-footer" className="bg-[var(--rc-indigo-900)] relative overflow-hidden">
      <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-white/[0.03]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr] gap-12">
          <div>
            <Logo />
            <p className="mt-6 text-sm text-white/65 leading-relaxed max-w-sm">{FOOTER.about}</p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-[var(--rc-lavender)]" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors" data-testid="footer-email">{CONTACT.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <PhoneCall size={15} className="text-[var(--rc-lavender)]" />
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors" data-testid="footer-phone">{CONTACT.phone} · {CONTACT.mobile}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[var(--rc-lavender)] mt-0.5" />
                <span data-testid="footer-address">{CONTACT.address}</span>
              </li>
            </ul>
          </div>

          <LinkColumn title="Quick Links" links={FOOTER.quickLinks} testId="footer-quick-links" />
          <LinkColumn title="Featured Links" links={FOOTER.featuredLinks} testId="footer-featured-links" />

          <div>
            <h4 className="font-heading font-bold text-white text-lg">Subscribe Our Newsletter</h4>
            <p className="mt-4 text-sm text-white/65">Get our latest updates and news about supporting young people.</p>
            <form onSubmit={subscribe} className="mt-6 flex rounded-full bg-white/10 border border-white/15 p-1.5" data-testid="newsletter-form">
              <input
                data-testid="newsletter-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/45 outline-none min-w-0"
              />
              <button
                type="submit"
                disabled={sending}
                data-testid="newsletter-submit-btn"
                className="rounded-full bg-gradient-to-r from-[var(--rc-lavender)] to-[var(--rc-indigo-500)] px-6 py-2.5 text-[12px] font-bold uppercase tracking-wider text-white disabled:opacity-60"
              >
                {sending ? "..." : "Subscribe"}
              </button>
            </form>
            <div className="mt-7 flex items-center gap-3">
              {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#home" aria-label="social link" className="grid place-items-center w-10 h-10 rounded-full border border-white/20 text-white/70 hover:bg-[var(--rc-lavender)] hover:text-[var(--rc-indigo-900)] hover:border-transparent transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-7 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[13px] text-white/55">
          <p data-testid="footer-copyright">© {new Date().getFullYear()} Right Choice Services Ltd. All rights reserved.</p>
          <p>Supporting young people in North London, Essex &amp; Medway</p>
        </div>
      </div>
    </footer>
  );
};
