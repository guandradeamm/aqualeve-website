import React from "react";

import Produto from "../common/Produto";

import { Navigation, Pagination, Autoplay, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Produtos = ({ content }) => {
  return (
    <div id="produtos" className="h-screen w-screen bg-theme-light-white">
      <div className="h-full w-4/5 flex justify-center flex-col m-auto p-20 ">
        <div className="h-1/5 flex items-end ">
          <h1 className="text-5xl text-theme-green font-questrial">PRODUTOS</h1>
        </div>
        <div
          className="h-full flex  justify-center w-full
        "
        >
          <Swiper
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
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {content.map((slide) => (
              <SwiperSlide>
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
