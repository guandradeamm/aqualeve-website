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
        className="h-full w-full flex flex-col justify-between m-auto p-8
        lg:max-w-screen-lg lg:p-12
        xl:max-w-screen-xl xl:p-10"
      >
        <div id={`${component}-heading`} className="flex items-center">
          <h1
            className="text-3xl text-theme-green font-questrial
          lg:text-5xl"
          >
            LOCALIZAÇÃO
          </h1>
        </div>
        <div
          id={`${component}-main`}
          className="h-5/6 w-full flex items-center justify-center
        lg:h-full"
        >
          <div
            id={`${component}-content`}
            className="h-full w-full 
            lg:flex lg:items-center lg:justify-between"
          >
            <div
              id={`${component}-video`}
              className="w-full h-2/5 flex items-center justify-center
              lg:w-[45%] lg:h-full"
            >
              <Player
                url={locationVideo?.url}
                loop={true}
                playing={true}
                muted={true}
                width={"100%"}
                height={"100%"}
                playsinline={true}
              />
            </div>
            <div
              id={`${component}-map-container`}
              className="h-3/5 w-full flex flex-col items-center justify-center space-y-4
              lg:h-full lg:w-[45%] lg:p-6"
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
              <h4
                className="font-questrial font-regular text-base w-full text-center
              lg:text-xl"
              >
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
