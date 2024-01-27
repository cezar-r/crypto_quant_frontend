/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        custom: '8px 6px 12px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}

