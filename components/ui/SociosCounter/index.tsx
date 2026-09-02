"use client";

import { useEffect, useRef, useState } from "react";
import { getSociosCount } from "./getSociosCount";

export default () => {
  const target = useRef(getSociosCount()).current;
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setDisplay(target);
      return;
    }

    const start = Math.max(target - 120, 0);
    const duration = 1100;
    let frame: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (target - start) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    setDisplay(start);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span
        className="font-display text-dopamina-amarillo text-6xl sm:text-8xl tabular-nums"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {display.toLocaleString("es-UY")}
      </span>
      <span className="text-zinc-400 text-sm tracking-wide">
        suscriptores mensuales hasta ayer
      </span>
    </div>
  );
};
