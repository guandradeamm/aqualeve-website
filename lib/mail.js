import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "./contact";

function getSmtpConfig() {
  const user = process.env.CONTACT_SMTP_USER || CONTACT_EMAIL;
  const pass = process.env.CONTACT_SMTP_PASS;

  if (!pass) {
    return null;
  }

  return {
    user,
    pass,
    host: process.env.CONTACT_SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.CONTACT_SMTP_PORT || 465),
    secure: process.env.CONTACT_SMTP_SECURE !== "false",
  };
}

function createTransport() {
  const config = getSmtpConfig();
  if (!config) {
    return null;
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildResumeEmail({ nome, email, telefone, mensagem, arquivoNome }) {
  const rows = [
    ["Nome", nome],
    ["E-mail", email],
    ["Telefone", telefone || "Não informado"],
    ["Mensagem", mensagem || "Currículo enviado pelo site Aqualeve."],
    ["Arquivo", arquivoNome || "Anexo"],
  ];

  const text = [
    "Novo currículo recebido pelo site Aqualeve",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 12px;border:1px solid #d7edf6;font-weight:600;color:#023047;width:140px;">${escapeHtml(
          label
        )}</td>
        <td style="padding:10px 12px;border:1px solid #d7edf6;color:#023047;">${escapeHtml(
          value
        )}</td>
      </tr>`
    )
    .join("");

  const html = `
  <div style="font-family:Arial,sans-serif;background:#f4fafd;padding:24px;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #d7edf6;">
      <div style="background:#023047;color:#ffffff;padding:20px 24px;">
        <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#8ecae6;">Aqualeve</p>
        <h1 style="margin:8px 0 0;font-size:22px;">Novo currículo pelo site</h1>
      </div>
      <div style="padding:24px;">
        <p style="margin:0 0 16px;color:#023047;">Recebemos um novo currículo com os dados abaixo:</p>
        <table style="width:100%;border-collapse:collapse;background:#f4fafc;">${tableRows}</table>
        <p style="margin:16px 0 0;color:#219ebc;font-size:13px;">O arquivo do currículo segue em anexo neste e-mail.</p>
      </div>
    </div>
  </div>`;

  return { text, html };
}

function buildContactEmail({ nome, email, telefone, mensagem }) {
  const rows = [
    ["Nome", nome],
    ["E-mail", email],
    ["Telefone", telefone || "Não informado"],
    ["Mensagem", mensagem],
  ];

  const text = [
    "Nova mensagem recebida pelo site Aqualeve",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 12px;border:1px solid #d7edf6;font-weight:600;color:#023047;width:140px;">${escapeHtml(
          label
        )}</td>
        <td style="padding:10px 12px;border:1px solid #d7edf6;color:#023047;white-space:pre-wrap;">${escapeHtml(
          value
        )}</td>
      </tr>`
    )
    .join("");

  const html = `
  <div style="font-family:Arial,sans-serif;background:#f4fafd;padding:24px;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #d7edf6;">
      <div style="background:#023047;color:#ffffff;padding:20px 24px;">
        <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#8ecae6;">Aqualeve</p>
        <h1 style="margin:8px 0 0;font-size:22px;">Nova mensagem pelo site</h1>
      </div>
      <div style="padding:24px;">
        <p style="margin:0 0 16px;color:#023047;">Recebemos uma nova mensagem de contato:</p>
        <table style="width:100%;border-collapse:collapse;background:#f4fafc;">${tableRows}</table>
      </div>
    </div>
  </div>`;

  return { text, html };
}

async function sendMail({ subject, text, html, replyTo, attachments = [] }) {
  const config = getSmtpConfig();
  const transport = createTransport();

  if (!config || !transport) {
    const error = new Error(
      "Configure CONTACT_SMTP_PASS no .env.local para enviar e-mails em português com anexo."
    );
    error.statusCode = 503;
    error.code = "SMTP_NOT_CONFIGURED";
    throw error;
  }

  await transport.sendMail({
    from: `"Site Aqualeve" <${config.user}>`,
    to: CONTACT_EMAIL,
    replyTo: replyTo || undefined,
    subject,
    text,
    html,
    attachments,
  });

  return { ok: true };
}

async function sendResumeEmail(payload) {
  const content = buildResumeEmail({
    nome: payload.nome,
    email: payload.email,
    telefone: payload.telefone,
    mensagem: payload.mensagem,
    arquivoNome: payload.arquivo?.name,
  });

  const bytes = Buffer.from(payload.arquivo.data, "base64");

  return sendMail({
    subject: `Currículo pelo site Aqualeve — ${payload.nome}`,
    text: content.text,
    html: content.html,
    replyTo: payload.email,
    attachments: [
      {
        filename: payload.arquivo.name,
        content: bytes,
        contentType: payload.arquivo.type || "application/octet-stream",
      },
    ],
  });
}

async function sendContactEmail(payload) {
  const content = buildContactEmail(payload);

  return sendMail({
    subject: `Contato pelo site Aqualeve — ${payload.nome}`,
    text: content.text,
    html: content.html,
    replyTo: payload.email,
  });
}

export {
  buildContactEmail,
  buildResumeEmail,
  getSmtpConfig,
  sendContactEmail,
  sendResumeEmail,
};
