import React from "react";
import { Link } from "react-router-dom";
import { Hammer } from "lucide-react";

// Logo for JK PRO Builders. Swap the emblem for the official logo image when provided.
export default function Logo({ light = false, className = "" }) {
  return (
    <Link to="/fixhome" className={`flex items-center gap-2.5 group ${className}`}>
      <span className="grid place-items-center h-10 w-10 rounded-full bg-brand text-white shadow-lg shadow-brand/30 transition-transform duration-300 group-hover:scale-105">
        <Hammer className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <span className="leading-none">
        <span className={`block font-heading font-extrabold text-[19px] tracking-tight ${light ? "text-white" : "text-ink"}`}>
          JK PRO <span className="text-brand">Builders</span>
        </span>
        <span className={`block text-[10px] tracking-[0.25em] uppercase mt-0.5 ${light ? "text-white/60" : "text-mute"}`}>Renovation &amp; Remodeling</span>
      </span>
    </Link>
  );
}
