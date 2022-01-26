import React from "react";

const Produto = ({ data }) => {
  const component = `produto-${data?.id}`;
  return (
    <div
      id={`${component}`}
      className="lg:max-w-full max-w-md lg:max-h-full h-full  flex flex-col items-center justify-between lg:justify-center lg:flex-row  lg:p-16 xl:p-32 m-auto"
    >
      <div
        id={`${component}-background`}
        className="hidden lg:flex xl:w-3/5 lg:w-full  lg:h-full xl:h-3/5 lg:rounded-l-xl rounded-3xl bg-theme-lightest-blue lg:absolute "
      ></div>
      <div
        id={`${component}-foreground`}
        className="xl:w-4/5 w-full h-full lg:p-2 py-4 flex flex-col items-center lg:justify-center justify-between  text-center  lg:rounded-l-xl rounded-3xl bg-theme- lg:z-10 bg-theme-lightest-blue"
      >
        <h1 className="xl:text-3xl lg:text-2xl text-xl w-4/5 lg:w-full mb-6 font-mont uppercase text-theme-middle-blue font-semibold">
          {data.name}
        </h1>
        <h2 className="leading-loose text-theme-black font-questrial xl:text-md lg:text-sm font-regular w-full">
          {data.text}
        </h2>
        <img
          src={data.image.url}
          className=" rounded-full h-2/5  border-white lg:hidden"
        />

        <div className=" w-full  mt-4 p-4 rounded-3xl lg:flex flex-col items-center  bg-theme-middle-blue hidden ">
          <h3 className="text-theme-white font-mont font-semibold text-xs font-regular xl:mb-10 ">
            {data.composition}
          </h3>
          <ul className="text-theme-white w-full font-mont xl:font-semibold lg:font-medium text-xs font-regular ">
            {data.chemicals.map(({ name, value, id }) => (
              <li key={id} className="w-full flex lg:justify-between ">
                <span>{name}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <img
        src={data.image.url}
        className="z-10 rounded-full xl:h-4/5 h-3/5 bg-theme-orange xl:border-[15px] lg:border-[5px] border-white hidden lg:block"
      />
    </div>
  );
};

export default Produto;
