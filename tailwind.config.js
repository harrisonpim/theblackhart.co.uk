module.exports = {
  future: {},
  purge: [
    './components/**/*.{html,js,ts,jsx,tsx}',
    './pages/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      lg: '800px',
      xl: '1200px',
    },
    fontWeight: {
      bold: 600,
    },
    extend: {
      spacing: {
        // idea pinched from https://www.youtube.com/watch?v=jl_tdhBxc_Y
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
        '6/5': '120%',
        '7/5': '140%',
      },
      visibility: ['hover'],
      fontFamily: {
        crimson: ['Crimson Text', 'serif'],
        thornletter: ['thornletter', 'Crimson Text', 'serif'],
        'operina-romano': ['operina-romano', 'Crimson Text', 'serif'],
      },
      maxWidth: {
        measure: '34rem',
      },
      colors: {
        silver: '#bbb',
        'dark-gray': '#404040',
      },
      letterSpacing: {
        tightest: '-.25rem',
      },
    },
  },
  variants: {},
  plugins: [],
}
