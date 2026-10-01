import React, { useState } from "react";
import { GrMail } from "react-icons/gr";
import { ImPhone } from "react-icons/im";
import Contact from "../images/Contact";
import {
  CONTACT_EMAIL,
  normalizeContactPayload,
  validateContactPayload,
} from "../../lib/contact";
import { submitContactFromBrowser } from "../../lib/formsubmit";
import { formatBrazilianPhone, isValidBrazilianPhone } from "../../lib/phone";

const emptyForm = {
  nome: "",
  telefone: "",
  email: "",
  mensagem: "",
};

function FaleConosco() {
  const component = "faleconosco";
  const [formulario, setFormulario] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const defaultStyles =
    "w-full border-theme-middle-blue h-full rounded-xl lg:rounded-3xl border-2 p-2 lg:p-4 xl:p-8 text-xs lg:text-sm placeholder-theme-middle-blue hover:border-theme-green focus:border-theme-green focus:text-theme-green text-theme-middle-blue focus:outline-none active:border-theme-green focus:placeholder-theme-green uppercase";

  const errorStyles = "border-red-500 focus:border-red-500";

  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "telefone") {
      value = formatBrazilianPhone(value);
    }

    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status !== "idle") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const fieldClass = (name) =>
    `${defaultStyles}${errors[name] ? ` ${errorStyles}` : ""}`;

  const sendEmail = async (e) => {
    e.preventDefault();

    const payload = normalizeContactPayload(formulario);
    const validation = validateContactPayload(payload);

    if (!validation.ok) {
      setErrors(validation.errors);
      setStatus("error");
      setFeedback("Confira os campos destacados e tente novamente.");
      return;
    }

    if (payload.telefone && !isValidBrazilianPhone(payload.telefone)) {
      setErrors({
        telefone: "Informe um telefone brasileiro válido com DDD.",
      });
      setStatus("error");
      setFeedback("Confira os campos destacados e tente novamente.");
      return;
    }

    setStatus("sending");
    setFeedback("Enviando mensagem...");
    setErrors({});

    try {
      await submitContactFromBrowser(payload);

      setFormulario(emptyForm);
      setStatus("success");
      setFeedback(
        `Mensagem enviada com sucesso para ${CONTACT_EMAIL}. Em breve retornaremos o contato.`
      );
    } catch (error) {
      setStatus("error");
      setFeedback(
        error.message ||
          "Não foi possível enviar a mensagem agora. Tente novamente."
      );
    }
  };

  const isSending = status === "sending";

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
            className="text-3xl text-campaign-heading font-questrial uppercase
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
            onSubmit={sendEmail}
            className="w-full h-5/6
            lg:h-4/5 "
            id="formulario-faleconosco"
            noValidate
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
                    placeholder="DIGITE SEU NOME"
                    onChange={handleChange}
                    className={fieldClass("nome")}
                    aria-invalid={Boolean(errors.nome)}
                    disabled={isSending}
                    required
                  />
                </div>
                {errors.nome ? (
                  <p className="mt-1 text-xs text-red-600">{errors.nome}</p>
                ) : null}
                <div className="flex items-center justify-between gap-2 mt-2 lg:mt-8 xl:mt-14 w-full h-8 lg:h-12 xl:16">
                  <input
                    type="tel"
                    name="telefone"
                    value={formulario.telefone}
                    onChange={handleChange}
                    placeholder="(00) 99999-9999"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={15}
                    className={fieldClass("telefone")}
                    aria-invalid={Boolean(errors.telefone)}
                    disabled={isSending}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formulario.email}
                    onChange={handleChange}
                    placeholder="SEU E-MAIL"
                    className={fieldClass("email")}
                    aria-invalid={Boolean(errors.email)}
                    disabled={isSending}
                    required
                  />
                </div>
                {errors.telefone ? (
                  <p className="mt-1 text-xs text-red-600">{errors.telefone}</p>
                ) : null}
                {errors.email ? (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                ) : null}
                <div className="mt-2 lg:mt-8 xl:mt-14 lg:h-full">
                  <textarea
                    name="mensagem"
                    value={formulario.mensagem}
                    onChange={handleChange}
                    placeholder="DIGITE SUA MENSAGEM"
                    className={fieldClass("mensagem")}
                    aria-invalid={Boolean(errors.mensagem)}
                    disabled={isSending}
                    required
                  />
                </div>
                {errors.mensagem ? (
                  <p className="mt-1 text-xs text-red-600">{errors.mensagem}</p>
                ) : null}
                {feedback ? (
                  <p
                    role="status"
                    className={`mt-3 text-sm font-mont ${
                      status === "success"
                        ? "text-theme-green"
                        : status === "error"
                        ? "text-red-600"
                        : "text-theme-middle-blue"
                    }`}
                  >
                    {feedback}
                  </p>
                ) : null}
                <button
                  type="submit"
                  value="enviar"
                  disabled={isSending}
                  className="lg:hidden rounded-full uppercase campaign-cta disabled:opacity-60 disabled:cursor-not-allowed lg:w-3/5 w-4/5 lg:h-20 h-8 text-theme-white lg:font-semibold font-medium lg:text-xl text-base font-mont lg:mt-14 mt-4 lg:ml-14 ml-8"
                >
                  {isSending ? "enviando..." : "enviar mensagem"}
                </button>
              </div>
              <div
                id={`${component}-contact`}
                className="h-1/2 lg:h-full lg:w-1/2 w-full lg:ml-14 items-center justify-center flex flex-col font-questrial font-normal mb-8 lg:mb-0"
              >
                <Contact className="h-3/4 xl:h-4/5 w-full" />

                <div className="h-1/4 w-11/12 lg:w-full rounded-2xl bg-theme-dark-blue text-theme-white flex flex-col justify-between p-2 lg:p-4 text-sm lg:text-base xl:text-xl ">
                  <a
                    href="tel:+5531999094098"
                    className="text-theme-white flex ml-4 hover:text-theme-light-blue"
                  >
                    <ImPhone className="text-theme-light-blue lg:text-lg xl:text-xl lg:mr-6 xl:mr-10 mr-4" />
                    +55 31 99909-4098
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-theme-white flex ml-4 hover:text-theme-light-blue"
                  >
                    <GrMail className="text-theme-light-blue lg:text-lg xl:text-xl lg:mr-6 xl:mr-10 mr-4" />
                    {CONTACT_EMAIL}
                  </a>
                </div>
                <button
                  type="submit"
                  value="enviar"
                  disabled={isSending}
                  className="hidden items-center lg:block rounded-full uppercase campaign-cta disabled:opacity-60 disabled:cursor-not-allowed lg:w-4/5 xl:w-3/5 lg:h-1/6 xl:3/5 text-theme-white font-semibold text-xl font-mont lg:mt-8 xl:mt-14"
                >
                  {isSending ? "enviando..." : "enviar mensagem"}
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
