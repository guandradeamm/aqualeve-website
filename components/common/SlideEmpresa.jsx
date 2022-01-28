import React from "react";
import Image from "next/image";

const Empresa = ({ data }) => {
  const component = `empresa-${data?.id}`;
  return (
    <div
      id={`${component}`}
      className="max-w-md h-full flex flex-col items-center justify-between m-auto space-y-4
      lg:max-w-none lg:w-full lg:justify-center lg:flex-row lg:space-y-0 lg:space-x-6
      xl:w-5/6"
    >
      <div
        id={`${component}-image`}
        className="h-1/2 w-full relative
        lg:h-5/6 lg:w-1/2 lg:max-h-[300px]
        xl:max-h-[400px]"
      >
        <Image
          layout="fill"
          src={data?.image?.url}
          className="object-cover object-center h-full w-full rounded-3xl
          lg:object-cover 
          xl:object-cover"
        />
      </div>
      <div
        id={`${component}-info`}
        className="h-1/2 w-full p-2
        md:h-2/5 
        lg:h-full lg:w-1/2 lg:p-0 lg:flex lg:items-center lg:justify-center"
      >
        <h1
          className="text-xl flex justify-center items-center text-theme-black font-questrial font-regular text-justify
        lg:text-2xl lg:text-left
        xl:text-3xl"
        >
          {data.text}
        </h1>
      </div>
    </div>
  );
};

export default Empresa;
