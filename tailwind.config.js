module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./package/**/*.{js,ts,jsx,tsx}",
    "./previewsComponents/**/*.{js,ts,jsx,tsx}",
    "./examples/**/*.{js,ts,jsx,tsx}",
    "./viewport/**/*.{js,ts,jsx,tsx}",
    "./componentsDB/**/*.md",
  ],
  theme: {
    extend: {
      colors: {
        dopamina: {
          violeta: "#7C3AED",
          amarillo: "#F9E400",
          cian: "#008EAD",
          rojo: "#D32521",
          verde: "#0E6800",
          "verde-fluo": "#2BDC0D",
          bordo: "#5E0138",
          dorado: "#F7B23A",
          azul: "#494F87",
          petroleo: "#0F3A47",
          "petroleo-acento": "#33C7E0",
        },
      },
      fontFamily: {
        display: ["var(--font-anton)", "sans-serif"],
        sans: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
  ],
};
