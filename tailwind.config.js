/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0C10',
          secondary: '#111418',
          tertiary: '#181C24',
        },
        surface: {
          DEFAULT: '#1E2330',
          secondary: '#252B3B',
        },
        rim: {
          DEFAULT: '#2E3547',
          secondary: '#3A4258',
        },
        amber: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
        },
        electric: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        dmsans: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        'r-sm': '10px',
        'r-md': '14px',
        'r-lg': '20px',
        'r-xl': '28px',
      },
    },
  },
  plugins: [],
}