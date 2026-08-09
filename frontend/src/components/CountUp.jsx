import React, { useEffect, useRef, useState } from "react";

// Animated counter that triggers when scrolled into view.
// Accepts values like "500+", "15K", "1250", "4.9".
export default function CountUp({ value, duration = 1600 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const match = String(value).match(/^([0-9]*\.?[0-9]+)(.*)$/);
    if (!match) { setDisplay(String(value)); return; }
    const target = parseFloat(match[1]);
    const suffix = match[2] || "";
    const decimals = (match[1].split(".")[1] || "").length;
    const el = ref.current;
    if (!el) return;
    let raf; let started = false;

    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const current = target * eased;
        setDisplay(current.toFixed(decimals) + suffix);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) { started = true; run(); obs.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
