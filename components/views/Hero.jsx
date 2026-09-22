import React from "react";
import Image from "next/image";

const Hero = () => {
  const component = "hero";
  return (
    <div
      id={component}
      className="content-base sm:content-sm md:content-md lg:content-lg xl:content-xl py-10 lg:py-0"
    >
      <div className="w-full h-full relative">
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
          alt="A água mais pura de Minas"
          layout="fill"
          className="object-right-bottom object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Hero;
