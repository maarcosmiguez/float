"use client";

import { useEffect, useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
  HomeModernIcon,
  PlayIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";
import Brand from "../Brand";
import Link from "next/link";
import NewsletterModal from "../NewsletterModal";
import BorderGradient from "../Footer/BorderGradient";
import BgGradient from "../BgGradient";

export default () => {
  const [state, setState] = useState(false);
  const [isNewsletterModalActive, setNewsletterModalActive] = useState(false);
  const [animateHeader, setAnimateHeader] = useState(false);

  // Manejo del scroll para animar el header
  useEffect(() => {
    const listener = () => {
      setAnimateHeader(window.scrollY > 140);
    };
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  // Navegación del sitio
  const navigation = [
    {
      title: "Inicio",
      path: "#home",
      icon: <HomeModernIcon className="w-4 h-4" />,
    },
    {
      title: "Contenido",
      path: "#contenido",
      icon: <PlayIcon className="w-4 h-4" />,
    },
    {
      title: "Qué hacemos",
      path: "#somos",
      icon: <BoltIcon className="w-4 h-4" />,
    },
  ];

  // Cerrar menú al hacer clic fuera de él
  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target as HTMLElement;
      if (target && !target.closest(".menu-btn")) {
        setState(false);
      }
    };
  }, []);

  // Botón para abrir el modal de newsletter
  function EditorWithAiButton() {
    return (
      <button
        className="w-full font-medium text-sm hover:text-gray-100 text-gray-300 flex items-center gap-2 duration-200 group px-2 lg:px-6 py-1 text-md leading-[22px] md:px-3"
        onClick={() => setNewsletterModalActive(true)}
      >
        <span className="hidden md:block">Aportar a este proyecto</span>
        <span className="md:hidden">Aportá</span>
        <SparklesIcon className="w-4 h-4 opacity-100 scale-100 md:opacity-0 md:group-hover:opacity-100 md:scale-50 md:group-hover:scale-125 duration-150" />
      </button>
    );
  }

  return (
    <>
      <header
        className={`w-full backdrop-filter backdrop-blur-lg bg-neutral-950/50 fixed z-50 transition ease-in-out duration-500 ${
          animateHeader ? "shadow-xl" : ""
        }`}
      >
        <nav
          className={`${
            state
              ? "absolute inset-x-0 shadow-lg backdrop-filter backdrop-blur-lg bg-gray-950 pb-5 md:shadow-none md:border-none md:mx-2 md:mt-0 md:bg-transparent md:pb-0 h-screen"
              : ""
          }`}
        >
          <div className="custom-screen-lg gap-x-14 items-center md:flex">
            <div
              className={`flex max-w-screen-xl py-10 ${
                animateHeader ? "py-5" : ""
              } mx-auto items-center justify-between px-2 transition ease-in-out duration-500`}
            >
              <BgGradient className="absolute inset-x-0 top-0 mx-auto z-0" />
              <Link
                href="/"
                className="text-xl font-bold tracking-tighter text-indigo-400 pr-8 z-10"
              >
                <Brand />
              </Link>
              <div className="flex md:hidden">
                <button
                  aria-label="menu button"
                  className="menu-btn group z-10"
                  onClick={() => setState(!state)}
                >
                  {state ? (
                    <XMarkIcon className="w-5 h-5 pointer-events-none text-zinc-500 group-hover:text-zinc-400 transition-all duration-300 transform scale-110" />
                  ) : (
                    <Bars3Icon className="w-5 h-5 pointer-events-none text-zinc-500 group-hover:text-zinc-400 transition-all duration-300 transform scale-110 rotate-0" />
                  )}
                </button>
              </div>
            </div>
            <div
              className={`flex-1 items-center mt-8 md:mt-0 md:flex z-20 ${
                state ? "block" : "hidden"
              }`}
            >
              <ul className="flex-1 justify-end items-center space-y-4 md:flex md:space-x-2 md:space-y-0">
                {navigation.map((item, idx) => (
                  <li
                    key={idx}
                    className="font-medium text-sm duration-200 flex items-center gap-2 z-30 group px-2 lg:px-6 py-1 text-md leading-[22px] md:px-3 hover:text-gray-100 text-gray-300"
                  >
                    <Link
                      href={item.path}
                      className="block"
                      onClick={(e) => {
                        e.preventDefault();
                        const section = document.querySelector(item.path);
                        if (section) {
                          const sectionOffset =
                            section.getBoundingClientRect().top +
                            window.scrollY;
                          window.scrollTo({
                            top:
                              sectionOffset -
                              (window.innerHeight / 2 -
                                section.clientHeight / 2),
                            behavior: "smooth",
                          });
                        }
                      }}
                    >
                      {item.title}
                    </Link>
                    <item.icon.type className="w-4 h-4 opacity-100 scale-100 md:opacity-0 md:group-hover:opacity-100 md:scale-50 md:group-hover:scale-125 duration-150" />
                  </li>
                ))}
                <li>
                  <EditorWithAiButton />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <NewsletterModal
        isActive={isNewsletterModalActive}
        closeModal={setNewsletterModalActive}
      />
    </>
  );
};
