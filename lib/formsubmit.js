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

    throw new Error(providerMessage || "Não foi possível enviar a mensagem.");
  }

  return data;
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

export {
  assertFormSubmitResponse,
  createActivationError,
  deliverFormSubmitFormData,
  deliverFormSubmitJson,
  isFormSubmitSuccess,
};
