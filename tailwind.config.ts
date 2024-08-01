import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: '#1C4587',
        level: {
          '1': '#FFFFFF',
          '2': '#F3F3F3',
        },
        status: {
          'positive': '#4ECB71',
          'notification': '#F6893C',
          'negative': '#B3261E',
        },
        default: "#334155",
        accent: "#F2F2F2",
        transparent: colors.transparent,
        white: colors.white,
        black: colors.black
      },
      boxShadow: {
        ...defaultTheme.boxShadow,
      },
    },
  },
  plugins: [],
};

export default config;