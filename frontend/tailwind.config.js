/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#d97706", // Saffron (Bhagwa)
        secondary: "#4a5568", // Deep Gray
        accent: "#ffd700", // Gold
        background: "#fef9c3", // Light yellow
      },
    },
  },
  plugins: [],
};
