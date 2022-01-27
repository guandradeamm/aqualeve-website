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
      className="content-base sm:content-sm md:content-md lg:content-lg xl:content-xl"
    >
      <div
        id={`${component}-container`}
        className="h-full w-full lg:w-4/5 flex flex-col justify-between m-auto p-8 lg:p-20"
      >
        <div
          id={`${component}-heading`}
          className="lg:h-1/5 flex items-center lg:items-end mb-10 lg:mb-0"
        >
          <h1 className="lg:text-5xl text-3xl  text-theme-green font-questrial">
            EMPRESA
          </h1>
        </div>
        <div
          id={`${component}-slide`}
          className="h-5/6 lg:h-4/5 flex items-center justify-center w-full"
        >
          <Swiper
            id={`${component}-swiper-screens`}
            className="h-full w-full hidden lg:block"
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
            className="h-full w-full lg:hidden"
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
