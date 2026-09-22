import { getCampaignById, listCampaigns } from "./registry";

function normalizeMode(value) {
  if (value == null || value === "") return "auto";
  const normalized = String(value).trim().toLowerCase();
  if (
    normalized === "none" ||
    normalized === "off" ||
    normalized === "false" ||
    normalized === "0"
  ) {
    return "none";
  }
  if (normalized === "auto") return "auto";
  return normalized;
}

/**
 * Compat: NEXT_PUBLIC_OUTUBRO_ROSA=true|false|auto ainda funciona.
 */
function resolveCampaignMode() {
  const campaignEnv = normalizeMode(process.env.NEXT_PUBLIC_CAMPAIGN);
  if (campaignEnv !== "auto") {
    return campaignEnv;
  }

  const legacy = process.env.NEXT_PUBLIC_OUTUBRO_ROSA;
  if (legacy == null || legacy === "") {
    return "auto";
  }

  const legacyNorm = String(legacy).trim().toLowerCase();
  if (legacyNorm === "true" || legacyNorm === "1" || legacyNorm === "on") {
    return "outubro-rosa";
  }
  if (legacyNorm === "false" || legacyNorm === "0" || legacyNorm === "off") {
    return "none";
  }
  return "auto";
}

function matchesSchedule(campaign, date) {
  const months = campaign?.schedule?.months;
  if (!Array.isArray(months) || months.length === 0) {
    return false;
  }
  const month = date.getMonth() + 1;
  return months.includes(month);
}

/**
 * Resolve a campanha ativa.
 * - none → null (marca original)
 * - id explícito → essa campanha
 * - auto → primeira campanha cujo schedule casa com a data
 */
function resolveActiveCampaign(date = new Date()) {
  const mode = resolveCampaignMode();

  if (mode === "none") {
    return null;
  }

  if (mode !== "auto") {
    return getCampaignById(mode);
  }

  return listCampaigns().find((campaign) => matchesSchedule(campaign, date)) || null;
}

function getDocumentTitle(campaign) {
  return campaign?.documentTitle || "Aqualeve";
}

export {
  getDocumentTitle,
  matchesSchedule,
  normalizeMode,
  resolveActiveCampaign,
  resolveCampaignMode,
};
