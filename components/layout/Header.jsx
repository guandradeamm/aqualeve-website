import { Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { GrInstagram } from "react-icons/gr";
import { IoCloseOutline, IoMenuSharp } from "react-icons/io5";
import { Logo } from "../images";
import EnvieCurriculo from "../modal/EnvieCurriculo";

const Header = ({ content }) => {
  const component = "navbar";
  const { navigationLinks, instagram } = content;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const instagramHref = instagram?.href || "https://www.instagram.com/";

  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  return (
    <Fragment>
      <nav
        id={component}
        className="w-full h-base bg-campaign-header border-campaign-header-border border-b-2 fixed z-50 top-0 left-0 right-0
      sm:h-sm 
      md:h-md 
      lg:h-lg"
      >
        <div
          id={`${component}-container`}
          className="w-11/12 h-full m-auto flex items-center justify-between
      xl:w-10/12"
        >
          <div id={`${component}-logo`}>
            <Link passHref href="#hero">
              <div className="m-auto">
                <Logo className="mt-1 h-base sm:h-sm md:h-md lg:h-lg" />
              </div>
            </Link>
          </div>
          <div
            id={`${component}-navigation`}
            className="hidden flex-row justify-center items-center font-mont font-semibold text-xs space-x-2
          lg:flex
          xl:space-x-4 xl:text-sm
          2xl:text-base"
          >
            {navigationLinks.map(({ href, name, id }) => (
              <Link passHref key={id} href={href}>
                <span className="text-theme-white uppercase p-3 hover:font-bold hover:bg-campaign-nav-hover hover:rounded-full">
                  {name}
                </span>
              </Link>
            ))}
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir Instagram da Aqualeve em nova aba"
              className="p-3 campaign-cta text-campaign-cta-ink flex items-center justify-center rounded-full text-lg
              xl:text-xl"
            >
              <GrInstagram />
            </a>
            <button
              type="button"
              onClick={openModal}
              className="p-3 uppercase campaign-cta text-campaign-cta-ink rounded-full font-mont font-semibold"
            >
              envie seu currículo
            </button>
          </div>
          <div id={`${component}-mobile-navigation`} className="lg:hidden flex">
            <button
              onClick={(event) => {
                event.preventDefault();
                setIsOpen(!isOpen);
                return false;
              }}
              type="button"
              className="text-2xl text-theme-white cursor-pointer 
            hover:text-theme-light-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? <IoMenuSharp /> : <IoCloseOutline />}
            </button>
          </div>
        </div>
        <Transition
          show={isOpen}
          enter="transition-opacity duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="lg:hidden fixed inset-x-0 bottom-0 top-base z-40 sm:top-sm md:top-md"
            id="mobile-menu"
          >
            <button
              type="button"
              className="absolute inset-0 bg-theme-black/40"
              aria-label="Fechar menu"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-0 right-0 flex max-h-full w-full flex-col items-center overflow-y-auto rounded-bl-3xl bg-campaign-header px-6 py-8 md:w-3/5">
              {navigationLinks.map(({ name, id, href }) => (
                <div
                  key={id}
                  className="mb-6 p-2 text-theme-light-white uppercase"
                >
                  <Link passHref href={`${href}`}>
                    <span
                      onClick={() => setIsOpen(false)}
                      className="font-mont text-xl font-semibold"
                    >
                      {name}
                    </span>
                  </Link>
                </div>
              ))}
              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="mb-4 inline-flex max-w-full items-center justify-center gap-3 rounded-full campaign-cta px-5 py-3 text-center font-mont text-base font-semibold uppercase text-campaign-cta-ink"
              >
                siga no instagram
                <GrInstagram className="h-5 w-5 text-campaign-cta-ink" aria-hidden />
              </a>
              <button
                type="button"
                onClick={openModal}
                className="max-w-full rounded-full campaign-cta px-5 py-3 text-center font-mont text-base font-semibold uppercase text-campaign-cta-ink"
              >
                envie seu currículo
              </button>
            </div>
          </div>
        </Transition>
      </nav>
      <EnvieCurriculo isOpen={isOpenModal} closeIsOpen={closeModal} />
    </Fragment>
  );
};

export default Header;
