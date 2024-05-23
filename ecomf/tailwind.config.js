/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  devServer: {
    allowedHosts: ['localhost'], // Wrap 'localhost' in an array
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
