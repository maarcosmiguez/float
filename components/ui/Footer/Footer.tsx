import Link from "next/link";
import Brand from "components/ui/Brand";
import BorderGradient from "./BorderGradient";
import BgGradient from "./BgGradient";
import SocialMedia from "../SocialMedia";
import RelojMvd from "../aire/RelojMvd";

// Cierre del sitio: marca + tagline, el mapa del sitio en una línea, redes,
// y la línea legal con el reloj de Montevideo.
const secciones = [
  { name: "Programación", href: "#contenido" },
  { name: "Lo último", href: "#ultimo" },
  { name: "La Dopamina", href: "#somos" },
  { name: "Hacete blandengue", href: "#planes", destacado: true },
  { name: "Contacto", href: "#contacto" },
];

export default () => (
  <footer className="relative mt-40 pt-20 overflow-hidden">
    <section>
      <BorderGradient className="absolute inset-x-0 top-0 mx-auto" />
      <BgGradient className="absolute inset-x-0 top-0 mx-auto" />
      <div className="custom-screen relative pb-8 flex flex-col items-center text-center">
        <Link href="/" aria-label="Dopamina, inicio">
          <Brand />
        </Link>
        <p className="text-sm text-dopamina-tinta-2 mt-4 max-w-sm">
          El estrimin que mira Uruguay. En vivo y on demand por YouTube.
        </p>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
          {secciones.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className={`text-[0.78rem] font-semibold uppercase tracking-wider duration-150 ${
                s.destacado
                  ? "text-dopamina-amarillo hover:text-yellow-300"
                  : "text-dopamina-tinta-3 hover:text-white"
              }`}
            >
              {s.name}
            </a>
          ))}
        </nav>
        <SocialMedia />
      </div>
      <div className="text-sm custom-screen text-center border-t border-dopamina-linea">
        <div className="text-dopamina-tinta-3 py-8">
          &copy; {new Date().getFullYear()} Dopamina, marca registrada · El
          estrimin que mira Uruguay · <RelojMvd /> Montevideo
        </div>
      </div>
    </section>
  </footer>
);
