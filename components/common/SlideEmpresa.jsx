import React from "react";
import Image from "next/image";

const Empresa = ({ data }) => {
  return (
    <div className="max-w-md lg:max-w-full h-full lg:w-full flex flex-col items-center justify-between lg:justify-center lg:flex-row lg:mb-6 lg:p-20 m-auto">
      <div className="relative h-2/5 md:h-3/5 w-full lg:h-full lg:w-1/2 mb-8 lg:mb-0 lg:mr-8 xl:mr-14">
        <Image
          layout="fill"
          src={data?.image?.url}
          className="object-cover object-center lg:object-contain xl:object-cover rounded-3xl h-full w-full"
        />
      </div>
      <div className="h-3/5 md:h-2/5 lg:h-full w-full lg:w-1/2 p-2 lg:p-0 lg:flex lg:items-center lg:justify-center">
        <h1 className="justify-center items-center flex text-theme-black font-questrial text-2xl xl:text-3xl font-regular text-justify lg:text-left">
          {data.text}
        </h1>
      </div>
    </div>
  );
};

export default Empresa;
