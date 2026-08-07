"use client";

import { useEffect, useRef } from "react";

const SECTIONS = ["home", "planes", "contenido", "somos"];

export default () => {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id);
        const bar = barsRef.current[i];
        if (!el || !bar) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height || 1;
        const seen = Math.min(Math.max(vh * 0.5 - rect.top, 0), total);
        bar.style.width = `${(seen / total) * 100}%`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] flex gap-1 px-3 pt-1.5 pointer-events-none">
      {SECTIONS.map((id, i) => (
        <div key={id} className="flex-1 h-[3px] rounded-full bg-white/10 overflow-hidden">
          <div
            ref={(el) => {
              barsRef.current[i] = el;
            }}
            className="h-full w-0 bg-dopamina-amarillo transition-[width] duration-150 ease-linear"
          />
        </div>
      ))}
    </div>
  );
};
