const Tira = () => (
  <span className="font-display uppercase text-zinc-950 text-xl whitespace-nowrap tracking-wide">
    Esto es Dopamina · <span className="[-webkit-text-stroke:1.3px_#14100a] text-transparent">Seguinos</span> · Esto es Dopamina ·{" "}
    <span className="[-webkit-text-stroke:1.3px_#14100a] text-transparent">Seguinos</span> · Esto es Dopamina ·{" "}
    <span className="[-webkit-text-stroke:1.3px_#14100a] text-transparent">Seguinos</span> ·&nbsp;
  </span>
);

export default () => (
  <div className="overflow-hidden border-y border-zinc-800 bg-dopamina-amarillo py-2.5" aria-hidden="true">
    <div className="flex gap-10 w-max animate-[marquee_22s_linear_infinite] motion-reduce:animate-none">
      <Tira />
      <Tira />
    </div>
  </div>
);
