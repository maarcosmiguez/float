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
    <div className="inline-flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/80 backdrop-blur px-4 py-2 text-[0.72rem] font-bold uppercase tracking-widest">
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
        className="text-zinc-400 hover:text-dopamina-amarillo border-l border-zinc-800 pl-3 duration-150"
      >
        On demand →
      </a>
    </div>
  );
};
