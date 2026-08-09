import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Clock, Mail, Facebook, Instagram, Twitter, Linkedin, ChevronDown, ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { brand, nav, socials } from "../mock";
import {
  Sheet, SheetContent, SheetTrigger,
} from "./ui/sheet";

const iconMap = { facebook: Facebook, instagram: Instagram, twitter: Twitter, linkedin: Linkedin };

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to) => location.pathname === to || (to === "/fixhome" && location.pathname === "/");

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="hidden lg:block bg-ink text-white/80 text-[13px]">
        <div className="max-w-7xl mx-auto px-6 h-11 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-white/90">{brand.welcome}</span>
            <span className="h-4 w-px bg-white/20" />
            <span className="inline-flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-brand" />{brand.hours}</span>
            <span className="h-4 w-px bg-white/20" />
            <a href={`mailto:${brand.email}`} className="inline-flex items-center gap-2 hover:text-white"><Mail className="h-3.5 w-3.5 text-brand" />{brand.email}</a>
          </div>
          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Ic = iconMap[s.icon];
              return (
                <a key={s.label} href={s.href} aria-label={s.label} className="text-white/70 hover:text-brand transition-colors">
                  <Ic className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={`transition-all duration-300 ${scrolled ? "fixed top-0 left-0 right-0 bg-ink/95 backdrop-blur-md shadow-xl" : ""}`}>
        <div className={`${scrolled ? "" : "lg:mt-4"} max-w-7xl mx-auto px-4`}>
          <div className={`${scrolled ? "bg-transparent rounded-none" : "lg:bg-white/10 lg:backdrop-blur-md lg:rounded-full"} flex items-center justify-between px-4 lg:px-6 h-[74px] ${scrolled ? "" : "lg:ring-1 lg:ring-white/15"}`}>
            <Logo light />

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {nav.map((item) => (
                <div key={item.label} className="relative group">
                  <Link
                    to={item.to}
                    className={`inline-flex items-center gap-1 px-4 py-2 text-[15px] font-medium rounded-full transition-colors ${isActive(item.to) ? "text-brand" : "text-white/90 hover:text-brand"}`}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="h-3.5 w-3.5" />}
                  </Link>
                  {item.children && (
                    <div className="absolute left-0 top-full pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
                      <div className="min-w-[230px] bg-white rounded-xl shadow-2xl ring-1 ring-black/5 overflow-hidden py-2">
                        {item.children.map((c) => (
                          <Link key={c.label + c.to} to={c.to} className="block px-5 py-2.5 text-[14px] text-ink hover:bg-brand hover:text-white transition-colors">
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link to="/contact" className="hidden sm:inline-flex items-center gap-2 bg-brand hover:bg-brand-600 text-white pl-5 pr-2 py-2 rounded-full text-[15px] font-semibold transition-colors">
                Get In Touch
                <span className="grid place-items-center h-7 w-7 rounded-full bg-white/20"><ArrowUpRight className="h-4 w-4" /></span>
              </Link>

              {/* Mobile menu */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger className="lg:hidden grid place-items-center h-11 w-11 rounded-full bg-white/10 text-white">
                  <Menu className="h-5 w-5" />
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-ink border-l border-white/10 p-0">
                  <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
                    <Logo light />
                  </div>
                  <nav className="px-3 py-4">
                    {nav.map((item) => (
                      <div key={item.label} className="py-1">
                        <Link to={item.to} onClick={() => setOpen(false)} className="block px-3 py-2.5 text-white/90 font-medium hover:text-brand">
                          {item.label}
                        </Link>
                        {item.children && (
                          <div className="pl-4">
                            {item.children.map((c) => (
                              <Link key={c.label + c.to} to={c.to} onClick={() => setOpen(false)} className="block px-3 py-2 text-white/60 text-sm hover:text-brand">
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <Link to="/contact" onClick={() => setOpen(false)} className="mt-4 inline-flex w-full justify-center items-center gap-2 bg-brand text-white py-3 rounded-full font-semibold">
                      Get In Touch <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
