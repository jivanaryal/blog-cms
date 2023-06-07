/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#063777",
        secondaryColor: "#071D53",
        backdrop: "rgba(0,0,0,.7)",
      },
    },
  },
  plugins: [],
};
