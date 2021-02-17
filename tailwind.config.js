module.exports = {
  future: {},
  purge: [
    "./components/**/*.{html,js,ts,jsx,tsx}",
    "./layouts/**/*.{html,js,ts,jsx,tsx}",
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
      fontFamily: {
        thornletter: ["thornletter", "serif"],
      },
      maxWidth: {
        measure: "34em",
      },
      textColor: {
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
