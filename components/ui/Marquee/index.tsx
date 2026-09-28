// Franja amarilla sesgada. La frase alterna relleno y contorno por unidad de
// sentido: ESTRIMIN y SEGUINOS van huecos, el resto pleno. Cada tira repite
// la frase 4 veces para que ningún ancho de pantalla la deje corta (el track
// anima -50%, así que necesita el doble de contenido que el viewport).

const Hueco = ({ children }: { children: React.ReactNode }) => (
  <span className="[-webkit-text-stroke:1.3px_#14100a] text-transparent">{children}</span>
);

const Frase = () => (
  <>
    EL PRIMER <Hueco>ESTRIMIN</Hueco> NACIONAL · ESTO ES DOPAMINA ·{" "}
    <Hueco>SEGUINOS</Hueco> · @estoesdopamina ·{" "}
  </>
);

const Tira = () => (
  <span className="font-display uppercase text-zinc-950 text-xl whitespace-nowrap tracking-wide">
    <Frase />
    <Frase />
    <Frase />
    <Frase />
  </span>
);

export default () => (
  <div className="overflow-hidden py-4" aria-hidden="true">
    <div className="overflow-hidden border-y border-dopamina-linea bg-dopamina-amarillo py-2.5 -rotate-2 scale-x-105 my-2">
    <div className="flex gap-10 w-max animate-[marquee_44s_linear_infinite] motion-reduce:animate-none">
      <Tira />
      <Tira />
    </div>
    </div>
  </div>
);
