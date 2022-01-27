import React, { useState } from "react";
import Contact from "../images/Contact";
import Input from "../common/Input";
import { GrMail } from "react-icons/gr";
import { ImPhone } from "react-icons/im";
import * as yup from "yup";

function FaleConosco() {
  const component = "faleconosco";
  const [user, setUser] = useState({
    name: "",
    telefone: "",
    email: "",
    mensagem: "",
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const valueInput = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const addUser = async (e) => {
    e.preventDefault();

    if (!(await validate())) return;

    const saveDataForm = true;

    if (saveDataForm) {
      setStatus({
        type: "success",
        mensagem: "Usuário cadastrado com sucesso!",
      });
      setUser({
        name: "",
        telefone: "",
        email: "",
        mensagem: "",
      });
    } else {
      setStatus({
        type: "error",
        mensagem: "Erro: Usuário não cadastrado com sucesso!",
      });
    }
  };

  async function validate() {
    let schema = yup.object().shape({
      mensagem: yup
        .string("Erro: Necessário preencher o campo mensagem!")
        .required("Erro:Necessário preencher o campo mensagem!"),
      email: yup
        .string("Erro: Necessário preencher o campo email!")
        .required("Erro:Necessário preencher o campo email!")
        .email("Erro: Necessário preencher o campo com e-mail válido!"),
      telefone: yup
        .string("Erro: Necessário preencher o campo telefone!")
        .required("Erro:Necessário preencher o campo telefone!"),
      name: yup
        .string("Erro: Necessário preencher o campo nome!")
        .required("Erro:Necessário preencher o campo nome!"),
    });
    try {
      await schema.validate(user);
      return true;
    } catch (err) {
      setStatus({
        type: "error",
        mensagem: err.errors,
      });
      return false;
    }
  }

  return (
    <div
      id={component}
      className="content-base sm:content-sm md:content-md lg:content-lg xl:content-xl"
    >
      <div
        id={`${component}-container`}
        className="h-full w-full lg:w-4/5 flex flex-col justify-between m-auto p-8 lg:p-20"
      >
        <div
          id={`${component}-heading`}
          className="h-1/6 lg:h-1/5 flex lg:items-end items-center lg:mb-0"
        >
          <h1 className="lg:text-5xl text-3xl text-theme-green font-questrial uppercase">
            fale conosco
          </h1>
        </div>
        {status.type === "success" ? (
          <p style={{ color: "green" }}>{status.mensagem}</p>
        ) : (
          ""
        )}
        {status.type === "error" ? (
          <p style={{ color: "#ff0000" }}>{status.mensagem}</p>
        ) : (
          ""
        )}

        <form
          name="form1"
          id="form1"
          method="post"
          onSubmit={addUser}
          className=" w-full h-5/6 lg:h-4/5 "
        >
          <div
            id={`${component}-main`}
            className="w-full h-full flex flex-col-reverse lg:flex-row"
          >
            <div
              id={`${component}-inputs`}
              className="w-full h-1/2 lg:w-1/2 lg:h-full flex flex-col"
            >
              <div className="lg:mt-14 mt-0">
                <Input
                  type="text"
                  name="name"
                  id="name"
                  inputType="input"
                  placeholder="DIGITE SEU NOME"
                  divStyle="h-8 lg:h-12 xl:16  "
                  onChange={valueInput}
                  // value={user.name}
                ></Input>
              </div>
              <div className="flex items-center justify-between w-full mt-2 lg:mt-8 xl:mt-14">
                <Input
                  type="text"
                  name="telefone"
                  id="telefone"
                  inputType="mask"
                  placeholder="(00)99999-9999"
                  divStyle="w-[39%] lg:w-[47%] xl:w-[35%]h-8 lg:h-12 xl:16"
                  mask="(99) 99999-9999"
                  maskChar=""
                  onChange={valueInput}
                  // value={user.telefone}
                ></Input>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  inputType="input"
                  placeholder="SEU E-MAIL"
                  divStyle="w-[60%] lg:[52%] xl:[60%] h-8 lg:h-12 xl:16"
                  onChange={valueInput}
                  // value={user.email}
                ></Input>
              </div>
              <div className="mt-2 lg:mt-8 xl:mt-14 lg:h-full">
                <Input
                  type="text"
                  name="mensagem"
                  id="mensagem"
                  inputType="textarea"
                  placeholder="DIGITE SUA MENSAGEM"
                  divStyle="lg:h-full h-24"
                  onChange={valueInput}
                  value={user.mensagem}
                ></Input>
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
                <p className="text-theme-white flex  ml-4 ">
                  <ImPhone className="text-theme-light-blue lg:text-lg xl:text-xl lg:mr-6 xl:mr-10 mr-4" />
                  31-3798-2045 / 31-99909-4098
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
  );
}

export default FaleConosco;
