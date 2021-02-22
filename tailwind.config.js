module.exports = {
  future: {},
  purge: [
    "./components/**/*.{html,js,ts,jsx,tsx}",
    "./pages/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      lg: "800px",
      xl: "1200px",
    },
    fontWeight: {
      bold: 600,
    },
    extend: {
      visibility: ["hover"],
      fontFamily: {
        thornletter: ["thornletter", "serif"],
      },
      maxWidth: {
        measure: "34rem",
      },
      colors: {
        silver: "#bbb",
      },
      letterSpacing: {
        tightest: "-.25rem",
      },
    },
  },
  variants: {},
  plugins: [],
};
