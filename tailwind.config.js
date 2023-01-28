/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/*..{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  safelist: [{
      pattern: /(border|bg|text)-(gray|slate|neutral|red|orange|yellow|green|blue|sky|indigo|violet|purple|pink)-(1|2|3|4|5|6|7|8|9)00/
    },
    {
      pattern: /opacity-(0|100)/
    },
    {
      pattern: /(top|left|right|bottom)-(0|1|2|3|4|5|6|7|8|9|10|12|16|20)/
    }
  ],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px',
        '4': '4px'
      },
      outlineWidth: {
        '1': '1px',
        '4': '4px'
      },
      dropShadow: {
        'custom': '0 4px 3px rgb(0 0 0 / 0.05)'
      },
      fontSize: {
        '0': '0',
      },
      colors: {},
      fontFamily: {
        raleway: ["Raleway", "sans-serif"]
      },
      scale: {
        'base': '1.025'
      }
    },
  },
  plugins: [],
}