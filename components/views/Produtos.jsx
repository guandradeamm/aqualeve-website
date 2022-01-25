import React from "react";
import Produto from "../common/Produto";
import { Navigation, Pagination, Autoplay, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Produtos = ({ content }) => {
  const component = "produtos";
  return (
    <div id={component} className="h-screen w-screen bg-theme-light-white">
      <div
        id={`${component}-container`}
        className="h-full w-full lg:w-4/5 flex flex-col justify-center m-auto p-8 xl:p-20 "
      >
        <div
          id={`${component}-heading`}
          className="lg:h-1/5 flex items-center lg:items-end mb-10 lg:mb-0 "
        >
          <h1 className="lg:text-5xl text-3xl  text-theme-green font-questrial">
            PRODUTOS
          </h1>
        </div>
        <div
          id={`${component}-slide`}
          className="h-full flex items-center justify-center w-full
        "
        >
          <Swiper
            id={`${component}-swiper-screens`}
            className="h-full w-full hidden xl:block"
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletClass: "bulletInactive",
              bulletActiveClass: "bulletActive",
            }}
            navigation
            autoplay={{ delay: 3500 }}
          >
            {content.map((slide) => (
              <SwiperSlide key={slide?.id}>
                <Produto data={slide} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            id={`${component}-swiper-mobile`}
            className="h-full w-full xl:hidden"
            modules={[A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{ delay: 3500 }}
          >
            {content.map((slide) => (
              <SwiperSlide key={slide?.id}>
                <Produto data={slide} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Produtos;
