import LinkItem from "../LinkItem";
import SocialMedia from "../SocialMedia/index";
import HeroBgGradientClient from "./HeroBgGradient.Client";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid"; // Asegúrate de tener este ícono en tu proyecto
import Link from "next/link";

export default () => {
  return (
    <div className="custom-screen relative flex flex-col justify-between min-h-screen pt-10 pb-8"> {/* Ajusta el padding superior e inferior */}
      <div className="relative z-10 max-w-2xl mx-auto my-auto justify-center items-center space-y-4 text-center flex flex-col">
        <h1 className="text-8xl heading hover:animate-pulse active:animate-spin cursor-pointer">
          Dopamina
        </h1>
        <p className="text-zinc-400">
          Somos un medio uruguayo que te da placer.
        </p>

        {/* <div className="flex flex-wrap items-center justify-center gap-3">
          <LinkItem
            href="https://www.youtube.com/@miedoalexito_uy"
            variant="shiny"
            className="inline-flex w-full justify-center items-center gap-x-2 border border-zinc-800 hover:border-zinc-600 bg-zinc-950 hover:text-zinc-100 duration-200 sm:w-auto"
            target="_blank"
          >
            <PlayCircleIcon className="w-5 h-5" />
            Nuestro Canal de Youtube
          </LinkItem>
        </div> */}

        <SocialMedia />
      </div>
      {/* Elemento de scroll */}
      <div className="flex flex-col items-center mt-auto"> {/* Agregamos mt-auto para empujar el elemento hacia abajo */}
        <div className="flex flex-col items-center cursor-pointer">
          <p className="text-lg text-zinc-300 animate-pulse">
            Scrollea, como ya sabes.
          </p>
          <ChevronDoubleDownIcon className="w-8 h-8 text-zinc-300 animate-bounce mt-4" />
        </div>
      </div>
      <HeroBgGradientClient />
    </div>
  );
};
