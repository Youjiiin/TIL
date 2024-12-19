/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        custom: "6px",
      },
      colors: {
        main: '#4CAF50',
        second: '#F2AB58',
        sub: '#FEF7EC',
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
