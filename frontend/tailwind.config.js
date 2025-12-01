/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Força o Tailwind a olhar para a classe 'dark' no elemento html
  darkMode: 'selector', 
  theme: {
    extend: {},
  },
  plugins: [],
}