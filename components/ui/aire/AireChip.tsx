"use client";

import { useEffect, useState } from "react";
import { estadoAire, type EstadoAire } from "./aire";

export default () => {
  const [estado, setEstado] = useState<EstadoAire | null>(null);

  useEffect(() => {
    let vivo = true;
    const tick = () => {
      estadoAire().then((e) => {
        if (vivo) setEstado(e);
      });
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => {
      vivo = false;
      clearInterval(id);
    };
  }, []);

  const live = estado?.live === true;

  return (
    <div className="relative z-30 inline-flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/80 backdrop-blur px-4 py-2 text-[0.72rem] font-bold uppercase tracking-widest">
      <span
        className={`w-2 h-2 rounded-full shrink-0 ${
          live
            ? "bg-red-500 animate-pulse motion-reduce:animate-none"
            : "bg-zinc-600"
        }`}
      />
      <span className={live ? "text-white" : "text-zinc-400"}>
        {estado === null
          ? "SEÑAL"
          : live
          ? `EN VIVO · ${estado.show.nombre}`
          : "FUERA DE AIRE"}
      </span>
      <span
        className="hidden sm:flex items-end gap-[2px] h-3.5"
        aria-hidden="true"
      >
        {[30, 60, 45, 80].map((h, i) => (
          <i
            key={i}
            className={`w-[3px] rounded-sm bg-dopamina-verde-fluo origin-bottom ${
              live ? "animate-[vu_0.9s_ease-in-out_infinite_alternate] motion-reduce:animate-none" : ""
            }`}
            style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
      <span className="text-zinc-500 border-l border-zinc-800 pl-3 tabular-nums">
        {estado?.hhmm ?? "--:--"}
      </span>
      <a
        href="https://www.youtube.com/@estoesdopamina/videos"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-dopamina-amarillo hover:text-yellow-300 border-l border-zinc-800 pl-3 duration-150"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" /></svg>
        On demand
      </a>
    </div>
  );
};
