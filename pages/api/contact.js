import {
  CONTACT_EMAIL,
  normalizeContactPayload,
  validateContactPayload,
} from "../../lib/contact";
import { deliverFormSubmitJson } from "../../lib/formsubmit";
import { getSmtpConfig, sendContactEmail } from "../../lib/mail";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = normalizeContactPayload(req.body);
  const validation = validateContactPayload(payload);

  if (!validation.ok) {
    return res.status(400).json({
      error: "Dados inválidos.",
      errors: validation.errors,
    });
  }

  try {
    const provider = process.env.CONTACT_PROVIDER || "auto";
    const origin =
      req.headers.origin ||
      (req.headers.host ? `http://${req.headers.host}` : "");

    if ((provider === "smtp" || provider === "auto") && getSmtpConfig()) {
      await sendContactEmail(payload);
    } else {
      await deliverFormSubmitJson(
        {
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
        },
        origin
      );
    }

    return res.status(200).json({
      ok: true,
      message: `Mensagem enviada para ${CONTACT_EMAIL}.`,
    });
  } catch (error) {
    console.error("contact form error:", error);
    return res.status(error.statusCode || 502).json({
      error:
        error.message ||
        "Não foi possível enviar a mensagem agora. Tente novamente em instantes.",
    });
  }
}
