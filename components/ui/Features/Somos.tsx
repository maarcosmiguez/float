// "¿Qué es la Dopamina?" en bento asimétrico: cada card con su glow de color
// (referencia Playground: oscuro profundo + acentos vibrantes + números
// grandes), nada de tres cajitas iguales.

type Card = {
  title: string;
  desc: string;
  tint: string; // color del glow y del hover
  span: string; // columnas del bento
};

const cards: Card[] = [
  {
    title: "Streaming para los reales",
    desc: "Nos encontrás en vivo toda la semana y, cuando quieras, on demand. Todo en nuestro canal de YouTube, gratis.",
    tint: "#7C3AED",
    span: "md:col-span-7",
  },
  {
    title: "Clips para informarte rápido",
    desc: "Que la información te llegue y la consumas porque te divierte (te da dopamina, guiño guiño). Aunque no nos sigas, nos vas a ver igual.",
    tint: "#2BDC0D",
    span: "md:col-span-5",
  },
  {
    title: "Una comunicación para nuestra generación",
    desc: "Actualidad, cultura y deporte contados en nuestro idioma, sin solemnidad. Informarse tiene que ser fácil y entretenido. O moriremos intentándolo.",
    tint: "#3FC6FF",
    span: "md:col-span-7",
  },
];

const glow = (tint: string) =>
  `radial-gradient(120% 90% at 0% 0%, ${tint}2e, transparent 55%)`;

export default () => (
  <div className="custom-screen relative">
    <div className="text-center mb-10">
      <h2 className="font-display uppercase text-white text-4xl sm:text-5xl">
        ¿Qué es la Dopamina?
      </h2>
      <p className="text-dopamina-tinta-2 text-lg mt-3">Un neurotransmisor. Y nosotros hacemos:</p>
    </div>

    <div className="grid gap-4 md:grid-cols-12 max-w-5xl mx-auto">
      {/* Card 1: streaming (grande) */}
      <div
        className={`${cards[0].span} rounded-[18px] border border-dopamina-linea bg-dopamina-panel p-7 duration-150 hover:border-[#7C3AED88]`}
        style={{ backgroundImage: glow(cards[0].tint) }}
      >
        <h3 className="font-display uppercase text-white text-2xl leading-tight">
          {cards[0].title}
        </h3>
        <p className="text-dopamina-tinta-2 text-sm leading-relaxed mt-3 max-w-md">
          {cards[0].desc}
        </p>
      </div>

      {/* Card de números: la grilla en dos cifras */}
      <div className="md:col-span-5 rounded-[18px] border border-dopamina-linea bg-dopamina-panel p-7 flex items-center justify-around gap-4 duration-150 hover:border-dopamina-amarillo/50">
        <div className="text-center">
          <p className="font-display text-dopamina-amarillo text-6xl leading-none">4</p>
          <p className="text-[0.68rem] font-extrabold tracking-widest uppercase text-dopamina-tinta-3 mt-2">
            Programas
          </p>
        </div>
        <div className="w-px self-stretch bg-dopamina-linea" />
        <div className="text-center">
          <p className="font-display text-dopamina-celeste text-6xl leading-none">7</p>
          <p className="text-[0.68rem] font-extrabold tracking-widest uppercase text-dopamina-tinta-3 mt-2">
            Vivos por semana
          </p>
        </div>
      </div>

      {/* Card 2: clips */}
      <div
        className={`${cards[1].span} rounded-[18px] border border-dopamina-linea bg-dopamina-panel p-7 duration-150 hover:border-[#2BDC0D66]`}
        style={{ backgroundImage: glow(cards[1].tint) }}
      >
        <h3 className="font-display uppercase text-white text-2xl leading-tight">
          {cards[1].title}
        </h3>
        <p className="text-dopamina-tinta-2 text-sm leading-relaxed mt-3">{cards[1].desc}</p>
      </div>

      {/* Card 3: generación */}
      <div
        className={`${cards[2].span} rounded-[18px] border border-dopamina-linea bg-dopamina-panel p-7 duration-150 hover:border-[#3FC6FF66]`}
        style={{ backgroundImage: glow(cards[2].tint) }}
      >
        <h3 className="font-display uppercase text-white text-2xl leading-tight">
          {cards[2].title}
        </h3>
        <p className="text-dopamina-tinta-2 text-sm leading-relaxed mt-3 max-w-md">
          {cards[2].desc}
        </p>
      </div>
    </div>
  </div>
);
