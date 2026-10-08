import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f7f2",
          100: "#e4eee3",
          200: "#c8ddc6",
          300: "#a5c2a1",
          400: "#7fa77a",
          500: "#5f8d5a",
          600: "#4b7448",
          700: "#3d5e3b",
          800: "#344d32",
          900: "#29402a",
          950: "#17261a",
        },
        ice: {
          50: "#f2f8f7",
          100: "#e0efec",
          200: "#c4dfda",
          300: "#9cc8c0",
          400: "#6eaca1",
          500: "#4f9186",
        },
        gold: {
          300: "#f9d66b",
          400: "#f4c95d",
          500: "#e8b84a",
          600: "#c9972f",
          700: "#a97b21",
        },
        sand: {
          50: "#fbfaf6",
          100: "#f3efe4",
          200: "#e7dfcf",
          300: "#d8ccb7",
        },
        snow: "#fbfaf7",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg,#17261a 0%,#29402a 52%,#4f9186 100%)",
        "card-gradient":
          "linear-gradient(180deg,transparent 0%,rgba(23,38,26,.86) 100%)",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(23,38,26,.08)",
        card: "0 10px 40px -10px rgba(23,38,26,.16)",
        glow: "0 0 40px rgba(232,184,74,.22)",
      },
    },
  },
};

export default config;
