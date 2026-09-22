/**
 * Campanha: Outubro Rosa
 *
 * Ativação:
 * - NEXT_PUBLIC_CAMPAIGN=outubro-rosa (força)
 * - NEXT_PUBLIC_CAMPAIGN=auto + mês 10
 * - legado: NEXT_PUBLIC_OUTUBRO_ROSA=true
 */
const outubroRosa = {
  id: "outubro-rosa",
  name: "Outubro Rosa",
  documentTitle: "Aqualeve — Outubro Rosa",
  /** Meses 1–12; em auto, ativa nestes meses */
  schedule: { months: [10] },
  theme: {
    header: "#E0709A",
    headerBorder: "#F7C6D8",
    cta: "#E85A8C",
    ctaHover: "#C44572",
    heading: "#E85A8C",
    accent: "#E85A8C",
    navHover: "#E85A8C",
    overlayFrom: "rgba(232, 90, 140, 0.45)",
    overlayVia: "rgba(232, 90, 140, 0.2)",
    modalVia: "#E85A8C",
    modalTo: "#C44572",
  },
  hero: {
    eyebrow: "Outubro Rosa",
    message: "Água que nutre. Conscientização que protege.",
    showRibbon: true,
  },
};

export default outubroRosa;
