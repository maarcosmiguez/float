import LinkItem from "../LinkItem";
import SocialMedia from "../SocialMedia/index";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import BrandMain from "../BrandMain";

export default () => {
  return (
    <div className="relative w-full overflow-hidden border-b border-zinc-800">
      {/* Video loop de marca (paredes tipográficas). Oculto si el usuario pide menos movimiento. */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-[0.34] pointer-events-none motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/loop-hero-poster.jpg"
        src="/loop-hero.mp4"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 30%, rgba(9,9,11,0.88) 100%), linear-gradient(180deg, rgba(9,9,11,0.55) 0%, rgba(9,9,11,0.25) 40%, rgba(9,9,11,0.94) 100%)",
        }}
      />

      <div className="custom-screen relative z-10 flex flex-col items-center text-center gap-6 pt-32 pb-28">
        <div className="hover:animate-pulse active:animate-spin cursor-pointer max-w-[260px]">
          <BrandMain />
        </div>
        <h1
          className="font-display uppercase text-white leading-[0.94] max-w-[13ch]"
          style={{ fontSize: "clamp(3.2rem, 11vw, 7rem)", textShadow: "0 4px 40px rgba(0,0,0,0.55)" }}
        >
          El estrimin que mira <span className="text-dopamina-amarillo">Uruguay</span>
        </h1>
        <p className="text-zinc-400 max-w-lg text-lg">
          Cuatro programas y una gran comunidad. Noticias, entretenimiento y opinión informada por streaming y on demand.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <LinkItem
            href="#planes"
            variant="shiny"
            className="inline-flex w-full justify-center items-center gap-x-2 border border-dopamina-amarillo bg-dopamina-amarillo text-zinc-950 hover:bg-yellow-300 font-semibold duration-200 sm:w-auto"
          >
            Hacete blandengue
          </LinkItem>
          <LinkItem
            href="https://www.youtube.com/@estoesdopamina"
            variant="shiny"
            className="inline-flex w-full justify-center items-center gap-x-2 border border-zinc-800 hover:border-zinc-600 bg-zinc-950 hover:text-zinc-100 duration-200 sm:w-auto"
            target="_blank"
          >
            <PlayCircleIcon className="w-5 h-5" />
            Canal de Youtube
          </LinkItem>
        </div>

        <SocialMedia />
      </div>
    </div>
  );
};
