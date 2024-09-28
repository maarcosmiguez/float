import Link from "next/link";
import Image from "next/image";
import Brand from "components/ui/Brand";
import BorderGradient from "./BorderGradient";
import BgGradient from "./BgGradient";
import SocialMedia from "../SocialMedia";

const navigation = [
  { name: "Inicio", href: "#" }, // Cambiar href a "#" para ir al principio de la página
];

export default () => (
  <footer className="relative mt-40 pt-24 overflow-hidden">
    <section>
      <BorderGradient className=" absolute inset-x-0 top-0 mx-auto" />
      <BgGradient className="absolute inset-x-0 top-0 mx-auto" />
      <div className="custom-screen-lg pb-6 gap-x-8 items-start justify-between flex-wrap relative sm:flex">
        <div className="max-w-xs space-y-3">
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter text-indigo-400 pr-8"
          >
            Dopamina{" "}
          </Link>{" "}
          <p className="text-sm text-zinc-300">
            Dopamina es una marca registrada. <br />
            Que ni se te ocurra.
          </p>
        <SocialMedia></SocialMedia>
        </div>
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
      <div className="text-sm custom-screen text-center border-t border-zinc-800">
        <div className="text-zinc-300 py-8">
          &copy; 2024 - Dopmaina - Para más placer
        </div>
      </div>
    </section>
  </footer>
);
