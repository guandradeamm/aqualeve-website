import { CONTACT_EMAIL } from "../../lib/contact";
import { getSmtpConfig, sendResumeEmail } from "../../lib/mail";
import {
  normalizeResumePayload,
  validateResumePayload,
} from "../../lib/resume";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "6mb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = normalizeResumePayload(req.body);
  const validation = validateResumePayload(payload);

  if (!validation.ok) {
    return res.status(400).json({
      error: "Dados inválidos.",
      errors: validation.errors,
    });
  }

  if (!getSmtpConfig()) {
    return res.status(503).json({
      error:
        "Envio de currículo por SMTP não configurado. Use o formulário do site.",
      code: "SMTP_NOT_CONFIGURED",
    });
  }

  try {
    await sendResumeEmail(payload);

    return res.status(200).json({
      ok: true,
      message: `Currículo enviado para ${CONTACT_EMAIL}.`,
    });
  } catch (error) {
    console.error("resume form error:", error);
    return res.status(error.statusCode || 502).json({
      error:
        error.message ||
        "Não foi possível enviar o currículo agora. Tente novamente em instantes.",
      code: error.code,
    });
  }
}
