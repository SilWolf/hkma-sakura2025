import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans TC"', ...defaultTheme.fontFamily.sans],
        serif: ['"Noto Serif"', ...defaultTheme.fontFamily.serif],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        carousel: {
          "0%": { left: "-200px" },
          "100%": { left: "100%" },
        },
      },
      animation: {
        carousel: "carousel 30s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
