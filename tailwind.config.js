module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-blue": "#00FFFF",
        "theme-lightest-blue": "#D7EDF6",
        "theme-light-blue": "#8ECAE6",
        "theme-middle-blue": "#219EBC",
        "theme-dark-blue": "#023047",
        "theme-green": "#9ECC3D",
        "theme-light-green": "#BCDC79",
        "theme-yellow": "#FFB703",
        "theme-orange": "#FB8500",
        "theme-white": "#FFFFFF",
        "theme-light-white": "#F4FAFD",
        "theme-light-gray": "#F4FAFC",
        "theme-black": "#000000",
        /* Tokens sazonais — valores reais vêm de CSS vars em :root / .campaign-* */
        "campaign-header": "var(--campaign-header)",
        "campaign-header-border": "var(--campaign-header-border)",
        "campaign-cta": "var(--campaign-cta)",
        "campaign-cta-hover": "var(--campaign-cta-hover)",
        "campaign-heading": "var(--campaign-heading)",
        "campaign-accent": "var(--campaign-accent)",
        "campaign-nav-hover": "var(--campaign-nav-hover)",
      },
      fontFamily: {
        mont: ["Montserrat", "sans-serif"],
        questrial: ["Questrial", "sans-serif"],
        livvic: ["Livvic", "sans-serif"],
      },
      spacing: {
        base: "5rem",
        sm: "6rem",
        md: "8rem",
        lg: "9rem",
        xl: "10rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
