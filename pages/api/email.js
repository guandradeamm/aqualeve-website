import * as sgMail from "@sendgrid/mail";

export default async function handler(req, res) {
  if (!process.env.SENDGRID_API_KEY) {
    return res.status(501).json({ error: "Not implemented" });
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  return res.status(501).json({ error: "Not implemented" });
}
