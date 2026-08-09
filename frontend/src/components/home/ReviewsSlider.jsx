import React, { useEffect, useState, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Reveal from "../Reveal";
import { reviews } from "../../mock";

function usePerView() {
  const [pv, setPv] = useState(1);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPv(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return pv;
}

export default function ReviewsSlider() {
  const perView = usePerView();
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, reviews.items.length - perView);

  const clamp = useCallback((i) => (i < 0 ? maxIndex : i > maxIndex ? 0 : i), [maxIndex]);

  useEffect(() => { setIndex((i) => Math.min(i, maxIndex)); }, [maxIndex]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => clamp(i + 1)), 5000);
    return () => clearInterval(id);
  }, [clamp]);

  return (
    <section className="bg-cream-100 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-block text-brand font-semibold tracking-[0.2em] text-sm mb-4">{reviews.eyebrow}</span>
            <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl leading-tight">{reviews.title}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 ring-1 ring-black/5">
              <GoogleG />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-extrabold text-ink text-xl">{reviews.rating}</span>
                  <span className="flex">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="h-4 w-4 fill-[#fbbc04] text-[#fbbc04]" />))}</span>
                </div>
                <div className="text-xs text-mute">{reviews.totalReviews}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIndex((i) => clamp(i - 1))} aria-label="Previous" className="grid place-items-center h-11 w-11 rounded-full bg-white ring-1 ring-black/5 text-ink hover:bg-brand hover:text-white transition-colors"><ChevronLeft className="h-5 w-5" /></button>
              <button onClick={() => setIndex((i) => clamp(i + 1))} aria-label="Next" className="grid place-items-center h-11 w-11 rounded-full bg-white ring-1 ring-black/5 text-ink hover:bg-brand hover:text-white transition-colors"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>
        </Reveal>

        <div className="overflow-hidden">
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * (100 / perView)}%)` }}>
            {reviews.items.map((r) => (
              <div key={r.name + r.date} className="shrink-0 px-3" style={{ width: `${100 / perView}%` }}>
                <div className="h-full rounded-3xl bg-white ring-1 ring-black/5 p-8 shadow-sm hover:shadow-xl transition-shadow flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={r.avatar} alt={r.name} className="h-12 w-12 rounded-full object-cover" />
                      <div>
                        <div className="font-heading font-bold text-ink leading-tight">{r.name}</div>
                        <div className="text-xs text-mute">{r.role}</div>
                      </div>
                    </div>
                    <GoogleG />
                  </div>
                  <div className="flex items-center gap-1 mt-5">
                    {Array.from({ length: r.rating }).map((_, i) => (<Star key={i} className="h-4 w-4 fill-[#fbbc04] text-[#fbbc04]" />))}
                    <span className="ml-2 text-xs text-mute">{r.date}</span>
                  </div>
                  <p className="mt-4 text-ink/80 leading-relaxed flex-1">{r.text}</p>
                  <Quote className="h-8 w-8 text-brand/15 mt-4 self-end" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} aria-label={`Go to slide ${i + 1}`} className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-brand" : "w-2.5 bg-brand/25"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GoogleG() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}
