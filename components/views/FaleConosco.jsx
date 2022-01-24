import React, { useState } from "react";
import Contact from "../images/Contact";
import Input from "../common/Input";
import { GrMail } from "react-icons/gr";
import { ImPhone } from "react-icons/im";
import * as yup from "yup";

function FaleConosco() {
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
    <div id="faleconosco" className="h-screen w-screen bg-theme-light-white ">
      <div className="h-full w-4/5 flex  flex-col m-auto p-20 ">
        <div className="h-1/5 flex items-end ">
          <h1 className="text-5xl text-theme-green font-questrial uppercase">
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

        <form name="form1" id="form1" method="post" onSubmit={addUser}>
          <div className="flex w-full  h-4/5 mt-20">
            <div className=" w-1/2  h-full flex flex-col ">
              <div className="mt-14">
                <Input
                  type="text"
                  name="name"
                  id="name"
                  inputType="input"
                  placeholder="DIGITE SEU NOME"
                  divStyle="h-16"
                  onChange={valueInput}
                  // value={user.name}
                ></Input>
              </div>
              <div className="flex items-center justify-between w-full mt-14">
                <Input
                  type="text"
                  name="telefone"
                  id="telefone"
                  inputType="mask"
                  placeholder="(00)99999-9999"
                  divStyle="w-[35%] h-16"
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
                  divStyle="w-[60%] h-16"
                  onChange={valueInput}
                  // value={user.email}
                ></Input>
              </div>
              <div className="mt-14 h-full">
                <Input
                  type="text"
                  name="mensagem"
                  id="mensagem"
                  inputType="textarea"
                  placeholder="DIGITE SUA MENSAGEM"
                  divStyle="h-full "
                  onChange={valueInput}
                  value={user.mensagem}
                ></Input>
              </div>
            </div>
            <div className="h-full w-1/2 ml-14 align-center justify-center flex flex-col font-questrial font-normal">
              <Contact />
              <div className="h-1/4 w-full rounded-3xl bg-theme-dark-blue text-theme-white flex  flex-col justify-between p-8  ">
                <p className="text-theme-white text-2xl flex  ml-8 ">
                  <ImPhone className="text-theme-light-blue text-3xl mr-10" />
                  31-3798-2045 / 31-99909-4098
                </p>
                <p className="text-theme-white text-2xl flex  ml-8 ">
                  <GrMail className="text-theme-light-blue text-3xl mr-10" />
                  contatoaqualeve@gmail.com
                </p>
              </div>
              <button
                type="submit"
                value="enviar"
                className="rounded-full uppercase bg-theme-yellow w-3/5 h-20 text-theme-white font-semibold text-xl font-mont mt-14 ml-14"
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
