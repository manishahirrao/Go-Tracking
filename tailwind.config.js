/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#b71521',
          dark: '#9a4018',
        },
        black: '#222222',
        'dark-gray': '#333333',
        gray: '#9f9f9f',
        'light-gray': '#acacac',
        'lighter-gray': '#c7c7c7',
        border: '#e7e8ec',
        'bg-light': '#f2f2f2',
        'bg-lighter': '#f6f6f6',
        green: '#33be61',
        red: '#ff0000',
        blue: '#0099cc',
      },
      fontFamily: {
        primary: ['Roboto', 'sans-serif'],
        secondary: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        xs: '10px',
        sm: '12px',
        base: '14px',
        md: '16px',
        lg: '18px',
        xl: '48px',
        '2xl': '114px',
      },
      spacing: {
        xs: '10px',
        sm: '20px',
        md: '50px',
        lg: '80px',
        xl: '120px',
      },
      maxWidth: {
        container: '1170px',
      },
      borderRadius: {
        sm: '3px',
      },
      transitionDuration: {
        base: '400ms',
        fast: '200ms',
      },
      boxShadow: {
        sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
        md: '0 4px 8px rgba(0, 0, 0, 0.15)',
        lg: '0 8px 16px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
