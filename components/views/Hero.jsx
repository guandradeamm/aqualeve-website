import React from "react";
import { Banner } from "../images";

const Hero = () => {
  return (
    <div className="w-full h-screen relative ">
      <div className="w-1/2 h-4/5 flex items-center justify-center absolute   ">
        <h1 className="z-10 text-7xl font-livvic font-semibold italic text-theme-middle-blue w-4/5 ">
          A água mais pura de
          <span className=" text-theme-dark-blue"> Minas</span>
        </h1>
      </div>

      <Banner className="w-full -mt-32" />
    </div>
  );
};

export default Hero;
