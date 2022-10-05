/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '544px',

      md: '768px',

      lg: '1012px'
    },
    spacing: {
      0: '0px',
      1: '8px',
      2: '16px',
      3: '24px',
      4: '32px',
      5: '40px'
    },
    borderRadius: {
      none: '0',
      lg: '12px',
      DEFAULT: '6px',
      circle: '50%'
    },
    extend: {
      colors: {
        borderGray: 'rgb(208, 215, 222)',
        commonBgGray: 'rgb(246,248,250)',
        hoverBlue: '#0969da',
        maskBlack: 'rgba(36,41,47,0.4)',
        red: '#FF0000',
        textGray: '#57606a'
      },
      zIndex: {
        99: '99',
        199: '199'
      }
    }
  },
  plugins: []
}
