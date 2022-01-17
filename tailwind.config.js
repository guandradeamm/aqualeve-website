module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
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
      fontFamily: { mont: ["Montserrat", "sans-serif"] },
      fontFamily: { livvic: ["Livvic", "sans-serif"] },
      fontFamily: { questrial: ["Questrial", "sans-serif"] },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
