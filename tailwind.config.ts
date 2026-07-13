import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#c9a84c",
          light: "#e8d5a3",
          dim: "rgba(201, 168, 76, 0.15)",
        },
        violet: {
          DEFAULT: "#7c3aed",
          light: "#a78bfa",
          glow: "rgba(124, 58, 237, 0.35)",
        },
        cyan: "#22d3ee",
        surface: {
          DEFAULT: "rgba(14, 14, 22, 0.75)",
          solid: "#0e0e16",
        },
        bg: {
          DEFAULT: "#050508",
          secondary: "#0a0a10",
        },
        muted: "#8b8b9a",
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.07)",
          gold: "rgba(201, 168, 76, 0.25)",
          hover: "rgba(201, 168, 76, 0.45)",
        },
        glass: "rgba(255, 255, 255, 0.03)",
      },
      fontFamily: {
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "20px",
        sm: "14px",
      },
      maxWidth: {
        content: "1200px",
        article: "780px",
      },
      spacing: {
        nav: "76px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "float-orb": "floatOrb 12s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        shimmer: "shimmer 4s linear infinite",
        "scroll-line": "scrollLine 2s ease infinite",
        "wa-pulse": "waPulse 2.5s ease-in-out infinite",
        "spin-slow": "spinSlow 20s linear infinite",
      },
      keyframes: {
        floatOrb: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 15px) scale(0.95)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        scrollLine: {
          "0%": { transform: "scaleY(0)", opacity: "0" },
          "50%": { transform: "scaleY(1)", opacity: "1" },
          "100%": { transform: "scaleY(0)", opacity: "0" },
        },
        waPulse: {
          "0%, 100%": {
            boxShadow: "0 8px 32px rgba(37, 211, 102, 0.4)",
          },
          "50%": {
            boxShadow:
              "0 8px 32px rgba(37, 211, 102, 0.4), 0 0 0 12px rgba(37, 211, 102, 0.12)",
          },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      boxShadow: {
        gold: "0 4px 24px rgba(201, 168, 76, 0.25)",
        "gold-lg": "0 8px 32px rgba(201, 168, 76, 0.35)",
        card: "0 20px 48px rgba(0, 0, 0, 0.35)",
        modal: "0 32px 80px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [typography],
};

export default config;
