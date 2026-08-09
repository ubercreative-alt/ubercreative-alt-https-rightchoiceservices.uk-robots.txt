import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin, ArrowUpRight, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { brand, socials, marquee } from "../mock";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const iconMap = { facebook: Facebook, instagram: Instagram, twitter: Twitter, linkedin: Linkedin };

export default function Footer() {
  const onSubscribe = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const email = new FormData(formEl).get("email");
    if (!email) return;
    try {
      await axios.post(`${API}/subscribe`, { email });
      formEl.reset();
      toast.success("Thanks for subscribing!", { description: `We'll keep ${email} posted on renovation tips.` });
    } catch (err) {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <footer className="relative bg-ink text-white/70 overflow-hidden">
      {/* Marquee band */}
      <div className="border-y border-white/10 py-6 overflow-hidden">
        <div className="marquee-track gap-10">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
            <span key={i} className="inline-flex items-center gap-10 text-2xl md:text-4xl font-heading font-extrabold text-white/90 whitespace-nowrap">
              {m}
              <span className="h-2.5 w-2.5 rounded-full bg-brand" />
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo light />
          <p className="mt-5 text-sm leading-relaxed">
            Trusted home renovation &amp; remodeling specialists delivering craftsmanship you can live in — on time and on budget.
          </p>
          <div className="flex items-center gap-3 mt-6">
            {socials.map((s) => {
              const Ic = iconMap[s.icon];
              return (
                <a key={s.label} href={s.href} aria-label={s.label} className="grid place-items-center h-10 w-10 rounded-full bg-white/10 hover:bg-brand transition-colors text-white">
                  <Ic className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-white font-heading font-bold text-lg mb-5">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {[["Home", "/fixhome"], ["About Us", "/about"], ["Services", "/services"], ["Projects", "/projects"], ["Contact", "/contact"]].map(([l, t]) => (
              <li key={l}><Link to={t} className="inline-flex items-center gap-2 hover:text-brand transition-colors"><ArrowRight className="h-3.5 w-3.5 text-brand" />{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-heading font-bold text-lg mb-5">Get In Touch</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3"><MapPin className="h-4 w-4 text-brand mt-0.5" />{brand.address}</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-brand" /><a href={`tel:${brand.phone}`} className="hover:text-brand">{brand.phone}</a></li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-brand" /><a href={`mailto:${brand.email}`} className="hover:text-brand">{brand.email}</a></li>
            <li className="flex items-center gap-3"><Clock className="h-4 w-4 text-brand" />{brand.hours}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-heading font-bold text-lg mb-5">Newsletter</h4>
          <p className="text-sm mb-4">Subscribe for renovation tips and exclusive offers.</p>
          <form onSubmit={onSubscribe} className="relative">
            <input name="email" type="email" required placeholder="Your email address" className="w-full bg-white/10 rounded-full pl-5 pr-14 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-brand" />
            <button type="submit" aria-label="Subscribe" className="absolute right-1.5 top-1.5 grid place-items-center h-9 w-9 rounded-full bg-brand hover:bg-brand-600 text-white transition-colors">
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
          <a href={brand.websiteUrl} className="inline-block mt-5 text-sm text-white/80 hover:text-brand">{brand.website}</a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <span>© {new Date().getFullYear()} {brand.name}. All Rights Reserved.</span>
          <div className="flex items-center gap-5">
            <Link to="/fixhome" className="hover:text-brand">Privacy Policy</Link>
            <Link to="/fixhome" className="hover:text-brand">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
