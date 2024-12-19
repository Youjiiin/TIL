/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: '#4CAF50',
        text: '#2F2E36',
        subText: '#B8B8B8'
      },
    },
    fontFamily: {
      sans: ["Pretendard", "Arial", "sans-serif"],
    },
  },
  plugins: [],
}
