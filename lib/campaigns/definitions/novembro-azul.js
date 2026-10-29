/**
 * Campanha: Novembro Azul
 *
 * Ativação:
 * - NEXT_PUBLIC_CAMPAIGN=novembro-azul (força)
 * - NEXT_PUBLIC_CAMPAIGN=auto + mês 11
 */
const novembroAzul = {
  id: "novembro-azul",
  name: "Novembro Azul",
  documentTitle: "Aqualeve — Novembro Azul",
  /** Meses 1–12; em auto, ativa nestes meses */
  schedule: { months: [11] },
  theme: {
    header: "#023047",
    headerBorder: "#8ECAE6",
    cta: "#FFB703",
    ctaHover: "#FB8500",
    ctaInk: "#023047",
    heading: "#0E4D8A",
    accent: "#0E4D8A",
    navHover: "#0E4D8A",
    overlayFrom: "rgba(142, 202, 230, 0.55)",
    overlayVia: "rgba(142, 202, 230, 0.2)",
    modalVia: "#023047",
    modalTo: "#219EBC",
  },
  hero: {
    eyebrow: "Novembro Azul",
    message: "Água que nutre. Cuidado que previne.",
    showRibbon: true,
  },
};

export default novembroAzul;
