import { MapPin, PhoneCall, Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { CONTACT } from "@/data/content";

export const TopBar = () => (
  <div data-testid="topbar" className="hidden md:block bg-[var(--rc-indigo-950)] text-white/80 text-[13px]">
    <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-11">
      <div className="flex items-center gap-8">
        <span className="flex items-center gap-2">
          <MapPin size={14} className="text-[var(--rc-lavender)]" />
          {CONTACT.address}
        </span>
        <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-white transition-colors" data-testid="topbar-phone">
          <PhoneCall size={14} className="text-[var(--rc-lavender)]" />
          {CONTACT.phone}
        </a>
      </div>
      <div className="flex items-center gap-4">
        {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
          <a key={i} href="#home" aria-label="social link" className="hover:text-white transition-colors">
            <Icon size={14} />
          </a>
        ))}
      </div>
    </div>
  </div>
);
