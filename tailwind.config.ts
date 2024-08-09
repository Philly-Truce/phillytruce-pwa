import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#1C4587",
        level: {
          "1": "#FFFFFF",
          "2": "#F3F3F3",
        },
        status: {
          positive: "#4ECB71",
          notification: "#F6893C",
          negative: "#B3261E",
        },
        default: "#334155",
        accent: "#F2F2F2",
        link: "#0D99FF",
        transparent: colors.transparent,
        white: colors.white,
        black: colors.black,
        homelistbg: "#F3F3F3",
      },
      boxShadow: {
        ...defaultTheme.boxShadow,
      },
      fontSize: {
        '2xs': '0.625rem'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
