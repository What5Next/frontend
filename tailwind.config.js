/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#121212",
        white: "#FFF",
        strongWhite: "#F5F5F5",
        primary: "#B28BF4",
        secondary: "#62D6C5",
        red: "#C26C7B",
        gray: "#D0D5DD",
        darkGray: "#272727",
        lightGray: "#666666",
        gray200: "#E8E8E8",
        gray500: "#A0A4A8",
        gray700: "#52575C",
        pink: "#C746DB",
        purple: "#7859F5",
      },
      fontFamily: {
        sans: ["sans"],
        pretendard: ["Pretendard"],
      },
      rounded: {
        lg: "10px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
