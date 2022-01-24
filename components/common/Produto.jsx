import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const Produto = ({ data }) => {
  return (
    <div className="flex w-full h-full p-32">
      <div className="w-3/5 h-3/5 rounded-l-xl bg-theme-lightest-blue absolute top-0 bottom-0 my-auto z-0"></div>
      <div className="w-3/5 h-3/4 p-8 flex flex-col items-center rounded-l-xl bg-theme-lightest-blue my-auto z-10">
        <h1 className="text-3xl w-4/5 mb-6 font-mont uppercase text-theme-middle-blue font-semibold">
          {data.name}
        </h1>
        <h2 className="leading-loose text-theme-black font-questrial text-md font-regular w-4/5">
          {data.text}
        </h2>
        <div className=" w-4/5  mt-4 p-4 rounded-3xl flex flex-col items-center bg-theme-middle-blue">
          <h3 className="text-theme-white font-mont font-semibold text-xs font-regular mb-10">
            {data.composition}
          </h3>
          <ul className="text-theme-white w-full font-mont font-semibold text-xs font-regular">
            {data.chemicals.map(({ name, value }) => (
              <li className="w-full flex justify-between">
                <span>{name}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <img
        src={data.image.url}
        className="z-10 rounded-full h-full bg-theme-orange border-[15px] border-white"
      />
    </div>
  );
};

export default Produto;
