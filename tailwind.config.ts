import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ダークファンタジー：黒・紫・金
        ink: "#0a0710",
        abyss: "#120a1f",
        royal: "#2a1245",
        arcane: "#7c3aed",
        arcaneLight: "#a855f7",
        gold: "#d4af37",
        goldLight: "#f5d97a",
        blood: "#7f1d1d",
      },
      fontFamily: {
        gothic: ["var(--font-gothic)", "serif"],
      },
      boxShadow: {
        arcane: "0 0 40px -10px rgba(124, 58, 237, 0.6)",
        gold: "0 0 30px -8px rgba(212, 175, 55, 0.5)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "45%": { opacity: "0.85" },
          "50%": { opacity: "0.6" },
          "55%": { opacity: "0.9" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        flicker: "flicker 4s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
