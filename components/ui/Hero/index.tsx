import LinkItem from "../LinkItem";
import SocialMedia from "../SocialMedia/index";
import HeroBgGradientClient from "./HeroBgGradient.Client";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

export default () => {
  return (
    <section className="custom-screen relative" id='home'>
      <div className="relative z-10 max-w-2xl mx-auto my-auto min-h-screen justify-center items-center space-y-4 text-center flex flex-col">
        <h1 className="text-5xl heading">Dopamina</h1>
        <p className="text-zinc-400">Somos un medio uruguayo que te da placer.</p>
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
      <HeroBgGradientClient />
    </section>
  );
};
