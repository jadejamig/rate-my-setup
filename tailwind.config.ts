import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark-100": '#121212',
        "dark-200": '#282828',
        "dark-300": '#3f3f3f',
        "dark-400": '#575757',
        "dark-500": '#717171',
        "dark-600": '#8b8b8b',
      },
      fontFamily: {
        'Montserrat': ['Montserrat', 'sans-serif'],
        'Quicksand': ['Quicksand', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
