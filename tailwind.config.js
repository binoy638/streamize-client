module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        publicSans: ["Public Sans", "sans-serif"],
        balsamiqSans: ["Balsamiq Sans", "sans-serif"],
      },
      colors: {
        primary: "#000000",
        secondary: "#ed5a5a",
        tertiary: "#0E5FFF",
        secondaryText: "#999999",
      },
    },
  },
  plugins: [],
};
