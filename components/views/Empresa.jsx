import React from "react";
import Slide from "../common/SlideEmpresa";
import { Navigation, Pagination, Autoplay, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Empresa = ({ content }) => {
  const component = "empresa";
  return (
    <div
      id={component}
      className="content-base pb-6
      sm:content-sm 
      md:content-md 
      lg:content-lg lg:pb-0
      xl:content-xl"
    >
      <div
        id={`${component}-container`}
        className="h-full w-full flex flex-col justify-between m-auto p-8 space-y-4
        lg:max-w-screen-lg lg:p-12
        xl:max-w-screen-xl xl:p-10"
      >
        <div id={`${component}-heading`} className="flex items-center">
          <h1
            className="text-3xl text-theme-green font-questrial
          lg:text-5xl "
          >
            EMPRESA
          </h1>
        </div>
        <div
          id={`${component}-slide`}
          className="h-5/6 w-full flex items-center justify-center
          lg:h-full"
        >
          <Swiper
            id={`${component}-swiper-screens`}
            className="h-full w-full hidden xl:block"
            // install Swiper modules
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletClass: "bulletInactive",
              bulletActiveClass: "bulletActive",
            }}
            navigation
            autoplay
          >
            {content.map((slide) => (
              <SwiperSlide key={slide?.id}>
                <Slide data={slide} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            id={`${component}-swiper-mobile`}
            className="h-full w-full xl:hidden"
            modules={[A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay
          >
            {content.map((slide) => (
              <SwiperSlide key={slide?.id}>
                <Slide data={slide} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Empresa;
