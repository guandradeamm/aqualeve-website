/**
 * Campanha: Natal (estilo A1 — pinheiros + splash)
 *
 * Ativação:
 * - NEXT_PUBLIC_CAMPAIGN=natal (força)
 * - NEXT_PUBLIC_CAMPAIGN=auto + mês 12
 */
const natal = {
  id: "natal",
  name: "Natal",
  documentTitle: "Aqualeve — Feliz Natal",
  schedule: { months: [12] },
  theme: {
    header: "#104C2A",
    headerBorder: "#C1121F",
    cta: "#C1121F",
    ctaHover: "#9B0C16",
    ctaInk: "#FFFFFF",
    heading: "#166534",
    accent: "#E63946",
    navHover: "#0A3A1F",
    overlayFrom: "rgba(10, 40, 24, 0.72)",
    overlayVia: "rgba(16, 76, 42, 0.28)",
    modalVia: "#104C2A",
    modalTo: "#C1121F",
  },
  hero: {
    eyebrow: "Feliz Natal",
    message: "Da nascente ao coração: um Natal com a pureza de Minas.",
    showRibbon: false,
    imageSrc: "/assets/img/banner-natal.jpg",
  },
};

export default natal;
