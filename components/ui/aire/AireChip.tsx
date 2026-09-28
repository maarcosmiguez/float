"use client";

import { useEffect, useState } from "react";
import { estadoAire, type EstadoAire } from "./aire";

const YtIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#FF0000] shrink-0" aria-hidden="true">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" />
  </svg>
);

const Vumetro = ({ activo }: { activo: boolean }) => (
  <span className="hidden sm:flex items-end gap-[2px] h-3.5" aria-hidden="true">
    {[30, 60, 45, 80].map((h, i) => (
      <i
        key={i}
        className={`w-[3px] rounded-sm bg-dopamina-verde-fluo origin-bottom ${
          activo ? "animate-[vu_0.9s_ease-in-out_infinite_alternate] motion-reduce:animate-none" : ""
        }`}
        style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </span>
);

const Reloj = ({ hhmm }: { hhmm?: string }) => (
  <span className="text-dopamina-tinta-3 border-l border-dopamina-linea pl-3 tabular-nums">
    {hhmm ?? "--:--"}
  </span>
);

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

  const base =
    "relative z-30 inline-flex items-center gap-3 rounded-full border backdrop-blur px-4 py-2 text-[0.72rem] font-bold uppercase tracking-widest";

  // EN VIVO: el chip entero es un link al vivo, y se nota que se entra.
  if (estado?.live) {
    return (
      <a
        href={estado.liveUrl ?? "https://www.youtube.com/@estoesdopamina/streams"}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border-red-500/60 bg-dopamina-panel/80 hover:border-red-400 hover:bg-dopamina-panel duration-150 group`}
      >
        <span className="w-2 h-2 rounded-full shrink-0 bg-red-500 animate-pulse motion-reduce:animate-none" />
        <span className="text-white">EN VIVO · {estado.show.nombre}</span>
        <Vumetro activo />
        <Reloj hhmm={estado.hhmm} />
        <span className="inline-flex items-center gap-1.5 text-red-400 group-hover:text-red-300 border-l border-dopamina-linea pl-3 duration-150">
          Entrar <span aria-hidden="true">→</span>
        </span>
      </a>
    );
  }

  const upcoming = estado && !estado.live ? estado.upcoming : null;

  return (
    <div className={`${base} border-dopamina-linea bg-dopamina-panel/80`}>
      <span
        className={`w-2 h-2 rounded-full shrink-0 ${
          upcoming ? "bg-dopamina-celeste" : "bg-dopamina-tinta-3"
        }`}
      />
      <span className={upcoming ? "text-white" : "text-dopamina-tinta-2"}>
        {estado === null
          ? "SEÑAL"
          : upcoming
          ? `PRÓXIMO VIVO${upcoming.inicioTxt ? ` · ${upcoming.inicioTxt}` : ""}`
          : "FUERA DE AIRE"}
      </span>
      <Vumetro activo={false} />
      <Reloj hhmm={estado?.hhmm} />
      <a
        href="https://www.youtube.com/@estoesdopamina/videos"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-zinc-100 hover:text-white border-l border-dopamina-linea pl-3 duration-150"
      >
        <YtIcon />
        Lo último
      </a>
    </div>
  );
};
