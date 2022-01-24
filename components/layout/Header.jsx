<<<<<<< HEAD
import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "../images";
import { GrInstagram } from "react-icons/gr";
import { IoMenuSharp, IoCloseOutline } from "react-icons/io5";
import { Transition } from "@headlessui/react";

const Header = ({ content }) => {
  const navigationLinks = content;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className=" w-full h-20 sm:h-24 md:h-32 lg:h-36 bg-theme-light-green border-theme-light-blue border-b-2 fixed z-50">
      <div className="w-11/12 lg:w-10/12 m-auto h-full flex items-center justify-between">
        <div id="logo">
          <Link href="/">
            <div className="m-auto">
              <Logo className="mt-1 h-20 sm:h-24 md:h-28 lg:h-32" />
=======
import React from "react";
import Link from "next/link";
import { Logo } from "../images";
import { GrInstagram } from "react-icons/gr";

const Header = () => {
  return (
    <nav className="w-screen h-32 bg-theme-light-green border-theme-light-blue border-b-2 fixed z-50">
      <div className="w-3/4 m-auto h-full  flex items-center justify-between">
        <div id="logo">
          <Link href="/">
            <div className="m-auto">
              <Logo className="w-4/5  mt-1 h-20 md:h-40 " />
>>>>>>> b2b14e2b2ab51cdc249a4b8de6523961620aa546
            </div>
          </Link>
        </div>
        <div
          id="navigation"
<<<<<<< HEAD
          className="hidden lg:flex flex-row justify-center items-center align-center padding-0 position-static font-mont font-semibold text-xs"
        >
          {navigationLinks.map(({ href, name, id }) => (
            <a key={id} href={href}>
              <span className="mr-2 lg:mr-6 text-theme-white uppercase">
                {name}
              </span>
            </a>
          ))}

          <a href="https://www.instagram.com/aguaaqualeve" target={"_blank"}>
            <div className="h-10 w-10 bg-theme-yellow flex items-center justify-center rounded-full mr-2 lg:mr-6 hover:bg-theme-orange">
=======
          className="flex flex-row justify-center items-center align-center padding-0 position-static font-mont font-semibold text-xs"
        >
          <a href="#empresa">
            <span className="mr-14 text-theme-white uppercase">empresa</span>
          </a>
          <a href="#produtos">
            <span className="mr-14 text-theme-white uppercase ">produtos</span>
          </a>
          <a href="#localizacao">
            <span className="mr-14 text-theme-white uppercase ">
              localização
            </span>
          </a>
          <a href="#faleconosco">
            <span className="mr-14 text-theme-white uppercase ">
              fale conosco
            </span>
          </a>

          <a href="https://www.instagram.com/aguaaqualeve" target={"_blank"}>
            <div className="h-10 w-10 bg-theme-yellow flex items-center justify-center rounded-full mr-14">
>>>>>>> b2b14e2b2ab51cdc249a4b8de6523961620aa546
              <GrInstagram className="text-theme-white w-5 h-5 " />
            </div>
          </a>
          <a>
<<<<<<< HEAD
            <button className="uppercase text-theme-white bg-theme-yellow rounded-full p-3 font-mont font-semibold hover:bg-theme-orange">
=======
            <button className="uppercase text-theme-white bg-theme-yellow rounded-full p-3 font-mont font-semibold">
>>>>>>> b2b14e2b2ab51cdc249a4b8de6523961620aa546
              envie seu currículo
            </button>
          </a>
        </div>
<<<<<<< HEAD
        <div className="lg:hidden flex">
          <button
            onClick={(event) => {
              event.preventDefault();
              setIsOpen(!isOpen);
              return false;
            }}
            type="button"
            className="text-2xl text-theme-white cursor-pointer hover:text-theme-light-white"
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
        {(ref) => (
          <div
            className="lg:hidden overflow-hidden relative h-screen w-screen "
            id="mobile-menu"
          >
            <div
              ref={ref}
              className="bg-theme-light-green h-full w-full md:h-1/2 md:w-3/5 top-0 right-0 z-40 py-8 flex flex-col absolute  rounded-bl-3xl"
            >
              <div className="flex flex-col items-center ">
                {navigationLinks.map(({ name, id, href }) => (
                  <div
                    key={id}
                    className="cursor-pointer text-theme-light-white uppercase hover:text-theme-light-white transition-all ease-in-out mb-8 p-2"
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
        )}
      </Transition>
=======
      </div>
>>>>>>> b2b14e2b2ab51cdc249a4b8de6523961620aa546
    </nav>
  );
};

export default Header;
