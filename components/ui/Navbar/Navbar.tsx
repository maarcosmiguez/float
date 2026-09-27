"use client";

import { useState } from "react";
import Link from "next/link";
import Brand from "../Brand";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

// Navbar del rediseño "estudio en vivo": sticky compacto (no tapa el chip
// de aire), links de las secciones reales y CTA de membresía siempre visible.
const navigation = [
  { title: "Programación", path: "#contenido" },
  { title: "Lo último", path: "#ultimo" },
  { title: "La Dopamina", path: "#somos" },
  { title: "Contacto", path: "#contacto" },
];

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-dopamina-linea bg-dopamina-fondo/75 backdrop-blur-lg pt-2">
      <nav className="custom-screen flex items-center justify-between h-14">
        <Link href="/" className="shrink-0">
          <Brand />
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navigation.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="text-[0.8rem] font-semibold uppercase tracking-wider text-dopamina-tinta-2 hover:text-white duration-150"
            >
              {item.title}
            </a>
          ))}
          <a
            href="#planes"
            className="px-4 py-2 rounded-full bg-dopamina-amarillo text-zinc-950 text-[0.78rem] font-bold hover:bg-yellow-300 duration-150"
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
              className="text-sm font-semibold uppercase tracking-wider text-zinc-300"
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
