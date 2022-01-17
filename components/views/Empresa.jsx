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
  return (
    <div id="empresa" className="h-screen w-screen">
      <div className="h-full w-4/5 flex justify-center flex-col m-auto p-20">
        <div className="h-1/5 flex items-end">
          <h1 className="text-5xl text-theme-green font-questrial">EMPRESA</h1>
        </div>
        <div className="h-4/5 flex items-center justify-center w-full">
          <Swiper
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
        </div>
      </div>
    </div>
  );
};

export default Empresa;
