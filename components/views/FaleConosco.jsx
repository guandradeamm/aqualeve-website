import React, { useRef, useState } from "react";
import Contact from "../images/Contact";
import { GrMail } from "react-icons/gr";
import { ImPhone } from "react-icons/im";
import emailjs from "emailjs-com";

function FaleConosco() {
  const component = "faleconosco";
  const form = useRef();
  const [formulario, setFormulario] = useState({
    nome: "",
    telefone: "",
    email: "",
    mensagem: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };
  const defaultStyles =
    "w-full border-theme-middle-blue h-full  rounded-xl lg:rounded-3xl border-2 p-2 lg:p-4 xl:p-8 text-xs lg:text-sm placeholder-theme-middle-blue hover:border-theme-green focus:border-theme-green focus:text-theme-green text-theme-middle-blue focus:outline-none active:border-theme-green focus:placeholder-theme-green uppercase";

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_tuqvq1n",
        "template_vmqz2vl",
        form.current,
        "jtJfa-fEZWBCEqgT8"
      )
      .then(
        (result) => {
          if (result.status === 200) {
            alert("Mensagem enviada com sucesso !");
            setFormulario({
              nome: "",
              telefone: "",
              email: "",
              mensagem: "",
            });
          } else {
            alert(
              "Ocorreu algum erro, favor conferir se os campos estão preenchidos corretamente."
            );
          }
        },
        (error) => {
          alert(
            "Ocorreu algum erro, favor conferir se os campos estão preenchidos corretamente."
          );
        }
      );
  };

  return (
    <div
      id={component}
      className="content-base pb-6
      sm:content-sm
      md:content-md
      lg:content-lg lg:pb-0
      xl:content-xl"
    >
      <div
        id={`${component}-container`}
        className="h-full w-full flex flex-col justify-between m-auto p-8 space-y-4
        lg:max-w-screen-lg lg:p-12
        xl:max-w-screen-xl xl:p-10"
      >
        <div id={`${component}-heading`} className="flex items-center">
          <h1
            className="text-3xl text-theme-green font-questrial uppercase
          lg:text-5xl"
          >
            fale conosco
          </h1>
        </div>
        <div
          id={`${component}-content`}
          className="h-full w-full max-w-md flex flex-col items-center justify-center m-auto
          md:max-w-lg
          lg:max-w-none"
        >
          <form
            ref={form}
            onSubmit={sendEmail}
            className="w-full h-5/6
            lg:h-4/5 "
            id="formulario-faleconosco"
          >
            <div
              id={`${component}-main`}
              className="w-full h-full flex flex-col-reverse
              lg:flex-row"
            >
              <div
                id={`${component}-inputs`}
                className="w-full h-1/2 flex flex-col
                lg:w-1/2 lg:h-full"
              >
                <div
                  className="mt-0
                lg:mt-14 h-8 lg:h-12 xl:16"
                >
                  <input
                    type="text"
                    name="nome"
                    value={formulario.nome}
                    inputType="input"
                    placeholder="DIGITE SEU NOME"
                    onChange={handleChange}
                    className={defaultStyles}
                  ></input>
                </div>
                <div className="flex items-center justify-between mt-2 lg:mt-8 xl:mt-14 w-full h-8 lg:h-12 xl:16">
                  <input
                    type="text"
                    name="telefone"
                    value={formulario.telefone}
                    onChange={handleChange}
                    inputType="mask"
                    placeholder="(00)99999-9999"
                    className={defaultStyles}
                    mask="(99) 99999-9999"
                    maskChar=""
                  ></input>
                  <input
                    type="email"
                    name="email"
                    value={formulario.email}
                    onChange={handleChange}
                    inputType="input"
                    placeholder="SEU E-MAIL"
                    className={defaultStyles}
                  ></input>
                </div>
                <div className="mt-2 lg:mt-8 xl:mt-14 lg:h-full">
                  <textarea
                    type="text"
                    name="mensagem"
                    value={formulario.mensagem}
                    onChange={handleChange}
                    inputType="textarea"
                    placeholder="DIGITE SUA MENSAGEM"
                    className={defaultStyles}
                    divStyle="lg:h-full h-24"
                  />
                </div>
                <button
                  type="submit"
                  value="enviar"
                  className="lg:hidden rounded-full uppercase bg-theme-yellow hover:bg-theme-orange lg:w-3/5 w-4/5 lg:h-20 h-8 text-theme-white lg:font-semibold font-medium lg:text-xl text-base font-mont lg:mt-14 mt-4 lg:ml-14 ml-8"
                >
                  enviar mensagem
                </button>
              </div>
              <div
                id={`${component}-contact`}
                className="h-1/2 lg:h-full lg:w-1/2 w-full lg:ml-14 items-center justify-center flex flex-col font-questrial font-normal mb-8 lg:mb-0"
              >
                <Contact className="h-3/4 xl:h-4/5 w-full" />

                <div className="h-1/4 w-11/12 lg:w-full rounded-2xl bg-theme-dark-blue text-theme-white flex  flex-col justify-between p-2 lg:p-4 text-sm lg:text-base xl:text-xl ">
                  <p className="text-theme-white flex  ml-4">
                    <ImPhone className="text-theme-light-blue lg:text-lg xl:text-xl lg:mr-6 xl:mr-10 mr-4" />
                    +55 31 99909-4098
                  </p>
                  <p className="text-theme-white flex ml-4">
                    <GrMail className="text-theme-light-blue lg:text-lg xl:text-xl lg:mr-6 xl:mr-10 mr-4" />
                    contatoaqualeve@gmail.com
                  </p>
                </div>
                <button
                  type="submit"
                  value="enviar"
                  className="hidden items-center lg:block rounded-full uppercase bg-theme-yellow hover:bg-theme-orange lg:w-4/5 xl:w-3/5 lg:h-1/6 xl:3/5 text-theme-white font-semibold text-xl font-mont lg:mt-8 xl:mt-14"
                >
                  enviar mensagem
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FaleConosco;
