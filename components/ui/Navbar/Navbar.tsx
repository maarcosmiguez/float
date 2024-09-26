"use client";

import { useEffect, useState } from "react";
import LinkItem from "../LinkItem";
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

export default () => {
  const [state, setState] = useState(false);
  const [isNewsletterModalActive, setNewsletterModalActive] = useState(false);

  const [animateHeader, setAnimateHeader] = useState(false);
  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 140) {
        setAnimateHeader(true);
      } else setAnimateHeader(false);
    };
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  // Replace javascript:void(0) paths with your paths
  const navigation = [
    {
      title: "Inicio",
      path: "#home",
      icon: <HomeModernIcon className="w-4 h-4" />,
    },
    { title: "Contenido", path: "#contenido", icon: <PlayIcon className="w-4 h-4" /> },
    { title: "Qué hacemos", path: "#somos", icon: <BoltIcon className="w-4 h-4" /> },
  ];

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target as HTMLElement;
      if (target && !target.closest(".menu-btn")) setState(false);
    };
  }, []);

  function EditorWithAiButton() {
    return (
      <button
        className="w-full font-medium text-sm hover:text-gray-100 text-gray-300 flex items-center gap-2 duration-200 group px-2 lg:px-6 py-1 text-md leading-[22px] md:px-3"
        onClick={() => setNewsletterModalActive(true)}
      >
        <span className="hidden md:block">Aportar a este proyecto</span>
        <span className="md:hidden">Aportá</span>
        {/* El ícono siempre visible en mobile */}
        <SparklesIcon className="w-4 h-4 opacity-100 scale-100 md:opacity-0 md:group-hover:opacity-100 md:scale-50 md:group-hover:scale-125 duration-150" />
      </button>
    );
  }

  return (
    <>
      <header
        className={`w-full backdrop-filter backdrop-blur-lg bg-neutral-950/50 fixed z-50 trasition ease-in-out duration-500 ${
          animateHeader && "shadow-xl"
        }`}
      >
        <nav
          className={` ${
            state
              ? "absolute inset-x-0 shadow-lg rounded-xl bg-zinc-900 border border-zinc-800 mx-2 pb-5 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0 md:bg-transparent md:pb-0"
              : ""
          }`}
        >
          <div className="custom-screen-lg gap-x-14 items-center md:flex">
            <div
              className={`flex max-w-screen-xl py-10 ${
                animateHeader && "py-5"
              } mx-auto items-center justify-between px-2 trasition ease-in-out duration-500`}
            >
              <Link
                href="/"
                className="text-xl font-bold tracking-tighter text-indigo-400 pr-8"
              >
                Dopamina{" "}
              </Link>
              <div className="flex md:hidden">
                <div className="mr-3">
                  <EditorWithAiButton />
                </div>
                <button
                  aria-label="menu button"
                  className="menu-btn group"
                  onClick={() => setState(!state)}
                >
                  {state ? (
                    <XMarkIcon className="w-5 h-5 pointer-events-none text-zinc-500 group-hover:text-zinc-400" />
                  ) : (
                    <Bars3Icon className="w-5 h-5 pointer-events-none text-zinc-500 group-hover:text-zinc-400" />
                  )}
                </button>
              </div>
            </div>
            <div
              className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
                state ? "block" : "hidden"
              } `}
            >
              <ul className="flex-1 justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                {navigation.map((item, idx) => {
                  return (
                    <li
                      key={idx}
                      className="font-medium text-sm duration-200 flex items-center gap-2 group px-2 lg:px-6 py-1 text-md leading-[22px] md:px-3 hover:text-gray-100 text-gray-300"
                    >
                      <Link {...item.props} href={item.path} className="block">
                        {item.title}
                      </Link>
                      {/* El ícono siempre será visible en mobile */}
                      <item.icon.type className="w-4 h-4 opacity-100 scale-100 md:opacity-0 md:group-hover:opacity-100 md:scale-50 md:group-hover:scale-125 duration-150" />
                    </li>
                  );
                })}
                <li>
                  <EditorWithAiButton />
                </li>
              </ul>
              {/* <div className="mt-6 md:mt-0">
                <LinkItem
                  variant="shiny"
                  href="https://www.youtube.com/@miedoalexito_uy"
                  className="w-full block bg-zinc-800 hover:bg-zinc-700 md:bg-shiny"
                >
                  Nuestro Canal
                </LinkItem>
              </div> */}
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
