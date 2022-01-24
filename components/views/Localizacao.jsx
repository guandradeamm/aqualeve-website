import React from "react";
import Player from "react-player";

const Localizacao = ({ content }) => {
  const { locationVideo } = content[0];
  return (
    <div id="localizacao" className="h-screen w-screen ">
      <div className="h-full w-4/5 flex  flex-col m-auto p-20 ">
        <div className="h-1/5 flex items-end ">
          <h1 className="text-5xl text-theme-green font-questrial">
            LOCALIZAÇÃO
          </h1>
        </div>
        <div className="h-4/5 w-full flex">
          <div className="h-full w-full flex items-center justify-between">
            <div className="w-[45%] h-full bg-theme-white flex items-center justify-center">
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
            <div class="flex flex-col items-center justify-center bg-theme-white h-full w-[45%] p-6">
              <div class="overflow-hidden h-2/3 w-full">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="border-0"
                  src="https://maps.google.com/maps?q=aqualeve&t=&z=7&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                ></iframe>
              </div>
              <h4 className="font-questrial font-regular text-xl w-[500px] text-center mt-4">
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
