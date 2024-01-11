import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import emailjs from "emailjs-com";

const fileTypes = ["PDF", "PNG", "JPG"];

const EnvieCurriculo = ({ isOpen, closeIsOpen }) => {
  const [files, setFile] = useState(null);

  const sendEmail = (e) => {
    console.log(e);
    emailjs
      .sendForm(
        "guandradeamm",
        "template_q6yxms6",
        document.getElementById("file"),
        ""
      )
      .then((response) => {
        alert("E-mail enviado com sucesso", response);
      })
      .catch((error) => {
        alert("Erro ao enviar e-mail", error);
      });
  };

  const handleChange = (file) => {
    setFile(file);
  };
  const sendEmailFile = () => {
    sendEmail(files);
  };

  return (
    isOpen && (
      <div className=" z-50 top-1/2 left-1/2 fixed p-5 -translate-x-1/2 shadow-2xl shadow-black bg-theme-green">
        <p className="text-theme-white uppercase p-1">Anexe seu currículo</p>
        <div className="modal-content">
          <FileUploader
            handleChange={handleChange}
            name="Arquivo"
            types={fileTypes}
            label="Carregar arquivo ou solte-o aqui"
          />
        </div>
        <div className="p-2">
          <button
            onClick={sendEmailFile}
            type="button"
            className="p-3 uppercase bg-theme-yellow text-theme-white rounded-full font-mont font-semibold 
              hover:bg-theme-orange"
          >
            Confirmar
          </button>
          <button
            onClick={closeIsOpen}
            type="button"
            className="p-3 uppercase bg-theme-yellow text-theme-white rounded-full font-mont font-semibold 
          hover:bg-theme-orange"
          >
            Cancelar
          </button>
        </div>
      </div>
    )
  );
};

export default EnvieCurriculo;
