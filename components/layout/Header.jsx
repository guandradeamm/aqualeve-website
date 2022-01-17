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
            </div>
          </Link>
        </div>
        <div
          id="navigation"
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
              <GrInstagram className="text-theme-white w-5 h-5 " />
            </div>
          </a>
          <a>
            <button className="uppercase text-theme-white bg-theme-yellow rounded-full p-3 font-mont font-semibold">
              envie seu currículo
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
