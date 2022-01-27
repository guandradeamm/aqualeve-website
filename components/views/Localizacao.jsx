import React from "react";
import Player from "react-player";

const Localizacao = ({ content }) => {
  const { locationVideo } = content[0];
  const component = "localizacao";
  return (
    <div
      id={component}
      className="content-base sm:content-sm md:content-md lg:content-lg xl:content-xl "
    >
      <div
        id={`${component}-container`}
        className="h-full w-full lg:w-4/5 flex flex-col justify-between m-auto p-8 lg:p-20"
      >
        <div
          id={`${component}-heading`}
          className="lg:h-1/5 flex lg:items-end items-center lg:mb-0"
        >
          <h1 className="lg:text-5xl text-3xl text-theme-green font-questrial">
            LOCALIZAÇÃO
          </h1>
        </div>
        <div id={`${component}-main`} className="h-5/6 lg:h-4/5 w-full flex">
          <div
            id={`${component}-componentVideo`}
            className="h-full w-full lg:flex lg:items-center lg:justify-between"
          >
            <div
              id={`${component}-video`}
              className="lg:w-[45%] w-full lg:h-full h-2/5 bg-theme-white flex items-center justify-center"
            >
              <Player
                url={locationVideo.url}
                loop={true}
                playing={true}
                muted={true}
                width={"100%"}
                height={"100%"}
                playsinline={true}
              />
            </div>
            <div
              id={`${component}-componentMap`}
              className="flex flex-col items-center justify-center bg-theme-white lg:h-full h-3/5 lg:w-[45%] w-full lg:p-6"
            >
              <div
                id={`${component}-map`}
                className="overflow-hidden h-2/3 w-full"
              >
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="border-0"
                  src="https://maps.google.com/maps?q=aqualeve&t=&z=7&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                ></iframe>
              </div>
              <h4 className="font-questrial font-regular lg:text-xl text-base w-[100%] text-center mt-4">
                Rua Antônio Luiz Aleixo, 02 Pontal - Ponte Nova-MG CEP:
                35435-500
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Localizacao;
