import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/content";
import logoMark from "@/assets/logo-mark.png";

export const Logo = () => (
  <a href="/" data-testid="site-logo" className="flex items-center gap-3">
    <img src={logoMark} alt="Right Choice Services Ltd logo" className="h-12 w-auto" />
    <span className="font-heading font-bold leading-tight text-white">
      <span className="block text-lg tracking-wide">Right Choice</span>
      <span className="block text-[10px] uppercase tracking-[0.28em] text-[var(--rc-lavender)] font-semibold">Services Ltd</span>
    </span>
  </a>
);

const DesktopNav = () => (
  <nav className="hidden lg:flex items-center gap-9" data-testid="desktop-nav">
    {NAV_LINKS.map((link) => (
      <a
        key={link.label}
        href={link.href}
        className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/85 hover:text-[var(--rc-lavender)] transition-colors"
      >
        {link.label}
      </a>
    ))}
  </nav>
);

const MobileNav = ({ onNavigate }) => (
  <nav data-testid="mobile-nav" className="lg:hidden bg-[var(--rc-indigo-900)] px-6 pb-6 space-y-1">
    {[...NAV_LINKS, { label: "Contact Us", href: "/#contact" }].map((link) => (
      <a
        key={link.label}
        href={link.href}
        onClick={onNavigate}
        className="block py-3 text-sm font-semibold uppercase tracking-widest text-white/85 border-b border-white/10"
      >
        {link.label}
      </a>
    ))}
  </nav>
);

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // `onScroll` is declared inside the effect and `setScrolled` is a stable
    // setter, so the listener only needs to be attached once.
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`fixed inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "top-0 bg-[#2a2566]/95 backdrop-blur-md shadow-lg shadow-black/20" : "top-0 md:top-11 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-20">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-3">
          <a href="/#contact" data-testid="header-contact-btn" className="hidden sm:inline-flex rc-btn-pill">
            Contact Us
          </a>
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
      {open && <MobileNav onNavigate={() => setOpen(false)} />}
    </header>
  );
};
