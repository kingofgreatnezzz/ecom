/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  devServer: {
    allowedHosts: 'localhost', // or any other valid hostname or IP address
    // other devServer options...
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
