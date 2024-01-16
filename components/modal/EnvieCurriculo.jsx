import emailjs from "emailjs-com"
import React, { useState } from "react"
import { FileUploader } from "react-drag-drop-files"

const EnvieCurriculo = ({ isOpen, closeIsOpen }) => {
  const [file, setFile] = useState(null)

  const handleFileChange = (file) => {
    console.log("Here!")
    setFile(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async (e) => {
      const serviceId = "guandradeamm"
      const templateId = "template_q6yxms6"

      const emailParams = {
        to_name: "Mariana",
        from_name: "Gustavo",
        message: "Email message here",
        file: reader.result,
      }
      emailjs
        .send(serviceId, templateId, emailParams, "TQAEnhdRtfTgHWuC-")
        .then(
          (result) => {
            console.log(result)
          },
          (error) => {
            console.log(error)
          },
        )
    }
  }

  return (
    isOpen && (
      <div></div>
      // <form encType="multipart/form-data" method="post">
      //   {" "}
      //   <div className=" z-50 top-1/2 left-1/2 fixed p-5 -translate-x-1/2 shadow-2xl shadow-black bg-theme-green">
      //     {" "}
      //     <p className="text-theme-white uppercase p-1">
      //       Anexe seu currículo
      //     </p>{" "}
      //     <div className="modal-content">
      //       {" "}
      //       <FileUploader
      //         handleChange={handleFileChange}
      //         name="Arquivo"
      //         types={["pdf", "doc", "docx"]}
      //         label="Carregar arquivo ou solte-o aqui"
      //       />{" "}
      //     </div>{" "}
      //     <div className="flex gap-2">
      //       {" "}
      //       <button
      //         type="button"
      //         onClick={handleSubmit}
      //         className="p-3 uppercase bg-theme-yellow text-theme-white rounded-full font-mont font-semibold hover:bg-theme-orange"
      //       >
      //         {" "}
      //         Confirmar{" "}
      //       </button>{" "}
      //       <button
      //         onClick={closeIsOpen}
      //         type="button"
      //         className="p-3 uppercase bg-theme-yellow text-theme-white rounded-full font-mont font-semibold hover:bg-theme-orange"
      //       >
      //         {" "}
      //         Cancelar{" "}
      //       </button>{" "}
      //     </div>{" "}
      //   </div>{" "}
      // </form>
    )
  )
}

export default EnvieCurriculo
