import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const Empresa = ({ data }) => {
  return (
    <div className="flex w-full mx-auto mb-6 h-1/2 p-32">
      <img src={data.image.url} className="rounded-3xl h-3/4 mr-20" />
      <h1 className="justify-center items-center flex text-theme-black font-questrial text-3xl font-regular">
        {data.text}
      </h1>
    </div>
  );
};

export default Empresa;
