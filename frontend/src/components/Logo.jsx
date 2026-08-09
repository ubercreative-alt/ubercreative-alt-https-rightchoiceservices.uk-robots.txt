import React from "react";
import { Link } from "react-router-dom";

// Official JK PRO Builders / All Trade Construction logo.
// Uses the white version on dark backgrounds (light=true) and the burgundy version otherwise.
export default function Logo({ light = false, className = "" }) {
  return (
    <Link to="/fixhome" className={`inline-flex items-center ${className}`} aria-label="JK PRO Builders - All Trade Construction">
      <img
        src={light ? "/logo-white.png" : "/logo.png"}
        alt="JK PRO Builders - All Trade Construction"
        className="h-11 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-[1.03]"
      />
    </Link>
  );
}
