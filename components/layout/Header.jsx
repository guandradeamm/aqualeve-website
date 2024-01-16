import { Transition } from "@headlessui/react";
import Link from "next/link";
import React, { useState } from "react";
import { GrInstagram } from "react-icons/gr";
import { IoCloseOutline, IoMenuSharp } from "react-icons/io5";
import { EnvieCurriculo } from "../../components";
import { Logo } from "../images";

const Header = ({ content }) => {
  const component = "navbar";
  const { navigationLinks, instagram } = content;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };
  return (
    <nav
      id={component}
      className="w-full h-base bg-theme-light-green border-theme-light-blue border-b-2 fixed z-50 inset-0
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
              <span
                className="text-theme-white uppercase p-3
                hover:font-bold hover:bg-theme-yellow hover:rounded-full"
              >
                {name}
              </span>
            </Link>
          ))}
          <Link passHref href={instagram?.href}>
            <div
              className="p-3 bg-theme-yellow text-theme-white flex items-center justify-center rounded-full text-lg
              xl:text-xl 
              hover:bg-theme-orange"
            >
              <GrInstagram />
            </div>
          </Link>
          <button
            className="p-3 uppercase bg-theme-yellow text-theme-white rounded-full font-mont font-semibold 
              hover:bg-theme-orange"
            onClick={openModal}
          >
            envie seu currículo
          </button>
          <EnvieCurriculo isOpen={isOpenModal} closeIsOpen={closeModal} />
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
            aria-controls="mobile=menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? <IoMenuSharp /> : <IoCloseOutline />}
          </button>
        </div>
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div
          className="lg:hidden overflow-hidden relative h-full w-full"
          id="mobile-menu"
        >
          <div className="bg-theme-light-green h-full w-full md:h-1/2 md:w-3/5 top-0 right-0 z-40 py-8 flex flex-col absolute  rounded-bl-3xl">
            <div className="flex flex-col items-center">
              {navigationLinks.map(({ name, id, href }) => (
                <div
                  key={id}
                  className="text-theme-light-white uppercase hover:text-theme-light-white transition-all ease-in-out mb-8 p-2"
                >
                  <Link passHref href={`${href}`}>
                    <span
                      onClick={() => setIsOpen(!isOpen)}
                      className="font-mont text-xl font-semibold sm:text-2xl md:text-xl"
                    >
                      {name}
                    </span>
                  </Link>
                </div>
              ))}
              <a>
                <button className="uppercase text-theme-white bg-theme-yellow rounded-full p-4 font-mont font-semibold text-xl sm:text-2xl md:text-xl sm:p-6 md:p-4">
                  envie seu currículo
                </button>
              </a>
            </div>
          </div>
          <div className="h-screen w-screen bg-theme-black opacity-40"></div>
        </div>
      </Transition>
    </nav>
  );
};

export default Header;
