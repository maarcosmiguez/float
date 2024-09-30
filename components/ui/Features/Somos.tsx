import {
  IconArrowsexpandLeft,
  IconBxCustomize,
  IconPennibLine,
} from "components/icons";
import {
  PlayIcon,
  InformationCircleIcon,
  ArrowPathRoundedSquareIcon
} from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import featureCover from "public/feature-cover.svg";
import Image from "next/image";
import Card from "./Card";

type Feature = {
  title: string;
  desc: string;
  icon: ReactNode;
};

export default () => {
  const features: Feature[] = [
    {
      title: "Streaming para los reales",
      desc: "Nos encontrás tres veces por semana y cuando quieras on demand. Todo, por nuestro canal de Youtube.",
      icon: <PlayIcon className="max-w-5" />,
    },
    {
      title: "Clips para informarte rápido",
      desc: "Nuestra misión es que la información llegue a vos y que la consumas porque te divierte y te entretiene (te da dopamina, guiño guiño). Por eso decimos que aunque no nos sigas nos vas a ver igual. No es una amenaza, esperamos que te guste.",
      icon: <InformationCircleIcon className="max-w-5" />,
    },
    {
      title: "Una comunicación para nuestra generación",
      desc: "La política no es aburrida, pero a veces lo son quienes te hablan de política. Nosotros creemos y te queremos hacer creer que informarse es fácil, accesible y entretenido. O moriremos intentándolo. Información sobra, lo que falta es que la quieran consumir, y nosotros queremos hacerte adicto.",
      icon: <ArrowPathRoundedSquareIcon className="max-w-5" />,
    },
  ];

  return (
    <div className="custom-screen relative">
      <div className="relative z-10 mx-auto my-auto mt-60 md:mt-0 min-h-screen justify-center items-center space-y-10 text-center flex flex-col">
      <div className="max-w-xl mx-auto space-y-4 text-center">
        <h2 className="text-5xl heading">¿Qué es Dopamina?</h2>
        <p className="text-zinc-400 text-xl">
          Un neurotransmisor. Y nosotros hacemos:
        </p>
      </div>
      <ul className="space-y-10 gap-6 mt-8 max-w-7xl mx-auto grid-cols-2 sm:grid lg:grid-cols-3 sm:space-y-0">
        {features.map((item: Feature, key: number) => (
          <Card icon={item.icon} title={item.title} desc={item.desc} />
        ))}
      </ul>
      </div>
    </div>
  );
};
