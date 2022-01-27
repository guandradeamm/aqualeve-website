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
    <div
      id={component}
      className="content-base sm:content-sm md:content-md lg:content-lg xl:content-xl"
    >
      <div
        id={`${component}-container`}
        className="h-full w-full flex flex-col justify-between m-auto p-8
        lg:max-w-screen-lg lg:p-12
        xl:max-w-screen-xl xl:p-10"
      >
        <div id={`${component}-heading`} className="flex items-center">
          <h1
            className="text-3xl text-theme-green font-questrial
          lg:text-5xl"
          >
            PRODUTOS
          </h1>
        </div>
        <div
          id={`${component}-slide`}
          className="h-5/6 w-full flex items-center justify-center
          xl:h-full"
        >
          <Swiper
            id={`${component}-swiper-screens`}
            className="h-full w-full hidden xl:block "
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
            className="h-full w-full xl:hidden "
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
