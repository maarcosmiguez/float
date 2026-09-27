"use client";

import { useEffect, useState } from "react";
import { estadoAire, fmtHora, DIAS, type EstadoAire } from "./aire";

const YtIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" />
  </svg>
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

  if (estado === null) return null;

  const live = estado.live === true;

  return (
    <div className="custom-screen">
      <div className="max-w-3xl mx-auto -mt-12 relative z-20 rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-5 flex flex-wrap items-center justify-between gap-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
        {live ? (
          <>
            <div>
              <p className="text-[0.68rem] font-extrabold tracking-[0.12em] uppercase text-red-500">
                ● Al aire ahora
              </p>
              <p className="font-display uppercase text-white text-2xl leading-tight mt-0.5">
                {estado.show.nombre}
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                {estado.show.hasta > 0
                  ? `Hasta las ${fmtHora(estado.show.hasta)} · en vivo por YouTube`
                  : "En vivo por YouTube"}
              </p>
            </div>
            <a
              href={estado.liveUrl ?? "https://www.youtube.com/@estoesdopamina/streams"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-red-600 text-white hover:bg-red-500 duration-150"
            >
              <YtIcon /> Entrar al vivo
            </a>
          </>
        ) : (
          <>
            {/* Radio apagada: el protagonista es el on demand */}
            <div>
              <p className="text-[0.68rem] font-extrabold tracking-[0.12em] uppercase text-dopamina-amarillo">
                Ahora on demand
              </p>
              <p className="font-display uppercase text-white text-2xl leading-tight mt-0.5">
                El último programa te espera
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {estado.next
                  ? `Próximo vivo: ${estado.next.show.nombre} · ${DIAS[estado.next.dia]} ${fmtHora(estado.next.show.desde)}h`
                  : "Volvemos pronto al aire"}
              </p>
            </div>
            <a
              href="https://www.youtube.com/@estoesdopamina/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-dopamina-amarillo text-zinc-950 hover:bg-yellow-300 duration-150"
            >
              <YtIcon /> Ver on demand
            </a>
          </>
        )}
      </div>
    </div>
  );
};
