import Link from "next/link";
import Image from "next/image";
import Brand from "components/ui/Brand";
import BorderGradient from "./BorderGradient";
import BgGradient from "./BgGradient";
import SocialMedia from "../SocialMedia";
import RelojMvd from "../aire/RelojMvd";

const navigation = [
  { name: "Inicio", href: "#" }, // Cambiar href a "#" para ir al principio de la página
];

export default () => (
  <footer className="relative mt-40 pt-24 overflow-hidden">
    <section>
      <BorderGradient className=" absolute inset-x-0 top-0 mx-auto" />
      <BgGradient className="absolute inset-x-0 top-0 mx-auto" />
      <div className="custom-screen-lg pb-6 gap-x-8 items-start justify-between flex-wrap relative sm:flex w-fit">
        <div className="max-w-xs space-y-3 flex flex-col items-center">
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter text-indigo-400 pr-0"
          >
            <Brand />
          </Link>{" "}
          <p className="text-sm text-zinc-300">
            Dopamina es una marca registrada. <br />
          </p>
        <SocialMedia></SocialMedia>
        <div className="flex-1 mt-4 pb-8 flex flex-wrap gap-4 font-medium sm:justify-end sm:mt-0">
          <ul className="flex-grow max-w-[15rem] space-y-2">
            {navigation.map((item, idx) => (
              <li
                key={idx}
                className="text-sm text-zinc-400 hover:text-zinc-100 duration-200"
              >
                <Link href={item.href} className="block sm:inline-block">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
      <div className="text-sm custom-screen text-center border-t border-dopamina-linea">
        <div className="text-dopamina-tinta-2 py-8">
          &copy; {new Date().getFullYear()} Dopamina · El estrimin que mira Uruguay · <RelojMvd /> Montevideo
        </div>
      </div>
    </section>
  </footer>
);
