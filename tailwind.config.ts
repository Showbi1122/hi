import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#08d665",
          light: "#22cd6f",
          dim: "rgba(8, 214, 101, 0.12)",
          deep: "#06a950",
        },
        cyan: {
          DEFAULT: "#08d665",
          light: "#22cd6f",
          dim: "rgba(8, 214, 101, 0.12)",
          glow: "rgba(8, 214, 101, 0.28)",
        },
        violet: {
          DEFAULT: "#657a84",
          light: "#c8c6c6",
          glow: "rgba(255, 255, 255, 0.06)",
        },
        surface: {
          DEFAULT: "rgba(255, 255, 255, 0.03)",
          solid: "#15181a",
          elevated: "#1a1e21",
        },
        bg: {
          DEFAULT: "#0b0d0e",
          secondary: "#131617",
          tertiary: "#15181a",
        },
        muted: "#999999",
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          gold: "rgba(8, 214, 101, 0.4)",
          hover: "rgba(34, 205, 111, 0.6)",
        },
        glass: "rgba(19, 22, 23, 0.85)",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "system-ui", "sans-serif"],
        body: ["var(--font-rubik)", "system-ui", "sans-serif"],
        mono: ["var(--font-rubik)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "4px",
        sm: "4px",
      },
      maxWidth: {
        content: "1140px",
        article: "760px",
      },
      spacing: {
        nav: "80px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "wa-pulse": "waPulse 2.5s ease-in-out infinite",
      },
      keyframes: {
        waPulse: {
          "0%, 100%": {
            boxShadow: "0 8px 28px rgba(37, 211, 102, 0.32)",
          },
          "50%": {
            boxShadow:
              "0 8px 28px rgba(37, 211, 102, 0.32), 0 0 0 10px rgba(37, 211, 102, 0.1)",
          },
        },
      },
      boxShadow: {
        gold: "0 10px 30px rgba(8, 214, 101, 0.25)",
        "gold-lg": "0 16px 40px rgba(8, 214, 101, 0.35)",
        card: "0 20px 50px rgba(0, 0, 0, 0.4)",
        modal: "0 30px 70px rgba(0, 0, 0, 0.65)",
        lift: "0 16px 40px rgba(0, 0, 0, 0.45)",
        cyan: "0 10px 30px rgba(8, 214, 101, 0.25)",
      },
    },
  },
  plugins: [typography],
};

export default config;
