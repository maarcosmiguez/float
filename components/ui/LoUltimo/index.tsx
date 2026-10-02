"use client";

// "Lo último de Dopamina", feed de la maqueta fase 2a: el último vivo o
// corte de cada programa, con su título real (viene de /api/ultimos, que lee
// la playlist de cada uno). Si la consulta falla, la card cae a la lista
// completa del programa: nunca se inventa un título.

import { useEffect, useState } from "react";
import {
  consultarUltimos,
  tituloCorto,
  urlVideo,
  type Slug,
  type Ultimos,
} from "../aire/ultimos";

const PROGRAMAS: {
  slug: Slug;
  nombre: string;
  tint: string;
  playlist: string;
  instagram: string;
}[] = [
  {
    slug: "psh",
    nombre: "Poco Se Habla",
    tint: "#2BDC0D",
    playlist: "https://www.youtube.com/playlist?list=PLNFlrAum2DnoP-i4ohOh9jNDtJbR45DM4",
    instagram: "https://www.instagram.com/pocosehabla.uy/",
  },
  {
    slug: "cdm",
    nombre: "Campaña del Miedo",
    tint: "#7C3AED",
    playlist: "https://youtube.com/playlist?list=PLNFlrAum2DnpP4eg2AcKF_5C5RwSBV2c9",
    instagram: "https://www.instagram.com/estoescdm/",
  },
  {
    slug: "tsi",
    nombre: "Todos Iguales",
    tint: "#D32521",
    playlist: "https://www.youtube.com/playlist?list=PLNFlrAum2DnpKbUX_8kf8X1ysvdlk59Fo",
    instagram: "https://www.instagram.com/estoestodosiguales/",
  },
  {
    slug: "bs",
    nombre: "Bufete Sentimental",
    tint: "#FF4D8D",
    playlist: "https://www.youtube.com/playlist?list=PLNFlrAum2DnpbNEFwWwIGGtPpFdBie1EN",
    instagram: "https://www.instagram.com/bufetesentimental/",
  },
];

const Chip = ({
  href,
  children,
  tint,
}: {
  href: string;
  children: React.ReactNode;
  tint: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[0.66rem] font-extrabold uppercase tracking-wider text-zinc-200 hover:text-zinc-950 duration-150"
    style={{ borderColor: `${tint}66` }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.backgroundColor = tint;
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
    }}
  >
    {children}
  </a>
);

export default () => {
  const [ultimos, setUltimos] = useState<Ultimos | null>(null);

  useEffect(() => {
    let vivo = true;
    consultarUltimos().then((u) => {
      if (vivo) setUltimos(u);
    });
    return () => {
      vivo = false;
    };
  }, []);

  return (
    <div className="custom-screen relative py-20">
      <div className="text-center mb-10">
        <p className="text-xs font-bold tracking-widest uppercase text-dopamina-tinta-3">
          Recién salido del estudio
        </p>
        <h2 className="font-display uppercase text-white text-4xl sm:text-5xl mt-2">
          Lo último de Dopamina
        </h2>
        <p className="text-dopamina-tinta-2 mt-3 max-w-xl mx-auto">
          El último vivo o corte de cada programa, apenas sale. Todo el archivo
          queda en YouTube.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 max-w-6xl mx-auto">
        {PROGRAMAS.map((p) => {
          const u = ultimos?.programas?.[p.slug] ?? null;
          return (
            <article
              key={p.slug}
              className="relative flex flex-col rounded-[18px] border border-dopamina-linea bg-dopamina-panel p-5 duration-150 hover:border-dopamina-violeta hover:-translate-y-1 motion-reduce:hover:translate-y-0 overflow-hidden"
            >
              {/* Portada del video (mqdefault es 16:9 exacto, no se recorta) */}
              {u && (
                <a
                  href={urlVideo(u)}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="relative z-10 block -mx-5 -mt-5 mb-4 aspect-video border-b border-dopamina-linea"
                >
                  <img
                    src={`https://i.ytimg.com/vi/${u.videoId}/mqdefault.jpg`}
                    alt=""
                    width={320}
                    height={180}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </a>
              )}
              <span
                className="self-start text-[0.64rem] font-extrabold tracking-widest uppercase border rounded-full px-2.5 py-1"
                style={{ color: p.tint, borderColor: `${p.tint}55` }}
              >
                {p.nombre}
              </span>
              {/* El título es el link al video y estira su área de click a
                  toda la card (after inset-0); los chips quedan por encima. */}
              <a
                href={u ? urlVideo(u) : p.playlist}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 font-display uppercase text-white text-lg leading-tight after:absolute after:inset-0"
              >
                {u ? tituloCorto(u.titulo) : "La lista completa, on demand"}
              </a>
              {/* Un video programado todavía no tiene "hace X": queda neutro */}
              <p
                className={`text-xs mt-2 ${
                  u?.enVivoAhora
                    ? "text-red-500 font-extrabold uppercase tracking-wider"
                    : "text-dopamina-tinta-3"
                }`}
              >
                {u?.enVivoAhora ? "● Ahora en vivo" : u?.cuando || "En YouTube"}
              </p>
              <div className="relative z-10 mt-auto pt-4 flex flex-wrap gap-2">
                <Chip href={p.playlist} tint={p.tint}>
                  ▶ YouTube
                </Chip>
                <Chip href={p.instagram} tint={p.tint}>
                  ◉ Instagram
                </Chip>
              </div>
            </article>
          );
        })}
      </div>

      {/* El canal madre, compacto abajo del feed */}
      <div className="max-w-6xl mx-auto mt-4 rounded-[18px] border border-dopamina-linea bg-dopamina-panel/60 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-1 self-stretch rounded-full shrink-0 bg-dopamina-amarillo" />
          <div>
            <p className="font-display uppercase text-white text-lg leading-tight">
              Dopamina stream
            </p>
            <p className="text-xs text-dopamina-tinta-3">
              Vivos, clips y todo el archivo
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip href="https://www.youtube.com/@estoesdopamina" tint="#F9E400">
            ▶ YouTube
          </Chip>
          <Chip href="https://www.instagram.com/estoesdopamina" tint="#F9E400">
            ◉ Instagram
          </Chip>
        </div>
      </div>

    </div>
  );
};
