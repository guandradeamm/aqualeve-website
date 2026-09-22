import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  IoCloseOutline,
  IoCloudUploadOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { CONTACT_EMAIL } from "../../lib/contact";
import {
  RESUME_ALLOWED_EXTENSIONS,
  RESUME_MAX_BYTES,
  getExtension,
} from "../../lib/resume";
import {
  formatBrazilianPhone,
  isValidBrazilianPhone,
} from "../../lib/phone";

const emptyForm = {
  nome: "",
  telefone: "",
  email: "",
  mensagem: "",
};

const ACCEPT_TYPES = RESUME_ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(
  ","
);

const IFRAME_NAME = "curriculo-submit-frame";

function ensureSubmitIframe(iframeName) {
  let iframe = document.querySelector(`iframe[name="${iframeName}"]`);
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.title = "Envio de currículo";
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
  }
  return iframe;
}

function validateResumeForm(formulario, file) {
  const errors = {};

  if (!String(formulario.nome || "").trim()) {
    errors.nome = "Informe o seu nome.";
  }

  const email = String(formulario.email || "").trim();
  if (!email) {
    errors.email = "Informe o seu e-mail.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!file) {
    errors.arquivo = "Anexe o currículo em PDF ou Word.";
  } else {
    const extension = getExtension(file.name);
    if (!RESUME_ALLOWED_EXTENSIONS.includes(extension)) {
      errors.arquivo = "Use apenas arquivos PDF, DOC ou DOCX.";
    } else if (file.size > RESUME_MAX_BYTES) {
      errors.arquivo = "O currículo deve ter no máximo 5 MB.";
    }
  }

  if (
    String(formulario.telefone || "").trim() &&
    !isValidBrazilianPhone(formulario.telefone)
  ) {
    errors.telefone = "Informe um telefone brasileiro válido com DDD.";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
  };
}

