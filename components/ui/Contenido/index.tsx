"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import showCdm from "public/show-cdm.jpg";
import showTsi from "public/show-tsi.jpg";
import showPsh from "public/show-psh.jpg";
import showBs from "public/show-bs.jpg";

const shows = [
  {
    id: "campaDelMiedo",
    day: "Martes y jueves · 9:00 a 10:30h",
    title: "Campaña del Miedo",
    hosts: "con Fer Kosak y Brian Majlin",
    desc: "El periodístico de la mañana del streaming en Uruguay: análisis político dinámico, entrevistas a todo el arco político y el humor justo para arrancar el día informado.",
    image: showCdm,
    href: "https://youtube.com/playlist?list=PLNFlrAum2DnpP4eg2AcKF_5C5RwSBV2c9",
    tint: "#7C3AED",
  },
  {
    id: "todosIguales",
    day: "Martes y jueves · 20:00 a 21:30h",
    title: "Todos Iguales",
    hosts: "con Marcos Casas, Fede Pérez y Maca Saavedra",
    desc: "El late night del streaming de Uruguay. Información, entrevistas, informes especiales y humor inteligente para cerrar el día.",
    image: showTsi,
    href: "https://www.youtube.com/playlist?list=PLNFlrAum2DnpKbUX_8kf8X1ysvdlk59Fo",
    tint: "#D32521",
  },
  {
    id: "pocoSeHabla",
    day: "Lunes y miércoles · 9:00 a 10:30h",
    title: "Poco Se Habla",
    hosts: "con Claudia Umpiérrez, Ignacio López y Aníbal Banquero",
    desc: "El magazine del deporte en Uruguay: repaso de la fecha, entrevistas y análisis con la cuota justa de humor. Diversidad de voces, cero solemnidad.",
    image: showPsh,
    href: "https://www.youtube.com/playlist?list=PLNFlrAum2DnoP-i4ohOh9jNDtJbR45DM4",
    tint: "#2BDC0D",
  },
  {
    id: "bufete",
    day: "Viernes · 9:00 a 10:30h",
    title: "Bufete Sentimental",
    hosts: "con Fer Kosak e Irene Delponte",
    desc: "El podcast de coyuntura sentimental: vínculos, deseo y cultura analizados con marco académico, mirada social y humor. Ya en su sexta temporada.",
    image: showBs,
    href: "https://www.youtube.com/playlist?list=PLNFlrAum2DnpbNEFwWwIGGtPpFdBie1EN",
    tint: "#FF4D8D",
  },
];

export default () => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll("[data-showcard]");
    if (!cards || cards.length === 0) return;
    if (!("IntersectionObserver" in window)) {
      cards.forEach((c) => c.classList.remove("opacity-0", "translate-y-6"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("opacity-0", "translate-y-6");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <div className="custom-screen relative py-20">
      <div className="text-center mb-12">
        <p className="text-xs font-bold tracking-widest uppercase text-zinc-500">
          Grilla y programación
        </p>
        <h2 className="font-display uppercase text-white text-4xl sm:text-5xl mt-2">
          Contenidos
        </h2>
      </div>

      <div ref={gridRef} className="grid gap-7 md:grid-cols-2 md:gap-x-8 md:gap-y-9 max-w-5xl mx-auto">
        {shows.map((show, idx) => (
          <article
            key={show.id}
            id={show.id}
            data-showcard
            className={`group rounded-2xl border border-zinc-800 bg-zinc-900/70 overflow-hidden
              opacity-0 translate-y-6 transition-all duration-500 ease-out
              hover:-translate-y-1.5 hover:rotate-0
              motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none motion-reduce:rotate-0
              ${idx % 2 === 0 ? "md:-rotate-1" : "md:rotate-1 md:translate-y-16"}`}
            style={{ boxShadow: `0 18px 50px -18px ${show.tint}55` }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 30px 70px -16px ${show.tint}99`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 18px 50px -18px ${show.tint}55`;
            }}
          >
            {/* Imagen 16:9 SIEMPRE completa: el contenedor tiene el mismo aspect ratio
                que el asset (16:9) y la imagen se muestra entera, sin cover ni zoom. */}
            <a href={show.href} target="_blank" rel="noopener noreferrer" className="block aspect-video">
              <Image
                src={show.image}
                alt={`${show.title} — ${show.hosts}`}
                className="w-full h-full"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </a>
            <div className="p-5 border-t-2" style={{ borderTopColor: show.tint }}>
              <span
                className="text-[0.7rem] font-extrabold tracking-widest uppercase"
                style={{ color: show.tint }}
              >
                {show.day}
              </span>
              <p className="font-display uppercase text-white text-2xl mt-1">{show.title}</p>
              <p className="text-sm text-zinc-400 font-semibold mt-1">{show.hosts}</p>
              <p className="text-sm text-zinc-400 leading-relaxed mt-2">{show.desc}</p>
              <a
                href={show.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-xs font-extrabold tracking-wider uppercase text-white pb-0.5 border-b-2 hover:opacity-80 duration-150"
                style={{ borderBottomColor: show.tint }}
              >
                ▶ Ver en YouTube
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
