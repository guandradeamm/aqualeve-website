import outubroRosa from "./definitions/outubro-rosa";

/**
 * Registry de campanhas temáticas.
 * Para adicionar uma nova: crie definitions/<id>.js e registre aqui.
 * Também adicione o bloco CSS `.campaign-<id>` em styles/tailwind.scss.
 */
const CAMPAIGNS = [outubroRosa];

const CAMPAIGNS_BY_ID = CAMPAIGNS.reduce((acc, campaign) => {
  acc[campaign.id] = campaign;
  return acc;
}, {});

function getCampaignById(id) {
  if (!id) return null;
  return CAMPAIGNS_BY_ID[id] || null;
}

function listCampaigns() {
  return CAMPAIGNS.slice();
}

export { CAMPAIGNS, CAMPAIGNS_BY_ID, getCampaignById, listCampaigns };
