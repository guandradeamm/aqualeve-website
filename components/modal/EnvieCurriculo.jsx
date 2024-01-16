import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const EnvieCurriculo = ({ isOpen, closeIsOpen }) => {
  const [text, setText] = useState("");
  const [nome, setNome] = useState("");
  const [file, setFile] = useState(null);
  const defaultStyles =
    "w-full border-theme-middle-blue h-full  rounded-xl lg:rounded-3xl border-2 p-2 lg:p-4 xl:p-8 text-xs lg:text-sm placeholder-theme-middle-blue hover:border-theme-green focus:border-theme-green focus:text-theme-green text-theme-middle-blue focus:outline-none active:border-theme-green focus:placeholder-theme-green uppercase";

  const handleFileChange = (file) => {
    setFile(file);
  };

  const sendEmail = async () => {
    const body = {
      text: text,
      nome: nome,
      file: file,
    };

    const res = await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  return (
    isOpen && (
      <div className=" z-50 top-1/2 left-1/2 fixed p-5 -translate-x-1/2 shadow-2xl shadow-black bg-theme-green">
        {" "}
        <p className="text-theme-white uppercase p-1">
          Anexe seu currículo
        </p>{" "}
        <div
          className="mt-0
                lg:mt-2 h-8 lg:h-12 xl:16"
        >
          <input
            type="text"
            name="nome"
            value={nome}
            placeholder="DIGITE SEU NOME"
            onChange={(e) => setNome(e.target.value)}
            className={defaultStyles}
          ></input>
        </div>
        <div className="mt-1 mb-1 lg:mt-8 xl:mt-14 lg:h-full">
          <textarea
            type="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="DIGITE UM POUCO SOBRE VOCE"
            maxLength="140"
            className={defaultStyles}
          />
        </div>
        <div className="">
          {" "}
          <FileUploader
            handleChange={handleFileChange}
            name="Arquivo"
            types={["pdf", "doc", "docx"]}
            label="Carregar arquivo ou solte-o aqui"
          />{" "}
        </div>{" "}
        <div className="flex gap-2 mt-2">
          {" "}
          <button
            type="button"
            onClick={sendEmail}
            className="p-3 uppercase bg-theme-yellow text-theme-white rounded-full font-mont font-semibold hover:bg-theme-orange"
          >
            {" "}
            Confirmar{" "}
          </button>{" "}
          <button
            onClick={closeIsOpen}
            type="button"
            className="p-3 uppercase bg-theme-yellow text-theme-white rounded-full font-mont font-semibold hover:bg-theme-orange"
          >
            {" "}
            Cancelar{" "}
          </button>{" "}
        </div>{" "}
      </div>
    )
  );
};

export default EnvieCurriculo;
