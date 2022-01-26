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
        "theme-black": "#000000",
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
