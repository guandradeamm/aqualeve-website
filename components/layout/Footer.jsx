import React from "react";
import Link from "next/link";

const Footer = ({ content }) => {
  const { github } = content;
  return (
    <div className="h-1/6 w-full text-theme-middle-blue text-[0.5rem] lg:text-xs 2xl:text-sm font-questrial font-semibold bg-theme-lightest-blue">
      <div className="w-1/2 h-full 2xl:w-full m-auto flex justify-center items-center text-center text-md ">
        <div className="2xl:flex lg:tracking-widest">
          <h1>
            ©️ 2022 Alvarenga Mineração & Engenharia Ltda Rua Antônio Luiz
            Aleixo, 02 Pontal Ponte Nova/MG CEP 35435-500 CNPJ:
            03.587.430/0001-40
          </h1>
          <h1 className="2xl:ml-10 2xl:mt-0 mt-2 ">Desenvolvido por:</h1>
          <Link href={github?.href}>
            <a
              target={"_blank"}
              rel={"noreferrer"}
              className="2xl:ml-1 hover:text-theme-dark-blue"
            >
              <span>Gustavo Andrade</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
