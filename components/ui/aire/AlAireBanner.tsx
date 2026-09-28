"use client";

import { useEffect, useState } from "react";
import { estadoAire, fmtHora, DIAS, type EstadoAire } from "./aire";
import {
  consultarUltimos,
  masReciente,
  tituloCorto,
  urlVideo,
  type UltimoVideo,
} from "./ultimos";

const YtIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current shrink-0`} aria-hidden="true">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" />
  </svg>
);

const Miniatura = ({ videoId, alt }: { videoId: string; alt: string }) => (
  <img
    src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}
    alt={alt}
    width={320}
    height={180}
    loading="lazy"
    className="hidden sm:block w-32 aspect-video rounded-xl object-cover border border-dopamina-linea shrink-0"
  />
);

export default () => {
  const [estado, setEstado] = useState<EstadoAire | null>(null);
  const [ultimo, setUltimo] = useState<UltimoVideo | null>(null);

  useEffect(() => {
    let vivo = true;
    const tick = () => {
      estadoAire().then((e) => {
        if (vivo) setEstado(e);
      });
    };
    tick();
    consultarUltimos().then((u) => {
      if (vivo) setUltimo(masReciente(u));
    });
    const id = setInterval(tick, 60000);
    return () => {
      vivo = false;
      clearInterval(id);
    };
  }, []);

  if (estado === null) return null;

  const upcoming = !estado.live ? estado.upcoming : null;

  return (
    <div className="custom-screen">
      <div className="max-w-3xl mx-auto -mt-12 relative z-20 rounded-[18px] border border-dopamina-linea bg-dopamina-panel px-6 py-5 flex flex-wrap items-center justify-between gap-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
        {estado.live ? (
          <>
            {/* EN VIVO: miniatura + programa + lo que está pasando */}
            <div className="flex items-center gap-4 min-w-0 flex-1">
              {estado.videoId && (
                <Miniatura videoId={estado.videoId} alt={`En vivo: ${estado.show.nombre}`} />
              )}
              <div className="min-w-0">
                <p className="text-[0.68rem] font-extrabold tracking-[0.12em] uppercase text-red-500">
                  ● Al aire ahora
                </p>
                <p className="font-display uppercase text-white text-2xl leading-tight mt-0.5">
                  {estado.show.nombre}
                </p>
                <p className="text-xs text-dopamina-tinta-2 mt-0.5">
                  {estado.titulo
                    ? tituloCorto(estado.titulo, 72)
                    : estado.show.hasta > 0
                    ? `Hasta las ${fmtHora(estado.show.hasta)} · en vivo por YouTube`
                    : "En vivo por YouTube"}
                </p>
              </div>
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
        ) : upcoming ? (
          <>
            {/* Hay una transmisión programada: no es un vivo, es lo que viene */}
            <div className="min-w-0 flex-1">
              <p className="text-[0.68rem] font-extrabold tracking-[0.12em] uppercase text-dopamina-celeste">
                ◉ Próxima transmisión
              </p>
              <p className="font-display uppercase text-white text-2xl leading-tight mt-0.5">
                {upcoming.nombre !== "Dopamina"
                  ? upcoming.nombre
                  : upcoming.titulo
                  ? tituloCorto(upcoming.titulo, 64)
                  : "Dopamina en vivo"}
              </p>
              <p className="text-xs text-dopamina-tinta-3 mt-1">
                {upcoming.inicioTxt ? `${upcoming.inicioTxt} por YouTube` : "Pronto por YouTube"}
                {ultimo && (
                  <>
                    {" · "}
                    <a
                      href={urlVideo(ultimo)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dopamina-tinta-2 hover:text-white underline underline-offset-2 duration-150"
                    >
                      mientras tanto, mirá lo último
                    </a>
                  </>
                )}
              </p>
            </div>
            <a
              href={upcoming.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-white text-zinc-950 hover:bg-zinc-200 duration-150"
            >
              <YtIcon className="w-4 h-4 text-[#FF0000]" /> Avisame
            </a>
          </>
        ) : (
          <>
            {/* Radio apagada: el protagonista es lo último que salió, con su
                título real (viene de /api/ultimos; si no hay dato, genérico). */}
            <div className="min-w-0 flex-1">
              <p className="inline-flex items-center gap-1.5 text-[0.68rem] font-extrabold tracking-[0.12em] uppercase text-zinc-100">
                <YtIcon className="w-3.5 h-3.5 text-[#FF0000]" /> Lo último del canal
              </p>
              <p className="font-display uppercase text-white text-2xl leading-tight mt-0.5">
                {ultimo ? tituloCorto(ultimo.titulo) : "El último programa te espera"}
              </p>
              <p className="text-xs text-dopamina-tinta-3 mt-1">
                {ultimo?.cuando ? `${ultimo.cuando} · ` : ""}
                {estado.next
                  ? `Próximo vivo: ${estado.next.show.nombre} · ${DIAS[estado.next.dia]} ${fmtHora(estado.next.show.desde)}h`
                  : "Volvemos pronto al aire"}
              </p>
            </div>
            <a
              href={ultimo ? urlVideo(ultimo) : "https://www.youtube.com/@estoesdopamina/videos"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-[#FF0000] text-white hover:bg-[#d90000] duration-150"
            >
              <YtIcon /> {ultimo ? "Darle play" : "Ver los últimos"}
            </a>
          </>
        )}
      </div>
    </div>
  );
};
