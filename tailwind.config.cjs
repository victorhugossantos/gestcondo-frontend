/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",                // Certifique-se de que o arquivo HTML está incluído
      "./src/**/*.{js,jsx,ts,tsx}",  // Inclua todos os arquivos onde você usa JSX, TSX, JS
      "./node_modules/@material-tailwind/react/dist/**/*.{js,jsx,ts,tsx}", // Inclua todos os arquivos onde você usa JSX, TSX, JS
      "./node_modules/@material-tailwind/react/dist/**/*.{js,jsx,ts,tsx}", // Inclua todos os arquivos onde você usa JSX, TSX, JS
    ],
    theme: {
      extend: {
        keyframes: {
          'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out'
        }
      },
    },
    plugins: [],
  }
  