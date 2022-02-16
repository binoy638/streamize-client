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
        background: '#181818',
        primary: '#202020',
        // secondary: '#1B1B30',
        primaryText: '#EC4D7D',
        secondaryText: '#ffffff'
      }
    }
  },
  plugins: []
};
