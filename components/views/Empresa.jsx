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
<<<<<<< HEAD
  const component = "empresa";
  return (
    <div id={component} className="h-full w-full">
      <div
        id={`${component}-container`}
        className="h-full w-full lg:w-4/5 flex flex-col justify-between m-auto p-6 lg:p-20"
      >
        <div
          id={`${component}-heading`}
          className="lg:h-1/5 flex items-center lg:items-end mb-10 lg:mb-0"
        >
          <h1 className="text-3xl text-theme-green font-questrial">EMPRESA</h1>
        </div>
        <div
          id={`${component}-slide`}
          className="h-full lg:h-4/5 flex items-center justify-center w-full"
        >
          <Swiper
            id={`${component}-swiper-screens`}
            className="h-full w-full hidden lg:block"
=======
  return (
    <div id="empresa" className="h-screen w-screen">
      <div className="h-full w-4/5 flex justify-center flex-col m-auto p-20">
        <div className="h-1/5 flex items-end">
          <h1 className="text-5xl text-theme-green font-questrial">EMPRESA</h1>
        </div>
        <div className="h-4/5 flex items-center justify-center w-full">
          <Swiper
>>>>>>> b2b14e2b2ab51cdc249a4b8de6523961620aa546
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
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {content.map((slide) => (
              <SwiperSlide>
                <Slide data={slide} />
              </SwiperSlide>
            ))}
          </Swiper>
<<<<<<< HEAD
          <Swiper
            id={`${component}-swiper-mobile`}
            className="h-full w-full lg:hidden"
            modules={[A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {content.map((slide) => (
              <SwiperSlide>
                <Slide data={slide} />
              </SwiperSlide>
            ))}
          </Swiper>
=======
>>>>>>> b2b14e2b2ab51cdc249a4b8de6523961620aa546
        </div>
      </div>
    </div>
  );
};

export default Empresa;
