import React from "react";
import Image from "next/image";

const Produto = ({ data }) => {
  const component = `produto-${data?.id}`;
  return (
    <div
      id={`${component}`}
      className="max-w-md h-full flex flex-col items-center justify-between m-auto relative
      lg:max-w-none lg:w-full lg:justify-start lg:flex-row
      xl:w-5/6 xl:justify-center"
    >
      <div
        id={`${component}-background`}
        className="hidden rounded-3xl bg-theme-lightest-blue -z-10
        lg:block lg:w-2/3 lg:h-5/6 lg:rounded-l-xl lg:absolute lg:max-h-[450px]"
      ></div>
      <div
        id={`${component}-foreground`}
        className="max-w-xs w-full h-full py-4 space-y-4 flex flex-col items-center justify-between text-center rounded-3xl bg-theme-lightest-blue
        lg:max-w-none lg:h-5/6 lg:w-1/2 lg:p-6 lg:rounded-l-3xl lg:justify-start lg:max-h-[450px]
        xl:w-1/2"
      >
        <div
          id={`${component}-info`}
          className="h-1/2 w-4/5 flex flex-col space-y-2
          lg:w-5/6 lg:h-1/2 lg:justify-center"
        >
          <h1
            className="text-md font-mont uppercase text-theme-middle-blue font-semibold
          sm:text-lg
          lg:text-xl
          xl:text-3xl"
          >
            {data?.name}
          </h1>
          <h2
            className="leading-relaxed text-theme-black text-md font-questrial font-regular text-center
          sm:leading-loose sm:text-base 
          lg:text-sm lg:leading-normal
          xl:text-base"
          >
            {data?.text}
          </h2>
        </div>
        <div
          id={`${component}-mobile-image`}
          className="h-1/2 w-full relative
          lg:hidden lg:absolute"
        >
          <Image
            src={data?.image?.url}
            layout="fill"
            className="object-contain object-center w-full h-full"
          />
        </div>
        <div
          id={`${component}-chemicals`}
          className="hidden w-5/6 h-1/2 p-4 rounded-3xl flex-col items-center bg-theme-middle-blue 
          lg:flex lg:space-y-2"
        >
          <h3 className="text-theme-white font-mont font-semibold text-xs font-regular">
            {data?.composition}
          </h3>
          <ul
            className="text-theme-white w-full font-mont text-xs font-regular
          lg:font-medium lg:columns-2
          xl:font-semibold"
          >
            {data.chemicals.map(({ name, value, id }) => (
              <li key={id} className="w-full flex lg:justify-between ">
                <span>{name}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="aspect-square hidden h-full max-h-[500px] rounded-full border-white bg-theme-orange
      lg:block lg:border-[5px] 
      xl:border-[15px]"
      >
        <img src={data?.image?.url} className="object-contain w-full" />
      </div>
    </div>
  );
};

export default Produto;
