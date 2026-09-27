"use client";

import { useEffect, useState } from "react";
import { estadoAire, fmtHora, DIAS, type EstadoAire } from "./aire";

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

  if (estado === null) return null;

  const live = estado.live === true;
  const href = live
    ? estado.liveUrl ?? "https://www.youtube.com/@estoesdopamina/streams"
    : "https://www.youtube.com/@estoesdopamina/streams";

  return (
    <div className="custom-screen">
      <div className="max-w-3xl mx-auto -mt-12 relative z-10 rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
        <div>
          <p
            className={`text-[0.68rem] font-extrabold tracking-[0.12em] uppercase ${
              live ? "text-red-500" : "text-zinc-500"
            }`}
          >
            {live ? "● Al aire ahora" : "Próximo en aire"}
          </p>
          <p className="font-display uppercase text-white text-xl leading-tight mt-0.5">
            {live ? estado.show.nombre : estado.next?.show.nombre ?? "Dopamina"}
          </p>
          <p className="text-xs text-zinc-400 mt-0.5">
            {live
              ? estado.show.hasta > 0
                ? `Hasta las ${fmtHora(estado.show.hasta)} · en vivo por YouTube`
                : "En vivo por YouTube"
              : estado.next
              ? `${DIAS[estado.next.dia]} ${fmtHora(estado.next.show.desde)}h · en vivo por YouTube`
              : "En vivo por YouTube"}
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold duration-150 ${
            live
              ? "bg-red-600 text-white hover:bg-red-500"
              : "border border-zinc-700 text-zinc-200 hover:border-zinc-500"
          }`}
        >
          ▶ {live ? "Entrar al vivo" : "Ir al canal"}
        </a>
      </div>
    </div>
  );
};
