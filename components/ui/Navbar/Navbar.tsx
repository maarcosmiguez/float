"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Brand from "../Brand";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

// Header del rediseño "estudio en vivo": SIEMPRE visible (fixed) y con
// scrollspy: el link de la sección que estás mirando queda marcado con la
// señal amarilla. El html tiene scroll-padding para que los anclajes no
// queden tapados.
const navigation = [
  { title: "Programación", path: "#contenido", id: "contenido" },
  { title: "Lo último", path: "#ultimo", id: "ultimo" },
  { title: "La Dopamina", path: "#somos", id: "somos" },
  { title: "Contacto", path: "#contacto", id: "contacto" },
];

const OBSERVADAS = ["contenido", "ultimo", "somos", "planes", "contacto"];

export default () => {
  const [open, setOpen] = useState(false);
  const [activa, setActiva] = useState<string | null>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiva(e.target.id);
        }
      },
      // La sección "activa" es la que cruza la franja del medio de la pantalla.
      { rootMargin: "-35% 0px -55% 0px" }
    );
    OBSERVADAS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const claseLink = (id: string, extra = "") =>
    `relative text-[0.8rem] font-semibold uppercase tracking-wider duration-150 ${
      activa === id ? "text-white" : "text-dopamina-tinta-2 hover:text-white"
    } after:absolute after:left-0 after:-bottom-1.5 after:h-[2px] after:rounded-full after:bg-dopamina-amarillo after:transition-all after:duration-300 ${
      activa === id ? "after:w-full" : "after:w-0"
    } ${extra}`;

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-dopamina-linea bg-dopamina-fondo/75 backdrop-blur-lg pt-2">
      <nav className="custom-screen flex items-center justify-between h-14">
        <Link href="/" className="shrink-0">
          <Brand />
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navigation.map((item) => (
            <a key={item.path} href={item.path} className={claseLink(item.id)}>
              {item.title}
            </a>
          ))}
          <a
            href="#planes"
            className={`px-4 py-2 rounded-full text-[0.78rem] font-bold duration-150 ${
              activa === "planes"
                ? "bg-yellow-300 text-zinc-950 ring-2 ring-dopamina-amarillo/50"
                : "bg-dopamina-amarillo text-zinc-950 hover:bg-yellow-300"
            }`}
          >
            Hacete blandengue
          </a>
        </div>

        <button
          className="md:hidden text-zinc-300 p-2"
          aria-label="Menú"
          onClick={() => setOpen(!open)}
        >
          {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-dopamina-linea bg-dopamina-fondo/95 backdrop-blur px-6 py-4 flex flex-col gap-4">
          {navigation.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={() => setOpen(false)}
              className={`text-sm font-semibold uppercase tracking-wider ${
                activa === item.id ? "text-dopamina-amarillo" : "text-zinc-300"
              }`}
            >
              {item.title}
            </a>
          ))}
          <a
            href="#planes"
            onClick={() => setOpen(false)}
            className="self-start px-4 py-2 rounded-full bg-dopamina-amarillo text-zinc-950 text-sm font-bold"
          >
            Hacete blandengue
          </a>
        </div>
      )}
    </header>
  );
};
