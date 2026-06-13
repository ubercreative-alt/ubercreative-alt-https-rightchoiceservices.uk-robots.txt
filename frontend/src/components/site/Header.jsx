import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/content";
import logoMark from "@/assets/logo-mark.png";

export const Logo = () => (
  <Link to="/" data-testid="site-logo" className="flex items-center gap-3">
    <img src={logoMark} alt="Right Choice Services Ltd logo" className="h-12 w-auto" />
    <span className="font-heading font-bold leading-tight text-white">
      <span className="block text-lg tracking-wide">Right Choice</span>
      <span className="block text-[10px] uppercase tracking-[0.28em] text-[var(--rc-lavender)] font-semibold">Services Ltd</span>
    </span>
  </Link>
);

const navItemClass = ({ isActive }) =>
  `text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors ${
    isActive ? "text-[var(--rc-lavender)]" : "text-white/85 hover:text-[var(--rc-lavender)]"
  }`;

const DesktopNav = () => (
  <nav className="hidden lg:flex items-center gap-9" data-testid="desktop-nav">
    {NAV_LINKS.map((link) => (
      <NavLink key={link.label} to={link.href} end={link.href === "/"} className={navItemClass}>
        {link.label}
      </NavLink>
    ))}
  </nav>
);

const MobileNav = ({ onNavigate }) => (
  <nav data-testid="mobile-nav" className="lg:hidden bg-[var(--rc-indigo-900)] px-6 pb-6 space-y-1">
    {[...NAV_LINKS, { label: "Make a Referral", href: "/referrals" }].map((link) => (
      <NavLink
        key={link.label}
        to={link.href}
        end={link.href === "/"}
        onClick={onNavigate}
        className={({ isActive }) =>
          `block py-3 text-sm font-semibold uppercase tracking-widest border-b border-white/10 ${
            isActive ? "text-[var(--rc-lavender)]" : "text-white/85"
          }`
        }
      >
        {link.label}
      </NavLink>
    ))}
  </nav>
);

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Solid header on inner pages, transparent on home until scrolled
  const isSolid = scrolled || !isHome;

  return (
    <header
      data-testid="site-header"
      className={`fixed inset-x-0 z-50 transition-all duration-300 ${
        isSolid ? "top-0 bg-[#2a2566]/95 backdrop-blur-md shadow-lg shadow-black/20" : "top-0 md:top-11 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-20">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-3">
          <Link to="/contact" data-testid="header-contact-btn" className="hidden sm:inline-flex rc-btn-pill">
            Contact Us
          </Link>
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
