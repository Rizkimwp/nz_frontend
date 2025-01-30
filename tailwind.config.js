/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    container:{
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },

    },
    extend: {
      colors:{
        'color1': '#C00A27',
        'color2': '#FFDFC2',
        'color3': '#F8CFA9',
        'color4': '#5B5758',
      },
      fontFamily:{
        'lato':['Lato', 'sans-serif'],
        'inter':['Inter', 'sans-serif'],
        'roboto':['Roboto']
      }
    },
  },
  plugins: [],
}

