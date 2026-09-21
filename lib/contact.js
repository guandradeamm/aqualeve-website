import { isValidBrazilianPhone } from "./phone";

const CONTACT_EMAIL = "contatoaqualeve@gmail.com";

function normalizeContactPayload(body = {}) {
  return {
    nome: String(body.nome || "").trim(),
    telefone: String(body.telefone || "").trim(),
    email: String(body.email || "").trim(),
    mensagem: String(body.mensagem || "").trim(),
  };
}

function validateContactPayload(payload) {
  const errors = {};

  if (!payload.nome) {
    errors.nome = "Informe o seu nome.";
  }

  if (!payload.email) {
    errors.email = "Informe o seu e-mail.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (payload.telefone && !isValidBrazilianPhone(payload.telefone)) {
    errors.telefone = "Informe um telefone brasileiro válido com DDD.";
  }

  if (!payload.mensagem) {
    errors.mensagem = "Digite a sua mensagem.";
  } else if (payload.mensagem.length < 10) {
    errors.mensagem = "A mensagem precisa ter pelo menos 10 caracteres.";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
  };
}

export { CONTACT_EMAIL, normalizeContactPayload, validateContactPayload };