function appendHidden(form, name, value) {
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

/**
 * FormSubmit drops attachments on AJAX/JSON and React re-renders can empty
 * a controlled form mid-submit. Build a detached multipart form instead.
 */
function submitResumeToFormSubmit({ formulario, file, iframeName }) {
  ensureSubmitIframe(iframeName);

  const form = document.createElement("form");
  form.method = "POST";
  form.action = `https://formsubmit.co/${CONTACT_EMAIL}`;
  form.enctype = "multipart/form-data";
  form.target = iframeName;
  form.style.display = "none";

  const nome = formulario.nome.trim();
  const email = formulario.email.trim();
  const telefone = formulario.telefone.trim() || "Não informado";
  const mensagem =
    formulario.mensagem.trim() || "Currículo enviado pelo site Aqualeve.";

  appendHidden(form, "Nome", nome);
  appendHidden(form, "E-mail", email);
  appendHidden(form, "Telefone", telefone);
  appendHidden(form, "Mensagem", mensagem);
  appendHidden(form, "Idioma", "Português (Brasil)");
  appendHidden(form, "Origem", "Site Aqualeve — Envie seu currículo");
  appendHidden(form, "_subject", `Currículo pelo site Aqualeve — ${nome}`);
  appendHidden(form, "_template", "table");
  appendHidden(form, "_captcha", "false");
  appendHidden(form, "_replyto", email);

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.name = "attachment";
  const transfer = new DataTransfer();
  transfer.items.add(file);
  fileInput.files = transfer.files;
  form.appendChild(fileInput);

  document.body.appendChild(form);
  form.submit();
  window.setTimeout(() => {
    form.remove();
  }, 1500);
}

function EnvieCurriculo({ isOpen, closeIsOpen }) {
  const fileInputRef = useRef(null);
  const [formulario, setFormulario] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const resetForm = () => {
    setFormulario(emptyForm);
    setFile(null);
    setErrors({});
    setStatus("idle");
    setFeedback("");
    setIsDragging(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape" && status !== "sending") {
        resetForm();
        closeIsOpen();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, status, closeIsOpen]);

  const handleClose = () => {
    if (status === "sending") {
      return;
    }
    resetForm();
    closeIsOpen();
  };

  const handleChange = (event) => {
    const { name } = event.target;
    let { value } = event.target;

    if (name === "telefone") {
      value = formatBrazilianPhone(value);
    }

    setFormulario((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status !== "idle") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const assignFile = (selected) => {
    if (!selected) {
      return;
    }
    setFile(selected);
    setErrors((prev) => ({ ...prev, arquivo: undefined }));
    if (status !== "idle") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const handleFileInput = (event) => {
    assignFile(event.target.files?.[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    if (status === "sending") {
      return;
    }
    const selected = event.dataTransfer.files?.[0];
    if (!selected || !fileInputRef.current) {
      return;
    }

    const transfer = new DataTransfer();
    transfer.items.add(selected);
    fileInputRef.current.files = transfer.files;
    assignFile(selected);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validation = validateResumeForm(formulario, file);
    if (!validation.ok) {
      setErrors(validation.errors);
      setStatus("error");
      setFeedback("Confira os campos destacados e tente novamente.");
      return;
    }

    submitResumeToFormSubmit({
      formulario,
      file,
      iframeName: IFRAME_NAME,
    });
    resetForm();
    closeIsOpen();
  };

  if (!isOpen) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

  const isSending = status === "sending";
  const inputClass =
    "w-full rounded-xl border-2 border-theme-middle-blue bg-theme-white px-4 py-3 text-sm uppercase text-theme-dark-blue placeholder-theme-middle-blue outline-none transition focus:border-theme-green focus:text-theme-green";

  return createPortal(
    <div
      className="fixed inset-0 overflow-y-auto"
      style={{ zIndex: 100 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="envie-curriculo-title"
    >
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <button
          type="button"
          aria-label="Fechar overlay do currículo"
          className="fixed inset-0 cursor-default bg-theme-dark-blue/70"
          onClick={handleClose}
          disabled={isSending}
        />

        <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl bg-theme-light-white shadow-2xl shadow-theme-black/30">
          <div
            className="px-6 py-5 text-theme-white sm:px-8"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, #023047, var(--campaign-modal-via), var(--campaign-modal-to))",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mont text-xs font-semibold uppercase tracking-[0.2em] text-theme-light-blue">
                  Trabalhe conosco
                </p>
                <h2
                  id="envie-curriculo-title"
                  className="mt-2 font-questrial text-2xl uppercase sm:text-3xl"
                >
                  Envie seu currículo
                </h2>
                <p className="mt-2 max-w-md font-mont text-sm text-theme-light-white/90">
                  Preencha seus dados e anexe o arquivo em PDF ou Word. Vamos
                  receber em {CONTACT_EMAIL}.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                disabled={isSending}
                aria-label="Fechar modal de currículo"
                className="rounded-full bg-theme-white/10 p-2 text-2xl transition hover:bg-theme-white/20 disabled:opacity-50"
              >
                <IoCloseOutline />
              </button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 px-6 py-6 sm:px-8 sm:py-8"
            noValidate
          >
            <div>
              <label className="mb-1 block font-mont text-xs font-semibold uppercase text-theme-dark-blue">
                Nome
              </label>
              <input
                type="text"
                name="nome"
                value={formulario.nome}
                onChange={handleChange}
                placeholder="Seu nome completo"
                className={inputClass}
                disabled={isSending}
                required
              />
              {errors.nome ? (
                <p className="mt-1 text-xs text-red-600">{errors.nome}</p>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-mont text-xs font-semibold uppercase text-theme-dark-blue">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formulario.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className={inputClass}
                  disabled={isSending}
                  required
                />
                {errors.email ? (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                ) : null}
              </div>
              <div>
                <label className="mb-1 block font-mont text-xs font-semibold uppercase text-theme-dark-blue">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="telefone"
                  value={formulario.telefone}
                  onChange={handleChange}
                  placeholder="(00) 99999-9999"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={15}
                  className={inputClass}
                  aria-invalid={Boolean(errors.telefone)}
                  disabled={isSending}
                />
                {errors.telefone ? (
                  <p className="mt-1 text-xs text-red-600">{errors.telefone}</p>
                ) : null}
              </div>
            </div>

            <div>
              <label className="mb-1 block font-mont text-xs font-semibold uppercase text-theme-dark-blue">
                Mensagem (opcional)
              </label>
              <textarea
                name="mensagem"
                value={formulario.mensagem}
                onChange={handleChange}
                placeholder="Conte um pouco sobre sua experiência ou área de interesse"
                rows={3}
                className={`${inputClass} resize-none normal-case`}
                disabled={isSending}
              />
            </div>

            <div>
              <p className="mb-2 font-mont text-xs font-semibold uppercase text-theme-dark-blue">
                Currículo (PDF, DOC ou DOCX)
              </p>
              <label
                htmlFor="curriculo-arquivo"
                onDragOver={(event) => {
                  event.preventDefault();
                  if (!isSending) {
                    setIsDragging(true);
                  }
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-theme-lightest-blue/40 px-4 py-8 text-center transition ${
                  errors.arquivo
                    ? "border-red-500"
                    : isDragging
                    ? "border-theme-green bg-theme-green/10"
                    : "border-theme-middle-blue hover:border-theme-green"
                } ${isSending ? "pointer-events-none opacity-60" : ""}`}
              >
                <input
                  id="curriculo-arquivo"
                  ref={fileInputRef}
                  type="file"
                  name="arquivo"
                  accept={ACCEPT_TYPES}
                  onChange={handleFileInput}
                  className="sr-only"
                  disabled={isSending}
                  aria-label="Anexar currículo em PDF ou Word"
                />
                {file ? (
                  <div className="flex items-start gap-3 text-left text-theme-dark-blue">
                    <IoDocumentTextOutline className="mt-0.5 text-2xl text-theme-green" />
                    <div>
                      <p className="font-mont text-sm font-semibold">
                        {file.name}
                      </p>
                      <p className="text-xs text-theme-middle-blue">
                        {(file.size / 1024).toFixed(1)} KB · clique ou arraste
                        outro arquivo para trocar
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <IoCloudUploadOutline className="text-3xl text-theme-middle-blue" />
                    <p className="mt-3 font-mont text-sm font-semibold uppercase text-theme-dark-blue">
                      Arraste o arquivo ou clique para selecionar
                    </p>
                    <p className="mt-1 font-mont text-xs text-theme-middle-blue">
                      PDF, DOC ou DOCX · máximo 5 MB
                    </p>
                  </>
                )}
              </label>
              {errors.arquivo ? (
                <p className="mt-1 text-xs text-red-600">{errors.arquivo}</p>
              ) : null}
            </div>

            {feedback ? (
              <p
                role="status"
                className={`font-mont text-sm ${
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

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSending}
                className="rounded-full border-2 border-theme-middle-blue px-6 py-3 font-mont text-sm font-semibold uppercase text-theme-middle-blue transition hover:bg-theme-middle-blue hover:text-theme-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSending}
                className="rounded-full campaign-cta px-6 py-3 font-mont text-sm font-semibold uppercase text-theme-white transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSending ? "Enviando..." : "Enviar currículo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default EnvieCurriculo;
