import { CONTACT_EMAIL } from "./contact";

const RESUME_MAX_BYTES = 5 * 1024 * 1024;
const RESUME_ALLOWED_EXTENSIONS = ["pdf", "doc", "docx"];
const RESUME_ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function getExtension(filename = "") {
  const parts = String(filename).toLowerCase().split(".");
  return parts.length > 1 ? parts.pop() : "";
}

function getDecodedByteLength(base64 = "") {
  if (!base64) {
    return 0;
  }

  if (typeof Buffer !== "undefined") {
    return Buffer.from(base64, "base64").length;
  }

  try {
    return atob(base64).length;
  } catch (error) {
    return 0;
  }
}

function normalizeResumePayload(body = {}) {
  const arquivo = body.arquivo || {};

  return {
    nome: String(body.nome || "").trim(),
    telefone: String(body.telefone || "").trim(),
    email: String(body.email || "").trim(),
    mensagem: String(body.mensagem || "").trim(),
    arquivo: {
      name: String(arquivo.name || "").trim(),
      type: String(arquivo.type || "").trim(),
      data: String(arquivo.data || "").replace(/^data:[^;]+;base64,/, ""),
    },
  };
}

function validateResumePayload(payload) {
  const errors = {};

  if (!payload.nome) {
    errors.nome = "Informe o seu nome.";
  }

  if (!payload.email) {
    errors.email = "Informe o seu e-mail.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.email = "Informe um e-mail válido.";
  }

  const extension = getExtension(payload.arquivo.name);
  if (!payload.arquivo.name || !payload.arquivo.data) {
    errors.arquivo = "Anexe o currículo em PDF ou Word.";
  } else if (!RESUME_ALLOWED_EXTENSIONS.includes(extension)) {
    errors.arquivo = "Use apenas arquivos PDF, DOC ou DOCX.";
  } else if (
    payload.arquivo.type &&
    !RESUME_ALLOWED_MIME_TYPES.includes(payload.arquivo.type)
  ) {
    errors.arquivo = "O tipo do arquivo precisa ser PDF ou Word.";
  } else {
    const size = getDecodedByteLength(payload.arquivo.data);
    if (!size) {
      errors.arquivo = "O arquivo anexado está vazio ou inválido.";
    } else if (size > RESUME_MAX_BYTES) {
      errors.arquivo = "O currículo deve ter no máximo 5 MB.";
    }
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
  };
}

export {
  CONTACT_EMAIL,
  RESUME_ALLOWED_EXTENSIONS,
  RESUME_ALLOWED_MIME_TYPES,
  RESUME_MAX_BYTES,
  getExtension,
  normalizeResumePayload,
  validateResumePayload,
};
