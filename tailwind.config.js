module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          800: "#1A24D4",
          900: "#1C24B2",
        },
      },
    },
    fontFamily: { display: "DM Sans" },
  },
  plugins: [require("@tailwindcss/typography")],
};
