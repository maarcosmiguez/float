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
      desc: "Lorem ipsu",
      icon: <PlayIcon className="max-w-5" />,
    },
    {
      title: "Clips para informarte rápido",
      desc: "Lorem ipsu",
      icon: <InformationCircleIcon className="max-w-5" />,
    },
    {
      title: "Una comunicación para nuestra generación",
      desc: "Lorem ipsu",
      icon: <ArrowPathRoundedSquareIcon className="max-w-5" />,
    },
  ];

  return (
    <div className="custom-screen relative">
      <div className="relative z-10 mx-auto my-auto min-h-screen justify-center items-center space-y-10 text-center flex flex-col">
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
