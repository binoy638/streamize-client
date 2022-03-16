module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        publicSans: ['Public Sans', 'sans-serif'],
        balsamiqSans: ['Balsamiq Sans', 'sans-serif']
      },
      colors: {
        primary: '#FF0A0A'
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')]
};
