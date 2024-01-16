import React from "react";
import { GrInstagram } from "react-icons/gr";
import Image from "next/image";
import Link from "next/link";

const Hero = ({ content }) => {
  const { instagram } = content;
  const component = "hero";
  return (
    <div
      id={component}
      className="content-base sm:content-sm md:content-md lg:content-lg xl:content-xl py-10 lg:py-0"
    >
      <div className="w-full h-1/2 lg:h-full relative mb-20 lg:my-0">
        <div className="w-full h-2/6 flex items-center justify-center absolute inset-0 ">
          <h1 className="w-4/5 z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:mt-40 lg:leading-snug font-livvic font-semibold italic text-theme-middle-blue">
            A água mais pura
            <br />
            <span className=" text-theme-dark-blue"> de Minas</span>
          </h1>
        </div>
        <Image
          priority
          src="/assets/img/banner.jpg"
          layout="fill"
          className="object-right-bottom object-cover w-full h-full"
        />
      </div>
      <div className="lg:hidden w-full h-1/2 flex justify-center">
        <Link href={instagram?.href} passHref>
            <button className="uppercase text-theme-white bg-theme-yellow rounded-full p-4 sm:p-6 font-mont font-semibold text-lg md:text-xl hover:bg-theme-orange">
              <span className=" flex items-center">
                siga no instagram
                <GrInstagram className="text-theme-white w-5 h-5 ml-4" />
              </span>
            </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
