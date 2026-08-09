import React, { useRef, useState, useCallback, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

// Draggable before/after image comparison slider.
export default function BeforeAfterSlider({ before, after, beforeLabel = "Before", afterLabel = "After", className = "" }) {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(50); // percentage
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    setPos(pct);
  }, []);

  const onDown = (e) => {
    dragging.current = true;
    updateFromClientX(e.touches ? e.touches[0].clientX : e.clientX);
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      updateFromClientX(e.touches ? e.touches[0].clientX : e.clientX);
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-3xl h-[360px] md:h-[520px] ${className}`}
      onMouseDown={onDown}
      onTouchStart={onDown}
    >
      {/* After (base) */}
      <img src={after} alt={afterLabel} draggable={false} className="absolute inset-0 h-full w-full object-cover" />
      <span className="absolute top-4 right-4 z-10 bg-ink/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full">{afterLabel}</span>

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt={beforeLabel} draggable={false} style={{ width: containerRef.current ? containerRef.current.clientWidth : "100%", maxWidth: "none" }} className="h-full object-cover" />
        <span className="absolute top-4 left-4 bg-brand text-white text-xs font-semibold px-3 py-1.5 rounded-full">{beforeLabel}</span>
      </div>

      {/* Handle */}
      <div className="absolute top-0 bottom-0 z-20 -ml-0.5" style={{ left: `${pos}%` }}>
        <div className="h-full w-1 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]" />
        <button
          aria-label="Drag to compare"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center h-12 w-12 rounded-full bg-white text-brand shadow-xl cursor-ew-resize ring-4 ring-white/40"
          onMouseDown={onDown}
          onTouchStart={onDown}
        >
          <MoveHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
