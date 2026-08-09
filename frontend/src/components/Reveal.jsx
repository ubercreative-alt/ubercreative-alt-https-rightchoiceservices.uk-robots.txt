import React, { useEffect, useRef, useState } from "react";

// Scroll-reveal wrapper using IntersectionObserver.
export default function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${inView ? "in-view" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
