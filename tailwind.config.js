/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      colors: {
        'background': '#0A0A0A',
        'surface': '#1A1A1A',
        'primary': '#4f46e5',
        'secondary': '#3b82f6',
        'foreground': '#f8fafc',
        'border': '#27272a',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(to right, #4f46e5, #3b82f6)',
      },
      // Am adăugat din nou secțiunile de animație pentru scroll
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        'scrolling': 'scroll 40s linear infinite',
      }
    },
  },
  plugins: [],
}