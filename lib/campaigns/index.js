/**
 * Sistema de campanhas temáticas (Outubro Rosa, futuras datas comemorativas, etc.).
 *
 * Uso rápido:
 * - Marca original:     NEXT_PUBLIC_CAMPAIGN=none
 * - Forçar campanha:    NEXT_PUBLIC_CAMPAIGN=outubro-rosa
 * - Por calendário:     NEXT_PUBLIC_CAMPAIGN=auto
 *
 * Nova campanha:
 * 1. lib/campaigns/definitions/<id>.js
 * 2. registrar em registry.js
 * 3. bloco CSS `.campaign-<id>` em styles/tailwind.scss
 * Componentes de UI não precisam de ifs de cor — usam tokens `campaign-*`.
 */

export { BRAND_THEME } from "./brand";
export {
  CAMPAIGNS,
  getCampaignById,
  listCampaigns,
} from "./registry";
export {
  getDocumentTitle,
  matchesSchedule,
  normalizeMode,
  resolveActiveCampaign,
  resolveCampaignMode,
} from "./resolve";
