import { CONTACT_EMAIL } from "./contact";

function isFormSubmitSuccess(data) {
  return data?.success === true || data?.success === "true";
}

function createActivationError(message) {
  const error = new Error(
    message ||
      `Ative o formulário: abra o Gmail de ${CONTACT_EMAIL}, procure por FormSubmit (também em Spam/Promoções) e clique em "Activate Form". Depois envie de novo.`
  );
  error.statusCode = 409;
  return error;
}

function assertFormSubmitResponse(response, data) {
  const providerMessage = String(data.message || data.error || "");

  if (!response.ok || !isFormSubmitSuccess(data)) {
    if (/activat/i.test(providerMessage)) {
      throw createActivationError();
    }

    if (/web server|html files/i.test(providerMessage)) {
      throw new Error(
        "Não foi possível enviar a mensagem pelo servidor. Recarregue a página e tente novamente."
      );
    }

    throw new Error(providerMessage || "Não foi possível enviar a mensagem.");
  }

  return data;
}

function buildContactFormSubmitFields(payload) {
  return {
    Nome: payload.nome,
    "E-mail": payload.email,
    Telefone: payload.telefone || "Não informado",
    Mensagem: payload.mensagem,
    Idioma: "Português (Brasil)",
    Origem: "Site Aqualeve — Fale conosco",
    _subject: `Contato pelo site Aqualeve — ${payload.nome}`,
    _replyto: payload.email,
    _template: "table",
    _captcha: "false",
  };
}

function resolveRequestOrigin(req) {
  if (req?.headers?.origin) {
    return req.headers.origin;
  }

  const host =
    req?.headers?.["x-forwarded-host"] || req?.headers?.host || "";
  if (host) {
    const proto = req?.headers?.["x-forwarded-proto"] || "https";
    return `${proto}://${host}`;
  }

  return process.env.NEXT_PUBLIC_SITE_URL || "https://aqualeve.com.br";
}

async function deliverFormSubmitJson(fields, origin) {
  const response = await fetch(
    `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(origin
          ? {
              Origin: origin,
              Referer: `${origin}/`,
            }
          : {}),
      },
      body: JSON.stringify(fields),
    }
  );

  const data = await response.json().catch(() => ({}));
  return assertFormSubmitResponse(response, data);
}

async function deliverFormSubmitFormData(formData, origin) {
  const response = await fetch(
    `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        ...(origin
          ? {
              Origin: origin,
              Referer: `${origin}/`,
            }
          : {}),
      },
      body: formData,
    }
  );

  const data = await response.json().catch(() => ({}));
  return assertFormSubmitResponse(response, data);
}

/**
 * Browser-side FormSubmit works reliably because the real page Origin is sent.
 * Server-side proxies on Vercel often fail activation / origin checks.
 */
async function submitContactFromBrowser(payload) {
  const response = await fetch(
    `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(buildContactFormSubmitFields(payload)),
    }
  );

  const data = await response.json().catch(() => ({}));
  return assertFormSubmitResponse(response, data);
}

export {
  assertFormSubmitResponse,
  buildContactFormSubmitFields,
  createActivationError,
  deliverFormSubmitFormData,
  deliverFormSubmitJson,
  isFormSubmitSuccess,
  resolveRequestOrigin,
  submitContactFromBrowser,
};
