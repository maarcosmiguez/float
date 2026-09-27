import { ReactNode } from "react";

type Feature = { title: string; desc: string };

const features: Feature[] = [
  {
    title: "Streaming para los reales",
    desc: "Nos encontrás toda la semana en vivo, y cuando quieras on demand. Todo por nuestro canal de YouTube.",
  },
  {
    title: "Clips para informarte rápido",
    desc: "Nuestra misión es que la información llegue a vos y que la consumas porque te divierte y te entretiene (te da dopamina, guiño guiño). Aunque no nos sigas, nos vas a ver igual.",
  },
  {
    title: "Una comunicación para nuestra generación",
    desc: "Actualidad, entretenimiento, cultura y deporte, contados con un lenguaje cercano. Informarse tiene que ser fácil, accesible y entretenido. O moriremos intentándolo.",
  },
];

export default () => (
  <div className="custom-screen relative">
    <div className="text-center mb-10">
      <h2 className="font-display uppercase text-white text-4xl sm:text-5xl">
        ¿Qué es la Dopamina?
      </h2>
      <p className="text-dopamina-tinta-2 text-lg mt-3">Un neurotransmisor. Y nosotros hacemos:</p>
    </div>
    <div className="grid gap-4 md:grid-cols-3 max-w-5xl mx-auto">
      {features.map((f) => (
        <div
          key={f.title}
          className="rounded-[18px] border border-dopamina-linea bg-dopamina-panel p-6 text-left"
        >
          <h3 className="font-display uppercase text-white text-xl leading-tight">
            {f.title}
          </h3>
          <p className="text-dopamina-tinta-2 text-sm leading-relaxed mt-3">{f.desc}</p>
        </div>
      ))}
    </div>
  </div>
);
