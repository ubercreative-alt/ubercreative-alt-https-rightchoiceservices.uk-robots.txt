import React, { useEffect, useRef, useState } from "react";

// Scroll-reveal wrapper with directional entrance animations (Elementor-style).
// Guarantees the hidden state paints before animating so the motion is always visible.
export default function Reveal({ children, className = "", delay = 0, variant = "up", as: Tag = "div" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // Wait two frames so the initial hidden transform is painted,
            // then flip to in-view so the CSS transition actually animates.
            requestAnimationFrame(() =>
              requestAnimationFrame(() => setInView(true))
            );
            obs.unobserve(e.target);
          }
        });
      },
      // Trigger a little before the element fully enters, and once ~12% is visible.
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal reveal--${variant} ${inView ? "in-view" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
